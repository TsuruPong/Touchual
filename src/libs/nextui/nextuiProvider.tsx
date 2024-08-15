"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { CommonPrentProps } from "@/component/travis/type/parent/props";

export const NextUiProvider: React.FC<CommonPrentProps> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
