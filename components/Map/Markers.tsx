import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext } from "react";
import { Marker } from "react-map-gl";

function Markers() {
  const { userLocation, setUserLocation, sourceCords, destinationCords } =
    useContext(UserLocationContext);
  console.log(
    "destinationCords.lng",
    destinationCords.lng,
    destinationCords.lat
  );
  return (
    <>
      {sourceCords.lng && (
        <Marker
          latitude={sourceCords?.lat}
          longitude={sourceCords?.lng}
          anchor="bottom"
        >
          <img src="./pin.png" className="w-10 h-10" />
        </Marker>
      )}
      {destinationCords.lng && (
        <Marker
          latitude={destinationCords?.lat}
          longitude={destinationCords?.lng}
          anchor="bottom"
        >
          <img src="./pin.png" className="w-10 h-10" />
        </Marker>
      )}
    </>
  );
}

export default Markers;
