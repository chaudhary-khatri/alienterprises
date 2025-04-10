"use client";

import React, { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Updated service centers with new location names and sample addresses/coordinates.
const serviceCenters = [
  {
    city: "Prayagraj",
    address: "101, Allahabad Road, Prayagraj, Uttar Pradesh, India",
    coordinates: [25.4358, 81.8463],
  },
  {
    city: "Gorakhpur",
    address: "202, City Center, Gorakhpur, Uttar Pradesh, India",
    coordinates: [26.7606, 83.3732],
  },
  {
    city: "Sultanpur",
    address: "123, Main Road, Sultanpur, Uttar Pradesh, India",
    coordinates: [26.26, 82.08],
  },
  {
    city: "Mirzapur",
    address: "456, Market Road, Mirzapur, Uttar Pradesh, India",
    coordinates: [25.15, 82.58],
  },
  {
    city: "Sasaram",
    address: "789, Station Road, Sasaram, Bihar, India",
    coordinates: [25.04, 84.18],
  },
  {
    city: "Pratapgarh",
    address: "101, Service Center, Pratapgarh, Uttar Pradesh, India",
    coordinates: [25.91, 81.82],
  },
];

const MapController = React.memo(({ coordinates }: { coordinates: [number, number] | null }) => {
  const map = useMap();
  if (coordinates) {
    map.setView(coordinates, 10, { animate: true });
  }
  return null;
});
MapController.displayName = "MapController";

const MemoizedMap = React.memo(({ selectedCoordinates }: { selectedCoordinates: [number, number] | null }) => (
  <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px] rounded-2xl overflow-hidden shadow-lg">
    <MapContainer
      center={[25.4358, 81.8463]} // Center around Prayagraj as a reference point.
      zoom={4}
      style={{ width: "100%", height: "100%", zIndex: 0 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        tileSize={256}
        zoomOffset={0}
        detectRetina={true}
      />
      {serviceCenters.map((center, index) => (
        <Marker
          key={index}
          position={[center.coordinates[0], center.coordinates[1]]}
          icon={
            new Icon({
              iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
              shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
            <strong>{center.city}</strong>
            <br />
            {center.address}
          </Popup>
        </Marker>
      ))}
      {selectedCoordinates && <MapController coordinates={selectedCoordinates} />}
    </MapContainer>
  </div>
));
MemoizedMap.displayName = "MemoizedMap";

const ServiceCentersSection = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleCityClick = useCallback(
    (city: string, coordinates: [number, number], address: string) => {
      setSelectedCity(city);
      setSelectedCoordinates(coordinates);
      setSelectedAddress(address);
    },
    []
  );

  return (
    <section id="service-centers" className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl lg:text-4xl font-semibold text-teal-700">Our Service Centers</h2>
            <div className="flex flex-wrap gap-4">
              {serviceCenters.map((center, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleCityClick(
                      center.city,
                      Array.isArray(center.coordinates) && center.coordinates.length === 2
                        ? (center.coordinates as [number, number])
                        : [0, 0],
                      center.address
                    )
                  }
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCity === center.city
                      ? "bg-teal-700 text-white scale-105"
                      : "bg-teal-100 text-teal-700 hover:bg-teal-200 hover:scale-105"
                  }`}
                >
                  {center.city}
                </button>
              ))}
            </div>
            {selectedAddress && selectedCity && (
              <div className="mt-8 p-4 bg-teal-100 rounded-lg shadow-md text-teal-700">
                <h3 className="font-semibold">Selected Location: {selectedCity}</h3>
                <p>{selectedAddress}</p>
              </div>
            )}
          </div>
          <div className="flex-1 relative">
            <MemoizedMap selectedCoordinates={selectedCoordinates} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCentersSection;
