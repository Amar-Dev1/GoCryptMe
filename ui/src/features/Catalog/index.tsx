import { images } from "../../Shared/Constants/images";

const index = () => {
  return (
    <div className="w-full h-full py-5 px-25">
      <div className="logo-wrapper w-fit mx-auto border flex justify-center py-3 pr-7 pl-3 border-dark-gray rounded-2xl shadow-xl shadow-gray-900">
        <img
          src={images.logo}
          alt="logo"
          className="min-w-[80px] max-w-[140px]"
        />
      </div>
      <h3 className="text-light-gray text-center font-bold text-2xl mt-4 mb-3">
        GoCryptMe
      </h3>

      <ul className="flex flex-col gap-8 mt-12">
        <li className="font-bold">
          i. Open the app and enter your master password (vault password).
          You’ll create this password when you log in to the app for the first
          time.
        </li>
        <li className="font-bold">
          ii. After a successful login, you can easily manage your passwords —
          store them on your device, edit them, and securely delete them when
          needed.
        </li>
        <li className="font-bold">
          iii. Your passwords are stored securely, encrypted using the PBKDF2
          algorithm. No one can access them without your master password (vault
          password).
        </li>
        <li className="font-bold">
          iv. Don’t worry about your passwords’ security — they’re stored
          offline on your device. No cloud storage, no online hacks, and no
          external access!
        </li>
      </ul>
    </div>
  );
};

export default index;
