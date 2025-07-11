import type React from "react";

interface IWrapperProps {
  children: React.ReactNode;
  className?:string;
}
const Wrapper: React.FC<IWrapperProps> = ({ children,className }) => {
  return (
    <div className={`main-wrapper bg-secondary p-9 rounded-4xl border border-dark-gray overflow-hidden ${className}`}>{children}</div>
  );
};

export default Wrapper;