import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import Country from "./Country";
import { UseCities } from "../context/citiesContext";

export default function CountryList() {
  const { cities, isLoading, errorMessage } = UseCities();

  if (isLoading) return <Spinner />;

  if (errorMessage)
    return <Message> There is an error getting information 🤷🏻‍♂️ </Message>;

  const countries = cities.reduce((arr, obj) => {
    if (!arr.map((item) => item.country).includes(obj.country)) { // arr.map((item) => item.country) = ["item1", "item2", "item3"]
      return [...arr, { country: obj.countryName }];
    } else {
      return [...arr];
    }
  }, []);

  return cities.length ? (
    <ul className={styles.countryList}>
      {countries.map((item) => (
        <Country item={item} key={item.countryName} />
      ))}
    </ul>
  ) : (
    <Message>Add your first city by clicking on a city on the map 🗺</Message>
  );
}
