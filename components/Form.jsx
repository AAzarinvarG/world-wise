// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button.jsx";
import { UseCities } from "../context/citiesContext.jsx";
import { useUrlPosition } from "../hooks/useUrlPosition.js";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function Form() {
  const [lat, lng] = useUrlPosition();

  const [date, setDate] = useState(new Date());
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function fetchCityData() {
      try {
        setError("");
        setIsLoadingGeocoding(true);
        const api = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await api.json();

        if (!data.countryCode)
          throw new Error(
            "Sorry, we don't have information about the place you clicked"
          );

        setCityName(data.city || data.locality || "");
        setCountryName(data.countryName);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  const navigate = useNavigate();
  const { setDataOnFakeApi } = UseCities();

  function clickHandler() {
    if (!date || !cityName) return;

    const newCity = {
      date,
      cityName,
      countryName,
      notes,
      position: { lat, lng },
    };

    setDataOnFakeApi(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message> 👋 Start by clicking somewhere on the map. </Message>;

  if (error) return <Message> {error}❗🫠 </Message>;

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <label> City Name </label>
      <input
        type="text"
        onChange={(e) => setCityName(e.target.value)}
        value={cityName}
      />

      {/* this tag name is : (label) */}
      <label> When did you go to? </label>
      <DatePicker
        onChange={(date) => setDate(date)}
        selected={date}
        dateFormat="dd/MM/yyyy"
      />

      <label> Notes about your trip to </label>
      <textarea
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
      ></textarea>

      <div className={styles.headerBtns}>
        <button className={styles.addBtn} onClick={clickHandler}>
          Add
        </button>
        <Button btnTheme="#d6dee0"> Back </Button>
      </div>
    </form>
  );
}
