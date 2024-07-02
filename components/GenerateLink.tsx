import strings from "@/config/strings.json";
import config from "@/config/config.json";
import Link from "next/link";

export default function GenerateLink() {
  return config.reveal.link ? (
    <Link
      className={`px-4 py-2 w-full bg-primary-light dark:bg-primary-dark text-primary-text-light dark:text-primary-text-dark hover:bg-primary-hover-light dark:hover:bg-primary-hover-dark hover:text-primary-hover-text-light dark:hover:text-primary-hover-text-dark active:bg-primary-active-light dark:active:bg-primary-active-dark active:text-primary-active-text-light dark:active:text-primary-active-text-dark rounded-lg text-center`}
      href="/"
    >
      {strings.generic.generate}
    </Link>
  ) : (
    <></>
  );
}
