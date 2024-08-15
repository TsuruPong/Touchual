"use client";

import * as React from "react";

type InGameTimerProp = {
  callback: () => void;
};

export const InGameTimer: React.FC<InGameTimerProp> = ({ callback }) => {
  const [time, setTime] = React.useState<number>(3);
  const ref = React.useRef(time);

  React.useEffect(() => {
    ref.current = time;
  }, [time]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current <= 0) {
        callback();
      } else {
        setTime((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <label className="text-amber-400">{time}</label>;
};
