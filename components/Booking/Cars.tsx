"use client";
import carList from "@/data/carList";
import React, { useState } from "react";
import Image from "next/image";

function Cars() {
  const [selectedCar, setSelectedCar] = useState<any>("");
  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select Car</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {carList.map((car) => (
          <div
            key={car.id}
            onClick={() => setSelectedCar(car.id)}
            className={`m-2 p-1 border-[1px] border-gray-500 rounded-md hover:border-yellow-500 flex flex-col justify-between ${
              selectedCar === car.id ? "border-yellow-500 border-[2px]" : ""
            }`}
          >
            <Image
              src={car.image}
              alt={car.name}
              width={75}
              height={90}
              className="w-full"
            />
            <div className="flex justify-between align-bottom">
              <span className="text-[12px]">{car.name}</span>
              <span className="text-[12px] float-right text-black font-medium">
                {car.charges}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
