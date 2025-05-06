import { Link } from "react-router-dom";
import styles from "./City.module.css";
import { UseCities } from "../context/citiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function City({ cityInfo }) {
  const { img, cityName, date, id, position } = cityInfo;
  const { currentCity, deleteCity } = UseCities();

  function deleteHandler(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <>
      <li className={styles.parentCity}>
        <Link
          className={`${currentCity.id == id ? styles.border : ""} ${
            styles.city
          }`}
          to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        >
          <div>
            <img src={img} alt={cityName} />
            <h3> {cityName} </h3>
          </div>
          <div>
            <time> {formatDate(date)} </time>
            <button className={styles.btn} onClick={deleteHandler}>
              &times;
            </button>
          </div>
        </Link>
      </li>
    </>
  );
}
