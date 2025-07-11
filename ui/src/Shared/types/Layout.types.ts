import type React from "react";

export interface IMenuItem {
  id?: number;
  title: string;
  icon: string | React.ReactNode;
  className?: string;
  route:string;
}
