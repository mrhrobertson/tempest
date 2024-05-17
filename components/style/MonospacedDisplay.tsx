import { Source_Code_Pro } from "next/font/google";
import { PropsWithChildren } from "react";

const scp = Source_Code_Pro({ subsets: ["latin"] });

export default function MonospacedDisplay(props: PropsWithChildren) {
  return (
    <span
      style={scp.style}
      className={`text-xs p-4 text-dark bg-display-light dark:bg-display-dark rounded-lg w-full select-all break-words`}
    >
      {props.children}
    </span>
  );
}
