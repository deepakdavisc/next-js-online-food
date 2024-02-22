"use client";
import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useState, useEffect } from "react";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>({});
  const [sourceCords, setSourceCords] = useState<any>({});
  const [destinationCords, setDestinationCords] = useState<any>({});

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos);
    });
    setUserLocation({
      longitude: -122.4,
      latitude: 37.8,
    });
  };
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div>
      <UserLocationContext.Provider
        value={{
          userLocation,
          setUserLocation,
          sourceCords,
          setSourceCords,
          destinationCords,
          setDestinationCords,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="bg-blue-100">
            <Booking />
          </div>
          <div className="bg-red-100 col-span-2">
            <MapBoxMap />
          </div>
        </div>
      </UserLocationContext.Provider>
    </div>
  );
}
