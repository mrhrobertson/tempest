import config from "@/config/config.json";
import strings from "@/config/strings.json";
import Image from "next/image";
import MonospacedDisplay from "./style/MonospacedDisplay";
import { DocumentDuplicateIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { Moment } from "moment";
import { useEffect, useState } from "react";

export interface GLProps {
  link: string;
  theme: string;
  date: Moment;
}

export default function GeneratedLink({ link, theme, date }: GLProps) {
  var [recipient, setRecipient] = useState("");
  var [email, setEmail] = useState("");

  return (
    <div
      className={`flex flex-col items-center justify-center w-full sm:w-3/4 lg:w-1/2 p-4 rounded-2xl gap-4 bg-container-light dark:bg-container-dark`}
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
      <h1>{strings.generated.head}</h1>
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-4 w-full">
          <MonospacedDisplay>{link}</MonospacedDisplay>
          <button
            onClick={() => navigator.clipboard.writeText(link)}
            className={`flex gap-2 bg-secondary-light dark:bg-secondary-dark text-secondary-text-light dark:text-secondary-text-dark hover:bg-secondary-hover-light dark:hover:bg-secondary-hover-dark hover:text-secondary-text-dark dark:hover:text-secondary-text-dark active:bg-secondary-active-light dark:active:bg-secondary-active-dark active:text-secondary-active-text-light dark:active:text-secondary-active-text-dark rounded-lg w-full py-2 items-center justify-center`}
          >
            <DocumentDuplicateIcon className="w-5 h-5" />
            <span className="block">{strings.generic.copy}</span>
          </button>
          {config.default.email ? (
            <>
              <hr className="border-2 border-secondary-active-light dark:border-secondary-active-dark" />
              <p className="text-center">{strings.generated.email}</p>
              <input
                id="secret"
                onChange={(e: any) => setRecipient(e.target.value)}
                value={recipient}
                placeholder={strings.generated.place_name}
                className="bg-input-light dark:bg-input-dark placeholder-input-dark/50 dark:placeholder-input-light/50 dark:focus:outline-input-light/25 focus:outline-input-dark/25 rounded-lg px-4 py-2 w-full"
              />
              <input
                id="email"
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder={strings.generated.place_email}
                className="bg-input-light dark:bg-input-dark placeholder-input-dark/50 dark:placeholder-input-light/50 dark:focus:outline-input-light/25 focus:outline-input-dark/25 rounded-lg px-4 py-2 w-full"
              />
              <button
                onClick={() =>
                  (window.location.href = recipient
                    ? `mailto:${email}?subject=Link%20for%20${recipient}&body=${
                        recipient.split(" ")[0]
                      },%0D%0A%0D%0APlease%20find%20your%20sharing%20link%20below:%0D%0A%0D%0A${link}%0D%0A%0D%0AMany%20thanks,`
                    : `mailto:${email}?subject=Sharing%20Link&body=Hi,%0D%0A%0D%0APlease%20find%20your%20sharing%20link%20below:%0D%0A%0D%0A${link}%0D%0A%0D%0AMany%20thanks`)
                }
                className={`flex gap-2 bg-secondary-light dark:bg-secondary-dark text-secondary-text-light dark:text-secondary-text-dark hover:bg-secondary-hover-light dark:hover:bg-secondary-hover-dark hover:text-secondary-text-dark dark:hover:text-secondary-text-dark active:bg-secondary-active-light dark:active:bg-secondary-active-dark active:text-secondary-active-text-light dark:active:text-secondary-active-text-dark rounded-lg w-full py-2 items-center justify-center`}
              >
                <EnvelopeIcon className="w-5 h-5" />
                <span className="block">{strings.generated.send}</span>
              </button>
            </>
          ) : (
            <></>
          )}
          <hr className="border-2 border-secondary-active-light dark:border-secondary-active-dark" />
        </div>
      </div>
      <p>This link will expire on the {date.format("LLLL")}</p>
    </div>
  );
}
