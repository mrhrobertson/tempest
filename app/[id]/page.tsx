"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { revealSecret } from "@/app/actions";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { Source_Code_Pro } from "next/font/google";

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
    const res: string | undefined = await revealSecret(payload);
    setMessage(res!);
    setReveal(true);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-8 bg-zinc-400 dark:bg-zinc-950">
      <div className="flex flex-col items-center justify-center w-1/4 p-4 rounded-2xl gap-4 bg-zinc-300 dark:bg-zinc-800">
        {reveal && message ? (
          <div className="flex flex-col w-full gap-4 items-center">
            <h1>Here's the content!</h1>
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 w-full">
              <span
                style={scp.style}
                className="text-xs p-4 bg-zinc-900 rounded-lg md:rounded-e-none md:rounded-s-lg w-full md:w-11/12 select-all break-words"
              >
                {message}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(message)}
                className="flex gap-2 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:active:bg-zinc-700 rounded-lg md:rounded-e-lg md:rounded-s-none w-full md:w-1/12 py-2 items-center justify-center"
              >
                <DocumentDuplicateIcon className="w-5 h-5" />
                <span className="block md:hidden">Copy to Clipboard</span>
              </button>
            </div>
            <Link
              className="flex-grow px-4 py-4 md:py-2 w-full bg-blue-500 text-white text-center rounded-lg"
              href="/"
            >
              Generate Link
            </Link>
          </div>
        ) : reveal && !message ? (
          <div className="flex flex-col w-full gap-4 items-center">
            <h1>The link has either expired or invalid.</h1>
            <p className="flex items-center w-full p-4 rounded-lg text-center bg-red-500 text-white text-sm">
              To generate your own link, click below.
            </p>
            <Link
              className="px-4 py-4 md:py-2 w-full dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:active:bg-zinc-700 rounded-lg text-center"
              href="/"
            >
              Generate Link
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full items-center">
            <h1>Do you wish to reveal the content of this link?</h1>
            <p className="flex items-center text-center w-full p-4 rounded-lg bg-red-500 text-white text-sm">
              Once you click through, the data will be deleted from the servers
              and won't be viewable again.
            </p>
            <button
              onClick={handleReveal}
              className="px-4 py-4 md:py-2 w-full dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:active:bg-zinc-700 rounded-lg"
            >
              <span>Reveal Secret</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
