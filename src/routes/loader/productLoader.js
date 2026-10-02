import { PRODUCTS } from "../../data/products";

export const productLoader = ({ params }) => {
  const product = PRODUCTS.find((items) => items.id === Number(params.id));

  if (!product) {
    throw new Response("Product not found", {
      status: 404,
    });
  }

  return product;
};
