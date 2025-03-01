"use client"; // Ensures client-side execution

import React, { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const serviceCenters = [
  { city: "Delhi", address: "123 Main Street, Delhi, India", coordinates: [28.6139, 77.2090] },
  { city: "Mumbai", address: "456 Ocean Drive, Mumbai, India", coordinates: [19.0760, 72.8777] },
  { city: "Bangalore", address: "789 Tech Park, Bangalore, India", coordinates: [12.9716, 77.5946] },
  { city: "Chennai", address: "321 South Road, Chennai, India", coordinates: [13.0827, 80.2707] },
  { city: "Kolkata", address: "654 Eastern Avenue, Kolkata, India", coordinates: [22.5726, 88.3639] },
  { city: "Ahmedabad", address: "Ahmedabad Center, Gujarat, India", coordinates: [23.0225, 72.5714] },
  { city: "Hyderabad", address: "Hyderabad Center, Telangana, India", coordinates: [17.3850, 78.4867] },
  { city: "Pune", address: "Pune Center, Maharashtra, India", coordinates: [18.5204, 73.8567] },
  { city: "Jaipur", address: "Jaipur Center, Rajasthan, India", coordinates: [26.9124, 75.7873] },
  { city: "Lucknow", address: "Lucknow Center, Uttar Pradesh, India", coordinates: [26.8467, 80.9462] },
];

const MapController = React.memo(({ coordinates }: { coordinates: [number, number] | null }) => {
  const map = useMap();
  // Only update map if valid coordinates are provided
  if (coordinates) {
    map.setView(coordinates, 10, { animate: true });
  }
  return null;
});

MapController.displayName = "MapController";

const MemoizedMap = React.memo(({ selectedCoordinates }: { selectedCoordinates: [number, number] | null }) => (
  <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px] rounded-2xl overflow-hidden shadow-lg">
    <MapContainer
      center={[22.5937, 78.9629]} // Center of India
      zoom={4}
      style={{
        width: "100%",
        height: "100%",
        zIndex: 0, // Ensures it stays below any floating elements
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        tileSize={256}
        zoomOffset={0}
        detectRetina={true} // Enable Retina display support
      />
      {serviceCenters.map((center, index) => (
        <Marker
          key={index}
          position={[center.coordinates[0], center.coordinates[1]]}  // Ensure it's a [lat, lon] tuple
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
            <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] rounded-2xl overflow-hidden">
              <MemoizedMap selectedCoordinates={selectedCoordinates} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCentersSection;
