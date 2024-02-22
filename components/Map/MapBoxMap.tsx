"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const session_token = "7ce445cc-3fc1-11ee-be56-0242ac120002";

function MapBoxMap() {
  const [directionData, setDirectionData] = useState<any>("");
  const { userLocation, setUserLocation, sourceCords, destinationCords } =
    useContext(UserLocationContext);
  const mapRef = useRef<any>();
  useEffect(() => {
    if (sourceCords) {
      mapRef.current?.flyTo({
        center: [sourceCords.lng, sourceCords.lat],
        duration: 2500,
      });
    }
  }, [sourceCords]);
  useEffect(() => {
    if (destinationCords) {
      mapRef.current?.flyTo({
        center: [destinationCords.lng, destinationCords.lat],
        duration: 2500,
      });
    }
  }, [destinationCords]);

  const getDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
        sourceCords.lng +
        "," +
        sourceCords.lat +
        ";" +
        destinationCords.lng +
        "," +
        destinationCords.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    console.log(result);
    console.log(result.routes);
    setDirectionData(result);
  };
  console.log("sourceCords, destinationCords", sourceCords, destinationCords);
  return (
    <div>
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: "100%", height: 400, borderRadius: 10 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Markers />
      </Map>
    </div>
  );
}

export default MapBoxMap;
