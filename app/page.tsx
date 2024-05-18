"use client";

import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { Source_Code_Pro } from "next/font/google";
import { submit } from "@/app/actions";
import { DocumentDuplicateIcon, PhoneIcon } from "@heroicons/react/24/solid";
import strings from "@/config/strings.json";
import config from "@/config/config.json";
import Image from "next/image";
import MonospacedDisplay from "@/components/style/MonospacedDisplay";
import GeneratedLink from "@/components/GeneratedLink";
import Branding from "@/components/Branding";

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
  var [theme, setTheme] = useState<string>("");
  var [multiline, setMultiline] = useState<boolean>(config.input.multiline);

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
    setAmount(config.default.amount);
    setPeriod(config.default.period);
    setLink("");
    setClicks(config.default.clicks);
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
      className={`flex min-h-screen w-full p-8 flex-col items-center justify-center gap-4 text-light dark:text-dark bg-main-light dark:bg-main-dark`}
    >
      {link ? (
        <GeneratedLink link={link} theme={theme} date={date} />
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
          <h1 className="text-center w-3/4">{strings.generate.head}</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full rounded-2xl gap-4 bg-zinc-300 dark:bg-zinc-800"
          >
            {multiline ? (
              <textarea
                id="secret"
                onChange={(e: any) => setContent(e.target.value)}
                value={content}
                placeholder={strings.generate.place}
                className="bg-input-light dark:bg-input-dark placeholder-input-dark/50 dark:placeholder-input-light/50 dark:focus:outline-input-light/25 focus:outline-input-dark/25 rounded-lg px-4 py-3 min-h-32 max-h-64 w-full"
              />
            ) : (
              <input
                id="secret"
                onChange={(e: any) => setContent(e.target.value)}
                value={content}
                placeholder={strings.generate.place}
                className="bg-input-light dark:bg-input-dark placeholder-input-dark/50 dark:placeholder-input-light/50 dark:focus:outline-input-light/25 focus:outline-input-dark/25 rounded-lg px-4 py-3 w-full"
              />
            )}

            <div className="flex flex-col lg:flex-row w-full lg:items-center justify-between gap-4">
              <div className="flex items-center justify-between">
                <label htmlFor="amount" className="pr-4">
                  {strings.generic.ttl}
                </label>
                <div className="flex">
                  <input
                    className="rounded-l-md items-center text-center py-3 text-light dark:text-dark bg-input-light dark:bg-input-dark"
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
                    required
                  />
                  <select
                    className="rounded-r-md items-center px-2 py-3 appearance-none text-light dark:text-dark bg-input-light dark:bg-input-dark"
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
              </div>
              <div className="flex sm:md:flex-initial lg:flex items-center">
                <label htmlFor="amount" className="pr-4">
                  {strings.generic.clicks}
                </label>
                <input
                  className="flex-grow rounded-md items-center text-center px-1 py-3 text-light dark:text-dark bg-input-light dark:bg-input-dark"
                  id="clicks"
                  type="number"
                  onChange={(e: any) => setClicks(parseInt(e.target.value))}
                  min={config.clicks.min}
                  max={config.clicks.max}
                  value={clicks}
                  required
                />
              </div>
            </div>
            <button
              id="generate"
              type="submit"
              disabled={loading}
              className={`w-full flex-grow px-4 py-3 bg-primary-light dark:bg-primary-dark text-primary-text-light dark:text-primary-text-dark hover:bg-primary-hover-light dark:hover:bg-primary-hover-dark hover:text-primary-hover-text-light dark:hover:text-primary-hover-text-dark active:bg-primary-active-light dark:active:bg-primary-active-dark active:text-primary-active-text-light dark:active:text-primary-active-text-dark rounded-lg`}
            >
              {loading ? (
                <span>{strings.generate.clicked}</span>
              ) : (
                <span>{strings.generic.generate}</span>
              )}
            </button>
          </form>
          <p className="text-center mt-4">
            This link will expire on the {date.format("LLLL")}. The link can be
            viewed {clicks} time{clicks > 1 ? "s" : ""}.
          </p>
          {strings.generic.contact ? (
            <p className="flex items-center justify-center text-center text-dark bg-info-primary p-4 text-xs sm:text-sm mt-3 rounded-lg w-full">
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
            <></>
          )}
        </div>
      )}
      <Branding />
    </main>
  );
}
