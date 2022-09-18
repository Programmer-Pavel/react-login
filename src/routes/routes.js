import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import ChangePassword from "../components/ChangePassword";
import Layout from "../components/Layout";
import Missing from "../components/Missing";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      {/* private routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>

      {/* public routes */}
      <Route path="/auth" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Missing />} />
    </Route>
  </Routes>
);
