import { HeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Branding() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 text-xs sm:text-sm justify-center w-full lg:w-auto xl:absolute xl:right-6 xl:bottom-4 rounded-lg bg-container-light dark:bg-container-dark">
      <Link
        href={"https://github.com/mrhrobertson/tempest"}
        target="_blank"
        className="text-primary-light dark:text-primary-dark hover:text-primary-hover-light dark:hover:text-primary-hover-dark hover:underline hover:underline-offset-2 p-0 m-0"
      >
        Tempest
      </Link>
      <p className="flex gap-1 items-center">
        - made with <HeartIcon className="h-4" /> by mrhrobertson
      </p>
    </div>
  );
}
