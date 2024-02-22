import React from "react";

export type RoutesType = {
  element: React.JSX.Element;
  path: string;
  children?: RoutesType[];
  meta?: {
    layout?: string;
    protectedRoute?: boolean;
  };
};

export type IconsType = {
  [key: string]: any;
}
