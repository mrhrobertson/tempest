"use client";

import { useState } from "react";

export default function Form() {
  var [amount, setAmount] = useState(1);
  var [period, setPeriod] = useState("hour");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  return (
    <form className="flex flex-col items-center p-4 rounded-2xl gap-4 bg-zinc-300 dark:bg-zinc-800">
      <h1>Share what you want!</h1>
      <textarea
        rows={4}
        cols={45}
        placeholder="Type to your hearts content..."
        className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4"
      ></textarea>
      <div className="flex gap-4 w-full">
        <button className="flex-grow px-4 py-2 bg-blue-500 text-white rounded-lg">
          Generate Link
        </button>
        <div className="flex w-1/3">
          <input
            className="rounded-l-md h-full items-center text-center w-1/3 text-black"
            id="amount"
            type="number"
            onChange={handleAmountChange}
            min={1}
            max={
              period == "hour"
                ? 24
                : period == "day"
                ? 30
                : period == "week"
                ? 12
                : 1
            }
            defaultValue={1}
          />
          <select
            className="rounded-r-md h-full items-center flex-grow text-black text-center"
            name="periods"
            onChange={handlePeriodChange}
          >
            <option value="hour">hour{amount > 1 ? "s" : ""}</option>
            <option value="day">day{amount > 1 ? "s" : ""}</option>
            <option value="week">week{amount > 1 ? "s" : ""}</option>
          </select>
        </div>
      </div>
    </form>
  );
}
