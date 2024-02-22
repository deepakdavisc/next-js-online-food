"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useState } from "react";
const session_token = "3fa1a95c-3f62-11ee-be56-0242ac120002";
const MAPBOX_RETRIVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";

function AutoCompleteAddress() {
  const [source, setSource] = useState<any>("");
  const [destination, setDestination] = useState<any>("");
  const [sourceCordinates, setSourceCordinates] = useState<any>({});

  const [sourceChanges, setSourceChanges] = useState<Boolean>(false);
  const [destinationChanges, setDestinationChanges] = useState<Boolean>(false);

  const [addressList, setaddressList] = useState<any>([]);

  const { setSourceCords, setDestinationCords } =
    useContext(UserLocationContext);

  useEffect(() => {
    const delayDebouncing = setTimeout(() => {
      getAddressList();
    }, 1000);
    return () => clearTimeout(delayDebouncing);
  }, [source, destination]);

  const getAddressList = async () => {
    // if (source.length < 3 ) {
    //   console.log(source);
    //   return null;
    // }
    const req = await fetch(`/api/search-address?q=${source}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await req.json();
    setaddressList(result);
  };

  const getCordsOfSourceAddress = async (address: any) => {
    setSource(address.full_address);
    setaddressList([]);
    setSourceChanges(false);

    const getCords = await fetch(
      `${MAPBOX_RETRIVE_URL}${address.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
    );

    const cordsResult = await getCords.json();
    setSourceCords({
      lng: cordsResult.features[0].geometry.coordinates[0],
      lat: cordsResult.features[0].geometry.coordinates[1],
    });
    // console.log(cordsResult);
  };

  const getCordsOfDestinationAddress = async (address: any) => {
    setDestination(address.full_address);
    setaddressList([]);
    setDestinationChanges(false);

    const getCords = await fetch(
      `${MAPBOX_RETRIVE_URL}${address.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
    );

    const cordsResult = await getCords.json();
    setDestinationCords({
      lng: cordsResult.features[0].geometry.coordinates[0],
      lat: cordsResult.features[0].geometry.coordinates[1],
    });
    // console.log(cordsResult);
  };

  return (
    <div>
      <div className="relative ">
        <label>Where from</label>
        <input
          type="text"
          className="outline-none bg-white p-1 border-[1px] w-full rounded-md focus:border-yellow-100"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChanges(true);
          }}
        />
        {addressList?.suggestions && sourceChanges && (
          <div className="shadow-md rounded-md absolute bg-white p-1 w-full top-[-1]">
            {addressList?.suggestions &&
              addressList.suggestions.map((address: any, index: number) => (
                <h2
                  key={address.full_address}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    getCordsOfSourceAddress(address);
                  }}
                >
                  {address.full_address}
                </h2>
              ))}
          </div>
        )}
      </div>
      <div className="mt-4">
        <label>Where to</label>
        <input
          type="text"
          className="outline-none bg-white p-1 border-[1px] w-full rounded-md focus:border-yellow-100"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setDestinationChanges(true);
          }}
        />
        {addressList?.suggestions && destinationChanges && (
          <div className="shadow-md rounded-md absolute bg-white p-1 w-full top-[-1]">
            {addressList?.suggestions &&
              addressList.suggestions.map((address: any, index: number) => (
                <h2
                  key={`destination-${address.full_address}`}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    getCordsOfDestinationAddress(address);
                  }}
                >
                  {address.full_address}
                </h2>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AutoCompleteAddress;
