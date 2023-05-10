import "./App.css";
import Bookings from "./components/Bookings";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import Vehicles from "./components/Vehicles";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CookieBanner from "./components/CookieBanner";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<SignInPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <Bookings />
            </PrivateRoute>
          }
        />
        <Route exact path="/vehicles" element={<Vehicles />} />
        <Route exact path="/cookie" element={<CookieBanner />} />
      </Routes>
    </div>
  );
}

export default App;
