import { NavLink } from "react-router-dom";
import type { IMenuItem } from "../types/Layout.types";

const MenuItem = ({ title, icon, route }: IMenuItem) => {
  return (
    <NavLink
      to={route}
      end
      className={({ isActive }) =>
        `bg-secondary flex justify-center items-center p-5 gap-4 mx-4 rounded-xl outline shadow-lg shadow-secondary transition-all ${
          isActive ? "outline-2 outline-btn" : "outline-dark-gray"
        }`
      }
    >
      <span className={`text-light-gray mr-auto `}>{icon}</span>
      <span className="text-light-gray grow">{title}</span>
    </NavLink>
  );
};

export default MenuItem;
