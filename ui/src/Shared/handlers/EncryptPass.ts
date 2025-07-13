export const deriveKey = async (masterPassword: string, salt: Uint8Array) => {
  const pwUtf8 = new TextEncoder().encode(masterPassword);
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    pwUtf8,
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
};

export const encryptAndSave = async (
  masterPassword: string,
  formData: { name: string; password: string; platform: any }
) => {
  const { name, password, platform } = formData;

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(masterPassword, salt);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(password)
  );

  const vault = JSON.parse(localStorage.getItem("vault") || "{}");

  if (!vault[platform]) {
    vault[platform] = [];
  }

  vault[platform].push({
    name,
    platformName: platform?.name,
    img: platform?.img,
    encryptedPassword: {
      salt: btoa(String.fromCharCode(...salt)),
      iv: btoa(String.fromCharCode(...iv)),
      ciphertext: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    },
  });

  localStorage.setItem("vault", JSON.stringify(vault));
};

export const retrieveAndDecrypt = async (
  masterPassword: string,
  encryptedPassword: any
) => {
  const salt = Uint8Array.from(atob(encryptedPassword.salt), (c) =>
    c.charCodeAt(0)
  );
  const iv = Uint8Array.from(atob(encryptedPassword.iv), (c) =>
    c.charCodeAt(0)
  );
  const ciphertext = Uint8Array.from(atob(encryptedPassword.ciphertext), (c) =>
    c.charCodeAt(0)
  );

  const key = await deriveKey(masterPassword, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
};
