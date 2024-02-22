import React from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";

function Booking() {
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-bold">Booking</h2>
      <div className="border-[1px] p-5 rounded-md border-slate-500">
        <AutoCompleteAddress />
        <Cars />
        <Cards />
        <button className="w-full rounded-md bg-yellow-500 mt-3 p-4">
          Book Car
        </button>
      </div>
    </div>
  );
}

export default Booking;
