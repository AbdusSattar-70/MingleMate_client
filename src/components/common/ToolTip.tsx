import React from "react";
import { Tooltip as Tippy, TooltipProps as TippyProps } from "react-tippy";
import "react-tippy/dist/tippy.css";

interface TooltipProps extends TippyProps {
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, ...restProps }) => {
  return <Tippy {...restProps}>{children}</Tippy>;
};
