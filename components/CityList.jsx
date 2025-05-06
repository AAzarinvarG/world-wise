import styles from "./CityList.module.css";
import City from "./City";
import Spinner from "./Spinner";
import Message from "./Message";
import { UseCities } from "../context/citiesContext";

export default function CityList() {
  const { cities, isLoading, errorMessage } = UseCities();

  if (isLoading) return <Spinner />;

  if (errorMessage)
    return <Message> There is an error getting information 🤷🏻‍♂️ </Message>;

  return cities.length ? (
    <ul className={styles.cityListSection}>
      {cities.map((item) => (
        <City cityInfo={item} key={item.id} />
      ))}
    </ul>
  ) : (
    <Message>Add your first city by clicking on a city on the map 🗺</Message>
  );
}
