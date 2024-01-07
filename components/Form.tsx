"use client";

import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { Source_Code_Pro } from "next/font/google";
import { submit } from "@/app/actions";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import strings from "@/public/config/strings.json";
import theme from "@/public/config/theme.json";

const scp = Source_Code_Pro({ subsets: ["latin"] });

export default function Form() {
  var [content, setContent] = useState<string>("");
  var [amount, setAmount] = useState<number>(1);
  var [period, setPeriod] = useState<string>("h");
  var [date, setDate] = useState<Moment>(
    moment().add(amount, period as moment.unitOfTime.DurationConstructor)
  );
  var [link, setLink] = useState<string>("");
  var [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setDate(
      moment().add(amount, period as moment.unitOfTime.DurationConstructor)
    );
  }, [amount, period]);

  const resetValues = () => {
    setContent("");
    setAmount(1);
    setPeriod("h");
    setLink("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const payload = { content, amount, period };
    const res: string = await submit(payload);
    setLink(`${window.location.origin}/${res}`);
    setLoading(false);
  };

  return link ? (
    <main
      className={`flex min-h-screen w-full flex-col items-center justify-center text-${theme.text.light} dark:text-${theme.text.dark} p-8 bg-${theme.bg.main.light} dark:bg-${theme.bg.main.dark}`}
    >
      <div
        className={`flex flex-col items-center justify-center w-full sm:w-3/4 lg:w-1/2 p-4 rounded-2xl gap-4 bg-${theme.bg.container.light} dark:bg-${theme.bg.container.dark}`}
      >
        <h1>{strings.generated.head}!</h1>
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 w-full">
            <span
              style={scp.style}
              className={`text-xs p-4 text-${theme.text.dark} bg-${theme.bg.display.light} dark:bg-${theme.bg.display.dark} rounded-lg md:rounded-e-none md:rounded-s-lg w-full md:w-10/12 select-all break-words`}
            >
              {link}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(link)}
              className={`flex gap-2 bg-${theme.button.secondary.light} dark:bg-${theme.button.secondary.dark} text-${theme.button.secondary.text.light} dark:text-${theme.button.secondary.text.dark} hover:bg-${theme.button.secondary.hover.light} dark:hover:bg-${theme.button.secondary.hover.dark} hover:text-${theme.button.secondary.hover.text.light} dark:hover:text-${theme.button.secondary.hover.text.dark} active:bg-${theme.button.secondary.active.light} dark:active:bg-${theme.button.secondary.active.dark} active:text-${theme.button.secondary.active.text.light} dark:active:text-${theme.button.secondary.active.text.dark} rounded-lg md:rounded-e-lg md:rounded-s-none w-full md:w-2/12 py-2 items-center justify-center`}
            >
              <DocumentDuplicateIcon className="w-5 h-5" />
              <span className="block md:hidden">{strings.generic.copy}</span>
            </button>
          </div>
        </div>
        <p>This link will expiry on the {date.format("LLLL")}</p>
        <button
          type="submit"
          disabled={loading}
          onClick={() => resetValues()}
          className={`flex-grow px-4 py-4 md:py-2 w-full bg-${theme.button.primary.light} dark:bg-${theme.button.primary.dark} text-${theme.button.primary.text.light} dark:text-${theme.button.primary.text.dark} hover:bg-${theme.button.primary.hover.light} dark:hover:bg-${theme.button.primary.hover.dark} hover:text-${theme.button.primary.hover.text.light} dark:hover:text-${theme.button.primary.hover.text.dark} active:bg-${theme.button.primary.active.light} dark:active:bg-${theme.button.primary.active.dark} active:text-${theme.button.primary.active.text.light} dark:active:text-${theme.button.primary.active.text.dark} rounded-lg`}
        >
          <span>{strings.generic.generate}</span>
        </button>
      </div>
    </main>
  ) : (
    <main
      className={`flex min-h-screen w-full flex-col items-center justify-center text-${theme.text.light} dark:text-${theme.text.dark} p-8 bg-${theme.bg.main.light} dark:bg-${theme.bg.main.dark}`}
    >
      <div className="flex flex-col items-center sm:3/4 lg:w-1/2 p-4 rounded-2xl gap-4 bg-zinc-300 dark:bg-zinc-800">
        <h1>{strings.generate.head}</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full rounded-2xl gap-4 bg-zinc-300 dark:bg-zinc-800"
        >
          <textarea
            id="content"
            rows={4}
            onChange={(e: any) => setContent(e.target.value)}
            value={content}
            placeholder={strings.generate.place}
            className="bg-zinc-100 dark:bg-zinc-900 placeholder-zinc-900/50 dark:placeholder-zinc-100/50 dark:focus:outline-zinc-100/25 focus:outline-zinc-900/25 rounded-lg p-4 w-full"
          ></textarea>
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <button
              type="submit"
              disabled={loading}
              className={`w-full lg:w-1/2 px-4 py-2 bg-${theme.button.primary.light} dark:bg-${theme.button.primary.dark} text-${theme.button.primary.text.light} dark:text-${theme.button.primary.text.dark} hover:bg-${theme.button.primary.hover.light} dark:hover:bg-${theme.button.primary.hover.dark} hover:text-${theme.button.primary.hover.text.light} dark:hover:text-${theme.button.primary.hover.text.dark} active:bg-${theme.button.primary.active.light} dark:active:bg-${theme.button.primary.active.dark} active:text-${theme.button.primary.active.text.light} dark:active:text-${theme.button.primary.active.text.dark} rounded-lg`}
            >
              {loading ? (
                <span>{strings.generate.clicked}</span>
              ) : (
                <span>{strings.generic.generate}</span>
              )}
            </button>
            <div className="flex w-full lg:w-1/2 items-center">
              <p className="mr-4">TTL:</p>
              <input
                className="rounded-l-md items-center text-center p-2 text-zinc-900 dark:text-zinc-50 dark:bg-zinc-900"
                id="amount"
                type="number"
                onChange={(e: any) => setAmount(parseInt(e.target.value))}
                min={1}
                max={
                  period == "h"
                    ? 24
                    : period == "d"
                    ? 30
                    : period == "w"
                    ? 12
                    : 1
                }
                value={amount}
              />
              <select
                className="rounded-r-md items-center text-center p-2 appearance-none flex-grow text-zinc-900 dark:text-zinc-50 dark:bg-zinc-900"
                id="period"
                onChange={(e: any) => setPeriod(e.target.value)}
                value={period}
              >
                <option value="h">hour{amount > 1 ? "s" : ""}</option>
                <option value="d">day{amount > 1 ? "s" : ""}</option>
                <option value="w">week{amount > 1 ? "s" : ""}</option>
              </select>
            </div>
          </div>
        </form>
        <p className="text-center">
          This link will expiry on the {date.format("LLLL")}. You can change
          this using the TTL (time-to-live).
        </p>
      </div>
    </main>
  );
}
