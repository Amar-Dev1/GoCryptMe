import { encryptPassword } from "../utils/Encryp";

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

  const encryptedPassword = await encryptPassword(masterPassword, password);

  const vault = JSON.parse(localStorage.getItem("vault") || "{}");

  const platformKey = platform.name;

  if (!vault[platformKey]) {
    vault[platformKey] = [];
  }

  vault[platformKey].push({
    name,
    platformName: platform?.name,
    img: platform?.img,
    encryptedPassword,
  });

  localStorage.setItem("vault", JSON.stringify(vault));
};

export const saveMasterkeyCheck = async (masterPassword: string) => {
  const checkText = "GoCryptMeCheck";
  const encryptedCheck = await encryptPassword(masterPassword, checkText);
  localStorage.setItem("masterKeyCheck", JSON.stringify(encryptedCheck));
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

export const editAndSave = async (
  masterPassword: string,
  platform: any,
  oldName: string,
  newName: string,
  newPassword: string
) => {
  const vault = JSON.parse(localStorage.getItem("vault") || "{}");

  if (!vault[platform]) {
    console.error("No passwords found for this platform.");
    return;
  }

  const entries = vault[platform];
  const index = entries.findIndex((entry: any) => entry.name === oldName);

  if (index === -1) {
    console.error("Password entry not found.");
    return;
  }

  const encryptedPassword = await encryptPassword(masterPassword, newPassword);

  entries[index] = {
    ...entries[index],
    name: newName,
    encryptedPassword,
  };

  localStorage.setItem("vault", JSON.stringify(vault));
};

export const deleteEntry = async (platform: any, name: string) => {
  const vault = JSON.parse(localStorage.getItem("vault") || "{}");
  if (!vault[platform]) return;

  vault[platform] = vault[platform].filter((entry: any) => entry.name !== name);

  localStorage.setItem("vault", JSON.stringify(vault));
};

// export const deriveKey = async (masterPassword: string, salt: Uint8Array) => {
//   const pwUtf8 = new TextEncoder().encode(masterPassword);
//   const keyMaterial = await crypto.subtle.importKey(
//     "raw",
//     pwUtf8,
//     "PBKDF2",
//     false,
//     ["deriveKey"]
//   );
//   return crypto.subtle.deriveKey(
//     {
//       name: "PBKDF2",
//       salt,
//       iterations: 100_000,
//       hash: "SHA-256",
//     },
//     keyMaterial,
//     { name: "AES-GCM", length: 256 },
//     false,
//     ["encrypt", "decrypt"]
//   );
// };

// export const encryptAndSave = async (
//   masterPassword: string,
//   formData: { name: string; password: string; platform: any }
// ) => {
//   const { name, password, platform } = formData;

//   const encryptedPassword = await encryptPassword(masterPassword, password);

//   const vault = (await window.electronStore.get("vault")) || {};

//   const platformKey = platform.name;

//   if (!vault[platformKey]) {
//     vault[platformKey] = [];
//   }

//   vault[platformKey].push({
//     name,
//     platformName: platform?.name,
//     img: platform?.img,
//     encryptedPassword,
//   });

//   await window.electronStore.set("vault", vault);
// };

// export const saveMasterkeyCheck = async (masterPassword: string) => {
//   const checkText = "GoCryptMeCheck";
//   const encryptedCheck = await encryptPassword(masterPassword, checkText);
//   await window.electronStore.set("masterKeyCheck", encryptedCheck);
// };


// export const retrieveAndDecrypt = async (
//   masterPassword: string,
//   encryptedPassword: any
// ) => {
//   const salt = Uint8Array.from(atob(encryptedPassword.salt), (c) =>
//     c.charCodeAt(0)
//   );
//   const iv = Uint8Array.from(atob(encryptedPassword.iv), (c) =>
//     c.charCodeAt(0)
//   );
//   const ciphertext = Uint8Array.from(atob(encryptedPassword.ciphertext), (c) =>
//     c.charCodeAt(0)
//   );

//   const key = await deriveKey(masterPassword, salt);
//   const decrypted = await crypto.subtle.decrypt(
//     { name: "AES-GCM", iv },
//     key,
//     ciphertext
//   );

//   return new TextDecoder().decode(decrypted);
// };

// export const editAndSave = async (
//   masterPassword: string,
//   platform: any,
//   oldName: string,
//   newName: string,
//   newPassword: string
// ) => {
//   const vault = (await window.electronStore.get("vault")) || {};

//   if (!vault[platform]) {
//     console.error("No passwords found for this platform.");
//     return;
//   }

//   const entries = vault[platform];
//   const index = entries.findIndex((entry: any) => entry.name === oldName);

//   if (index === -1) {
//     console.error("Password entry not found.");
//     return;
//   }

//   const encryptedPassword = await encryptPassword(masterPassword, newPassword);

//   entries[index] = {
//     ...entries[index],
//     name: newName,
//     encryptedPassword,
//   };

//   await window.electronStore.set("vault", vault);
// };

// export const deleteEntry = async (platform: any, name: string) => {
//   const vault = (await window.electronStore.get("vault")) || {};
//   if (!vault[platform]) return;

//   vault[platform] = vault[platform].filter((entry: any) => entry.name !== name);

//   await window.electronStore.set("vault", vault);
// };
