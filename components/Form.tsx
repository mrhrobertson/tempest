"use client";

import moment from "moment";
import { useEffect, useState } from "react";
import { submit } from "@/app/actions";

export default function Form() {
  var init_date = new Date(Date.now());

  var [amount, setAmount] = useState<number>(1);
  var [period, setPeriod] = useState<string>("h");
  var [date, setDate] = useState<string>(moment().add(amount, period as moment.unitOfTime.DurationConstructor).format('LLLL'));

  const handleAmountChange = (e) => {
    console.log(e.target.value, amount, period)
    setAmount(e.target.value);
    console.log(e.target.value, amount, period)
    var new_date : string = moment().add(e.target.value, period as moment.unitOfTime.DurationConstructor).format('LLLL');
    setDate(new_date);
  };

  const handlePeriodChange = (e) => {
    console.log(e.target.value, amount, period)
    setPeriod(e.target.value);
    console.log(e.target.value, amount, period)
    var new_date : string = moment().add(amount, e.target.value as moment.unitOfTime.DurationConstructor).format('LLLL');
    setDate(new_date);
  };

  return (
    <div className="flex flex-col items-center w-1/3 p-4 rounded-2xl gap-4 bg-zinc-300 dark:bg-zinc-800">
    <form action={submit} className="flex flex-col items-center w-full rounded-2xl gap-4 bg-zinc-300 dark:bg-zinc-800">
      <h1>Share what you want!</h1>
      <textarea
        id="content"
        rows={4}
        placeholder="Type to your hearts content..."
        className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 w-full"
      ></textarea>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <button type="submit" className="flex-grow px-4 py-2 bg-blue-500 text-white rounded-lg">
          Generate Link
        </button>
        <div className="flex w-1/3">
          <input
            className="rounded-l-md h-full items-center text-right w-1/3 text-black"
            id="amount"
            type="number"
            onClick={handleAmountChange}
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
            defaultValue={1}
          />
          <select
            className="rounded-r-md h-full items-center flex-grow text-black text-left"
            id="period"
            onChange={handlePeriodChange}
          >
            <option value="h">hour{amount > 1 ? "s" : ""}</option>
            <option value="d">day{amount > 1 ? "s" : ""}</option>
            <option value="w">week{amount > 1 ? "s" : ""}</option>
          </select>
        </div>
      </div>
    </form>
    <p>This link will expiry on the {date}</p>
    </div>
  );
}
