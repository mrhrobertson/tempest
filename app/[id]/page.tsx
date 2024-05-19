"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { revealSecret } from "@/app/actions";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { Source_Code_Pro } from "next/font/google";
import strings from "@/config/strings.json";
import config from "@/config/config.json";
import Image from "next/image";
import MonospacedDisplay from "@/components/style/MonospacedDisplay";
import Branding from "@/components/Branding";

const scp = Source_Code_Pro({ subsets: ["latin"] });

export default function Page() {
  const [show, setShow] = useState<boolean>(false);
  const [reveal, setReveal] = useState<boolean>(false);
  const [uuid, setUUID] = useState<string>(
    usePathname().split("~")[0].split("/")[1]
  );
  const [key, setKey] = useState<string>(usePathname().split("~")[1]);
  const [message, setMessage] = useState<string>("");
  const [theme, setTheme] = useState<string>();
  const [link, setLink] = useState<boolean>(config.reveal.link);

  useEffect(() => {
    let initTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(initTheme);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => e.matches && setTheme("dark"));
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", (e) => e.matches && setTheme("light"));
  }, [theme]);

  const handleReveal = async (e: any) => {
    e.preventDefault();
    setReveal(false);
    const payload = { uuid, key };
    console.log(payload);
    if (!payload.key || payload.key == undefined) {
      setMessage(null!);
      setReveal(true);
      return;
    }
    const res: string | null = await revealSecret(payload);
    setMessage(res!);
    setReveal(true);
  };

  return (
    <main
      className={`flex min-h-screen w-full flex-col items-center justify-center p-8 gap-4 text-light dark:text-dark bg-main-light dark:bg-main-dark`}
    >
      <div
        className={`flex flex-col items-center justify-center w-full lg:w-2/5 lg:max-w-4/5 p-4 rounded-2xl gap-4 bg-container-light dark:bg-container-dark`}
      >
        {strings.generic.logo &&
        strings.generic.logo.href.dark !== "" &&
        strings.generic.logo.href.light !== "" ? (
          <Image
            src={
              theme === "dark"
                ? strings.generic.logo.href.dark
                : strings.generic.logo.href.light
            }
            alt="Logo"
            width={strings.generic.logo.size}
            height={strings.generic.logo.size}
            className="mb-2"
          />
        ) : (
          ""
        )}
        {reveal && message ? (
          <div className="flex flex-col w-full gap-4 items-center">
            <h1>{strings.revealed.head}</h1>
            <div className="flex flex-col gap-4 w-full">
              <MonospacedDisplay>{message}</MonospacedDisplay>
              <button
                onClick={() => navigator.clipboard.writeText(message)}
                className={`flex gap-2 bg-secondary-light dark:bg-secondary-dark text-secondary-text-light dark:text-secondary-text-dark hover:bg-secondary-hover-light dark:hover:bg-secondary-hover-dark hover:text-secondary-text-dark dark:hover:text-secondary-text-dark active:bg-secondary-active-light dark:active:bg-secondary-active-dark active:text-secondary-active-text-light dark:active:text-secondary-active-text-dark rounded-lg w-full py-2 items-center justify-center`}
              >
                <DocumentDuplicateIcon className="w-5 h-5" />
                <span className="block">{strings.generic.copy}</span>
              </button>
            </div>
            {link ? (
              <Link
                className={`flex-grow px-4 py-2 w-full bg-primary-light dark:bg-primary-dark text-primary-text-light dark:text-primary-text-dark hover:bg-primary-hover-light dark:hover:bg-primary-hover-dark hover:text-primary-hover-text-light dark:hover:text-primary-hover-text-dark active:bg-primary-active-light dark:active:bg-primary-active-dark active:text-primary-active-text-light dark:active:text-primary-active-text-dark text-center rounded-lg`}
                href="/"
              >
                {strings.generic.generate}
              </Link>
            ) : (
              <></>
            )}
          </div>
        ) : reveal && !message ? (
          <div className="flex flex-col w-full gap-4 items-center">
            <h1>{strings.invalid.head}</h1>
            <p className="w-full p-4 rounded-lg text-center bg-warning text-dark text-sm">
              {strings.invalid.warning}
            </p>
            <Link
              className={`px-4 py-2 w-full bg-primary-light dark:bg-primary-dark text-primary-text-light dark:text-primary-text-dark hover:bg-primary-hover-light dark:hover:bg-primary-hover-dark hover:text-primary-hover-text-light dark:hover:text-primary-hover-text-dark active:bg-primary-active-light dark:active:bg-primary-active-dark active:text-primary-active-text-light dark:active:text-primary-active-text-dark rounded-lg text-center`}
              href="/"
            >
              {strings.generic.generate}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full items-center">
            <h1>{strings.reveal.head}</h1>
            <p className="flex items-center justify-center text-center w-full p-4 rounded-lg bg-warning text-dark text-sm">
              {strings.reveal.warning}
            </p>
            <button
              onClick={handleReveal}
              className={`px-4 py-2 w-full bg-secondary-light dark:bg-secondary-dark text-secondary-text-light dark:text-secondary-text-dark hover:bg-secondary-hover-light dark:hover:bg-secondary-hover-dark hover:text-secondary-text-dark dark:hover:text-secondary-text-dark active:bg-secondary-active-light dark:active:bg-secondary-active-dark active:text-secondary-active-text-light dark:active:text-secondary-active-text-dark rounded-lg`}
            >
              <span>{strings.generic.reveal}</span>
            </button>
          </div>
        )}
      </div>
      <Branding />
    </main>
  );
}
