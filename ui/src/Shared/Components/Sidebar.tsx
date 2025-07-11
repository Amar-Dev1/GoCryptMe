import { images } from "../Constants/images";
import type { IMenuItem } from "../types/Layout.types";
import { SquareMousePointer, Info, CirclePlus, Lock } from "lucide-react";

import MenuItem from "./MenuItem";

const Sidebar = () => {
  const items: IMenuItem[] = [
    {
      id: 1,
      title: "Manage Passwords",
      icon: <Lock />,
      route: "/manage-passwords",
    },
    {
      id: 2,
      title: "Add Password",
      icon: <CirclePlus />,
      route: "/add-password",
    },
    {
      id: 3,
      title: "How to use ?",
      icon: <SquareMousePointer />,
      route: "/how",
    },
    { id: 4, title: "About", icon: <Info />, route: "/about" },
  ];

  return (
    <div className="sidebar flex flex-col py-3 border-r border-dark-gray h-full">
      <div className="logo-wrapper flex flex-col items-center border border-gray-800 rounded-2xl p-5 mx-4 shadow-xl shadow-gray-900">
        <img
          src={images.logo}
          alt="logo"
          className="min-w-[80px] max-w-[55%]"
        />
      </div>
      <h3 className="text-light-gray text-center font-bold text-xl mt-4 mb-3">
        GoCryptMe
      </h3>
      <ul className="grow my-9 my-lg-4 my-xl-4 flex flex-col gap-8">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            title={item.title}
            icon={item.icon}
            route={item.route}
          />
        ))}
      </ul>
      <span className="text-light-gray text-center">
        {import.meta.env.VITE_APP_VERSION}
      </span>
    </div>
  );
};

export default Sidebar;
