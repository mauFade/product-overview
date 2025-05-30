import React from "react";
import ProductsDashboard from "./components/products-dashboard";
import { Navigation } from "@/components/navigation";

const DashboardPage = () => {
  return (
    <>
      <Navigation />
      <ProductsDashboard />
    </>
  );
};

export default DashboardPage;
