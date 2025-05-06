import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  errorMessage: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "GetCitiesInfo":
      return {
        ...state,
        cities: action.payload,
        errorMessage: false,
        isLoading: false,
      };

    case "GetCityInfo":
      return {
        ...state,
        errorMessage: false,
        currentCity: action.payload,
        isLoading: false,
      };

    case "CreateNewCity":
      return {
        ...state,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
        errorMessage: false,
        isLoading: false,
      };

    case "DeletedCity":
      return {
        ...state,
        errorMessage: false,
        cities: state.cities.filter((item) => item.id !== action.payload),
        isLoading: false,
      };

    case "Loading":
      return {
        ...state,
        isLoading: true,
      };

    case "Erroring":
      return {
        ...state,
        errorMessage: true,
        isLoading: false,
      };
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, errorMessage, currentCity }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    async function setDataOnState() {
      try {
        dispatch({ type: "Loading" });
        const api = await fetch("https://localhost:9000/cities");
        const res = await api.json();

        dispatch({ type: "GetCitiesInfo", payload: res });
      } catch {
        dispatch({ type: "Erroring" });
      }
    }

    setDataOnState();
  }, []);

  async function getCityInfo(id) {
    if (currentCity.id == id) return;

    try {
      dispatch({ type: "Loading" });
      const api = await fetch(`https://localhost:9000/cities/${id}`);
      const res = await api.json();

      dispatch({ type: "GetCityInfo", payload: res });
    } catch {
      dispatch({ type: "Erroring" });
    }
  }

  async function setDataOnFakeApi(newCity) {
    try {
      dispatch({ type: "Loading" });
      const api = await fetch("https://localhost:9000/cities", {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await api.json();

      dispatch({ type: "CreateNewCity", payload: res });
    } catch {
      dispatch({ type: "Erroring" });
    }
  }

  async function deleteCity(cityId) {
    try {
      dispatch({ type: "Loading" });
      await fetch(`https://localhost:9000/cities/${cityId}`, {
        method: "DELETE",
      });

      dispatch({ type: "DeletedCity", payload: cityId });
    } catch {
      dispatch({ type: "Erroring" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        errorMessage,
        getCityInfo,
        currentCity,
        setDataOnFakeApi,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function UseCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("Error in UseCitiesFunc");
  return context;
} // UseCities() = useContext(CitiesContext)

export { CitiesProvider, UseCities };
