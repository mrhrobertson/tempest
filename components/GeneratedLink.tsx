import strings from "@/config/strings.json";
import Image from "next/image";
import MonospacedDisplay from "./style/MonospacedDisplay";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { Moment } from "moment";

export interface GLProps {
  link: string;
  theme: string;
  date: Moment;
}

export default function GeneratedLink({ link, theme, date }: GLProps) {
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
        </div>
      </div>
      <p>This link will expire on the {date.format("LLLL")}</p>
    </div>
  );
}
