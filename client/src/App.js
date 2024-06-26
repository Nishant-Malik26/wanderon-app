import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { useEffect } from "react";
import { loadUser } from "./reducers/register";
import Dashboard from "./components/dashboard/Dashboard";
import { PrivateRoutes } from "./components/routing/PrivateRoutes";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://wanderon-app.onrender.com/";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </section>
        </Router>
      </Provider>
    </>
  );
}

export default App;
