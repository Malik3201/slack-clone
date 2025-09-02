import React from "react";
import Layout from "./components/Layout";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
