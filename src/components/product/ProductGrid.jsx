import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;