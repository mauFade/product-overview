import React from "react";
import { use } from "react";
import ProductPageDetail from "./components/product-page";

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return <ProductPageDetail id={id} />;
};

export default ProductPage;
