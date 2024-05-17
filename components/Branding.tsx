import { HeartIcon } from "@heroicons/react/24/solid";

export default function Branding() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 text-sm absolute right-6 bottom-4 rounded-lg bg-container-light dark:bg-container-dark">
      Tempest, made with <HeartIcon className="h-4" /> by Mark Robertson
    </div>
  );
}
