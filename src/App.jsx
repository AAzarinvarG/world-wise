// first project with (Router) | this project is: (SPA) => (Single Page Application)

// hooki ke bahashon mitoni path site ro avaz koni: useNavigate()
// componnent hayei ke bahashon mitoni path site ro avaz koni: <Navigate />, <Link />, <NavLink />

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "../components/CityList";
import CountryList from "../components/CountryList";
import CityItem from "../components/CityItem";
import Form from "../components/Form";
import { CitiesProvider } from "../context/citiesContext";
import { AuthProvider } from "../context/fakeAuthContext";

export default function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <div className="app">
          <BrowserRouter>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<CityItem />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </CitiesProvider>
  );
}
