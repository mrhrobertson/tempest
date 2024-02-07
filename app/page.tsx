"use client";

import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { Source_Code_Pro } from "next/font/google";
import { submit } from "@/app/actions";
import { DocumentDuplicateIcon, PhoneIcon } from "@heroicons/react/24/solid";
import strings from "@/config/strings.json";
import config from "@/config/config.json";
import Image from "next/image";

const scp = Source_Code_Pro({ subsets: ["latin"] });

export default function Home() {
  var [content, setContent] = useState<string>("");
  var [amount, setAmount] = useState<number>(config.default.amount);
  var [period, setPeriod] = useState<string>(config.default.period);
  var [clicks, setClicks] = useState<number>(config.default.clicks);
  var [date, setDate] = useState<Moment>(
    moment().add(
      config.default.amount,
      config.default.period as moment.unitOfTime.DurationConstructor
    )
  );
  var [link, setLink] = useState<string>("");
  var [loading, setLoading] = useState<boolean>(false);
  var [theme, setTheme] = useState<string>();

  var phone = strings.generic.phone.replaceAll(" ", "");

  useEffect(() => {
    setDate(
      moment().add(amount, period as moment.unitOfTime.DurationConstructor)
    );
  }, [amount, period]);

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

  const resetValues = () => {
    setContent("");
    setAmount(1);
    setPeriod("h");
    setLink("");
    setClicks(1);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const payload = { content, amount, period, clicks };
    const res: string | null = await submit(payload);
    setLink(`${window.location.origin}/${res}`);
    setLoading(false);
  };

  return (
    <main
      className={`flex min-h-screen w-full p-8 flex-col items-center justify-center text-light dark:text-dark bg-main-light dark:bg-main-dark`}
    >
      {link ? (
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
          <h1>{strings.generated.head}!</h1>
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 w-full">
              <span
                style={scp.style}
                className={`text-xs p-4 text-dark bg-display-light dark:bg-display-dark rounded-lg md:rounded-e-none md:rounded-s-lg w-full md:w-10/12 select-all break-words`}
              >
                {link}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(link)}
                className={`flex gap-2 bg-secondary-light dark:bg-secondary-dark text-secondary-text-light dark:text-secondary-text-dark hover:bg-secondary-hover-light dark:hover:bg-secondary-hover-dark hover:text-secondary-text-dark dark:hover:text-secondary-text-dark active:bg-secondary-active-light dark:active:bg-secondary-active-dark active:text-secondary-active-text-light dark:active:text-secondary-active-text-dark rounded-lg md:rounded-e-lg md:rounded-s-none w-full md:w-2/12 py-2 items-center justify-center`}
              >
                <DocumentDuplicateIcon className="w-5 h-5" />
                <span className="block md:hidden">{strings.generic.copy}</span>
              </button>
            </div>
          </div>
          <p>This link will expire on the {date.format("LLLL")}</p>
          <button
            type="submit"
            disabled={loading}
            onClick={() => resetValues()}
            className={`flex-grow px-4 py-2 w-full bg-primary-light dark:bg-primary-dark text-primary-text-light dark:text-primary-text-dark hover:bg-primary-hover-light dark:hover:bg-primary-hover-dark hover:text-primary-hover-text-light dark:hover:text-primary-hover-text-dark active:bg-primary-active-light dark:active:bg-primary-active-dark active:text-primary-active-text-light dark:active:text-primary-active-text-dark rounded-lg`}
          >
            <span>{strings.generic.generate}</span>
          </button>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center sm:3/4 lg:w-1/2 p-8 rounded-2xl gap-4 bg-container-light dark:bg-container-dark`}
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
              className="bg-input-light dark:bg-input-dark placeholder-input-dark/50 dark:placeholder-input-light/50 dark:focus:outline-input-light/25 focus:outline-input-dark/25 rounded-lg p-4 w-full"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex-grow px-4 py-2 bg-primary-light dark:bg-primary-dark text-primary-text-light dark:text-primary-text-dark hover:bg-primary-hover-light dark:hover:bg-primary-hover-dark hover:text-primary-hover-text-light dark:hover:text-primary-hover-text-dark active:bg-primary-active-light dark:active:bg-primary-active-dark active:text-primary-active-text-light dark:active:text-primary-active-text-dark rounded-lg`}
            >
              {loading ? (
                <span>{strings.generate.clicked}</span>
              ) : (
                <span>{strings.generic.generate}</span>
              )}
            </button>
            <div className="flex w-full items-center gap-4">
              <div className="flex w-2/3 items-center">
                <label htmlFor="amount" className="pr-4">
                  TTL:
                </label>
                <input
                  className="rounded-l-md items-center text-center p-2 text-light dark:text-dark bg-input-light dark:bg-input-dark"
                  id="amount"
                  type="number"
                  onChange={(e: any) => setAmount(parseInt(e.target.value))}
                  min={
                    period == "h"
                      ? config.hours.min
                      : period == "d"
                      ? config.days.min
                      : period == "w"
                      ? config.weeks.min
                      : 1
                  }
                  max={
                    period == "h"
                      ? config.hours.max
                      : period == "d"
                      ? config.days.max
                      : period == "w"
                      ? config.weeks.max
                      : 1
                  }
                  value={amount}
                />
                <select
                  className="rounded-r-md items-center p-2 appearance-none flex-grow text-light dark:text-dark bg-input-light dark:bg-input-dark"
                  id="period"
                  onChange={(e: any) => setPeriod(e.target.value)}
                  value={period}
                >
                  {config.hours.enabled ? (
                    <option value="h">hour{amount > 1 ? "s" : ""}</option>
                  ) : (
                    ""
                  )}
                  {config.days.enabled ? (
                    <option value="d">day{amount > 1 ? "s" : ""}</option>
                  ) : (
                    ""
                  )}
                  {config.weeks.enabled ? (
                    <option value="w">week{amount > 1 ? "s" : ""}</option>
                  ) : (
                    ""
                  )}
                </select>
              </div>
              <div className="flex flex-grow items-center">
                <p className="pr-4">Clicks:</p>
                <input
                  className="flex-grow rounded-md items-center text-center p-2 text-light dark:text-dark bg-input-light dark:bg-input-dark"
                  id="amount"
                  type="number"
                  onChange={(e: any) => setClicks(parseInt(e.target.value))}
                  min={config.clicks.min}
                  max={config.clicks.max}
                  value={clicks}
                />
              </div>
            </div>
          </form>
          <p className="text-center mt-4">
            This link will expire on the {date.format("LLLL")}. You can change
            this using the TTL (time-to-live). The link will be able to be
            revealed {clicks} time{clicks > 1 ? "s" : ""}.
          </p>
          {strings.generic.contact ? (
            <p className="flex items-center justify-center text-center text-dark bg-info-primary p-4 text-sm mt-2 rounded-lg w-full">
              {strings.generic.phone ? (
                strings.generic.contact.search("<phone>") ? (
                  <span className="w-full flex flex-row items-center justify-center gap-2">
                    {strings.generic.contact.split("<phone>")[0]}
                    <a
                      className="flex items-center justify-center gap-2 font-bold bg-info-button-primary hover:bg-info-button-hover py-2 px-4 rounded-md shadow-sm"
                      href={`tel:${phone}`}
                    >
                      <PhoneIcon className="w-4 h-4" />
                      {strings.generic.phone}
                    </a>
                    {strings.generic.contact.split("<phone>")[1]}
                  </span>
                ) : (
                  strings.generic.contact
                )
              ) : (
                strings.generic.contact
              )}
            </p>
          ) : (
            ""
          )}
        </div>
      )}
    </main>
  );
}
