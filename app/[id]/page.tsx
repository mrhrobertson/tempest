"use client";

import { NextPageContext } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  const [uuid, setUUID] = useState<string>(
    usePathname().split("~")[0].split("/")[1]
  );
  const [key, setKey] = useState<string>(usePathname().split("~")[1]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-8 bg-zinc-400 dark:bg-zinc-950">
      <div className="flex flex-col items-center justify-center w-1/2 p-4 rounded-2xl gap-4 bg-zinc-300 dark:bg-zinc-800">
        {loading ? (
          <h1>Loading...</h1>
        ) : found && !show ? (
          <div className="flex flex-col gap-4 w-full items-center">
            <h1>
              UUID: {uuid} <br /> Key: {key}
            </h1>
          </div>
        ) : found && show ? (
          <div className="flex flex-col gap-4 w-full items-center"></div>
        ) : (
          <div className="flex flex-col gap-4 w-full items-center">
            <h1>
              The token you provided has either been viewed or is invalid.
            </h1>
            <p className="text-sm">
              To use Tempest to generate a valid link, please click below.
            </p>
            <Link
              className="px-4 py-4 w-full bg-blue-500 text-white rounded-lg text-center"
              href={"/"}
            >
              Generate Link
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
