// import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { UseCities } from "../context/citiesContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { FakeUser } from "./FakeUser";

export default function Map() {
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    error,
    getPosition,
  } = useGeolocation();

  // farqe useNavigate ba (navLink | Link) ine ke harja va to har eventi mitoni az in estefade koni
  // vali (navLink | Link) bayad roshon click koni ta maro bebaran be url morede nazaremoon!

  const { cities } = UseCities();
  const [mapLat, mapLng] = useUrlPosition();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapSection}>
      <FakeUser />

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((item) => (
          <Marker
            position={[item.position.lat, item.position.lng]}
            key={item.id}
          >
            <Popup>
              <img src={item.img} alt="emogiFlag" className={styles.flagPng} />
              <p className={styles.cityNameInPopup}> {item.cityName} </p>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>

      {!geolocationPosition && (
        <div className={styles.btnHeader}>
          <button
            onClick={() => getPosition()}
            className={styles.myPositionBtn}
          >
            {isLoadingPosition ? "Loading..." : "use your position"}
          </button>
        </div>
      )}
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
