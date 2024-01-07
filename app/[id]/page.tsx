"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { revealSecret } from "@/app/actions";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { Source_Code_Pro } from "next/font/google";
import strings from "@/public/config/strings.json";
import theme from "@/public/config/theme.json";

const scp = Source_Code_Pro({ subsets: ["latin"] });

export default function Page() {
  const [show, setShow] = useState<boolean>(false);
  const [reveal, setReveal] = useState<boolean>(false);
  const [uuid, setUUID] = useState<string>(
    usePathname().split("~")[0].split("/")[1]
  );
  const [key, setKey] = useState<string>(usePathname().split("~")[1]);
  const [message, setMessage] = useState<string>("");

  const handleReveal = async (e: any) => {
    e.preventDefault();
    setReveal(false);
    const payload = { uuid, key };
    const res: string | null = await revealSecret(payload);
    setMessage(res!);
    setReveal(true);
  };

  return (
    <main
      className={`flex min-h-screen w-full flex-col items-center justify-center p-8 text-${theme.text.light} dark:text-${theme.text.dark} bg-${theme.bg.main.light} dark:bg-${theme.bg.main.dark}`}
    >
      <div
        className={`flex flex-col items-center justify-center w-full md:w-1/2 lg:w-2/5 lg:max-w-4/5 p-4 rounded-2xl gap-4 bg-${theme.bg.container.light} dark:bg-${theme.bg.container.dark}`}
      >
        {reveal && message ? (
          <div className="flex flex-col w-full gap-4 items-center">
            <h1>{strings.revealed.head}</h1>
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 w-full">
              <span
                style={scp.style}
                className={`text-xs text-zinc-50 p-4 bg-${theme.bg.display.light} dark:bg-${theme.bg.display.dark} rounded-lg md:rounded-e-none md:rounded-s-lg w-full md:w-5/6 select-all break-words`}
              >
                {message}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(message)}
                className={`flex gap-2 bg-${theme.button.secondary.light} dark:bg-${theme.button.secondary.dark} text-${theme.button.secondary.text.light} dark:text-${theme.button.secondary.text.dark} hover:bg-${theme.button.secondary.hover.light} dark:hover:bg-${theme.button.secondary.hover.dark} hover:text-${theme.button.secondary.hover.text.light} dark:hover:text-${theme.button.secondary.hover.text.dark} active:bg-${theme.button.secondary.active.light} dark:active:bg-${theme.button.secondary.active.dark} active:text-${theme.button.secondary.active.text.light} dark:active:text-${theme.button.secondary.active.text.dark} rounded-lg md:rounded-e-lg md:rounded-s-none w-full md:w-2/12 py-2 items-center justify-center`}
              >
                <DocumentDuplicateIcon className="w-5 h-5" />
                <span className="block md:hidden">{strings.generic.copy}</span>
              </button>
            </div>
            <Link
              className={`flex-grow px-4 py-4 md:py-2 w-full bg-${theme.button.primary.light} dark:bg-${theme.button.primary.dark} text-${theme.button.primary.text.light} dark:text-${theme.button.primary.text.dark} hover:bg-${theme.button.primary.hover.light} dark:hover:bg-${theme.button.primary.hover.dark} hover:text-${theme.button.primary.hover.text.light} dark:hover:text-${theme.button.primary.hover.text.dark} active:bg-${theme.button.primary.active.light} dark:active:bg-${theme.button.primary.active.dark} active:text-${theme.button.primary.active.text.light} dark:active:text-${theme.button.primary.active.text.dark} text-center rounded-lg`}
              href="/"
            >
              {strings.generic.generate}
            </Link>
          </div>
        ) : reveal && !message ? (
          <div className="flex flex-col w-full gap-4 items-center">
            <h1>{strings.invalid.head}</h1>
            <p className="w-full p-4 rounded-lg text-center bg-red-500 text-zinc-50 text-sm">
              {strings.invalid.warning}
            </p>
            <Link
              className={`px-4 py-4 md:py-2 w-full bg-${theme.button.primary.light} dark:bg-${theme.button.primary.dark} text-${theme.button.primary.text.light} dark:text-${theme.button.primary.text.dark} hover:bg-${theme.button.primary.hover.light} dark:hover:bg-${theme.button.primary.hover.dark} hover:text-${theme.button.primary.hover.text.light} dark:hover:text-${theme.button.primary.hover.text.dark} active:bg-${theme.button.primary.active.light} dark:active:bg-${theme.button.primary.active.dark} active:text-${theme.button.primary.active.text.light} dark:active:text-${theme.button.primary.active.text.dark} rounded-lg text-center`}
              href="/"
            >
              {strings.generic.generate}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full items-center">
            <h1>{strings.reveal.head}</h1>
            <p className="flex items-center justify-center text-center w-full p-4 rounded-lg bg-red-500 text-zinc-50 text-sm">
              {strings.reveal.warning}
            </p>
            <button
              onClick={handleReveal}
              className={`px-4 py-4 md:py-2 w-full bg-${theme.button.secondary.light} dark:bg-${theme.button.secondary.dark} text-${theme.button.secondary.text.light} dark:text-${theme.button.secondary.text.dark} hover:bg-${theme.button.secondary.hover.light} dark:hover:bg-${theme.button.secondary.hover.dark} hover:text-${theme.button.secondary.hover.text.light} dark:hover:text-${theme.button.secondary.hover.text.dark} active:bg-${theme.button.secondary.active.light} dark:active:bg-${theme.button.secondary.active.dark} active:text-${theme.button.secondary.active.text.light} dark:active:text-${theme.button.secondary.active.text.dark} rounded-lg`}
            >
              <span>{strings.generic.reveal}</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
