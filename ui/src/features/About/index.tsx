import { images } from "../../Shared/Constants/images";
import gihubImg from "../AddPassword/platformsData/imgs/github.png";

const index = () => {
  return (
    <div className="w-full h-full flex items-center flex-col gap-5 italic!">
      <div className="logo-wrapper">
        <img
          src={images.logo}
          alt="logo"
          className="min-w-[20%] max-w-[50%] mx-auto"
        />
      </div>
      <div className="app-info w-1/2">
        <h4 className="border-dashed border-b-2 border-b-dark-gray text-center mb-5 pb-2">
          App
        </h4>
        <ul className="gap-5">
          <li className="flex items-center gap-4">
            Name : <span className="font-bold">GoCryptMe</span>
          </li>
          <li className="flex items-center gap-4">
            Current version : <span className="font-bold">{import.meta.env.VITE_APP_VERSION}</span>{" "}
          </li>
          <li className="flex items-center gap-4">
            License : <span className="font-bold">{import.meta.env.VITE_APP_LICENSE}</span>
          </li>
          <li className="flex items-center gap-4">
            Supported systems : <span className="font-bold">Windows, Linux, MAC</span>
          </li>
        </ul>
      </div>
      <div className="author-info w-1/2">
        <h4 className="border-dashed border-b-2 border-b-dark-gray text-center mb-5 pb-2">
          Author
        </h4>
        <a
          href="https://github.com/Amar-Dev1"
          className="flex items-center gap-4 font-bold"
        >
          <img src={gihubImg} alt="" className="max-w-[30px]" />
          Amar Yasir
        </a>
      </div>
    </div>
  );
};

export default index;
