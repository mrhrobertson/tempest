import Form from "@/components/Form";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-8 bg-zinc-400 dark:bg-zinc-950">
      <Form />
    </main>
  );
}
