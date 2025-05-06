import { useParams, useSearchParams } from "react-router-dom";
import styles from "./CityItem.module.css";
import { UseCities } from "../context/citiesContext";
import { useEffect } from "react";
import Button from "./Button";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  const { id } = useParams();

  const { getCityInfo, currentCity, isLoading } = UseCities();

  useEffect(() => {
    getCityInfo(id);
  }, [id]);

  const { cityName, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.parentSeaction}>
      <div>
        <h5> city name </h5>
        <h2> {cityName} </h2>
      </div>
      <div>
        <h5> you wen to {cityName} on </h5>
        <h3> {formatDate(date || null)} </h3>
      </div>
      <div>
        <h5> your notes </h5>
        <h3> {notes} </h3>
      </div>
      <div>
        <h5> learn more </h5>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          <h3> Check out {cityName} on Wikipedia </h3>
        </a>
      </div>
      <Button btnTheme="white"> Back </Button>
    </div>
  );
}
