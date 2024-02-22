"use client";
import CardsList from "@/data/CardsList";
import React, { useState } from "react";
import Image from "next/image";

function Cards() {
  const [selectedCard, setSelectedCard] = useState<any>("");
  return (
    <div className="mt-3">
      <h2 className="text-[15px] font-bold">Payment Methods</h2>
      <div className="grid grid-cols-5">
        {CardsList.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card.id)}
            className={`border-[1px] roun border-gray-500 p-3 m-3 flex items-center hover:border-yellow-500 hover:border-[2px] cursor-pointer ${
              selectedCard === card.id ? "border-[2px] border-yellow-500" : ""
            }`}
          >
            <Image src={card.image} alt={card.name} width={50} height={50} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
