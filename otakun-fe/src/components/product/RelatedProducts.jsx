import ProductCard from "./ProductCard";

const RelatedProducts = ({ product, products }) => {
  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="border-b-2 border-ink pb-3 font-display text-xl font-extrabold sm:text-2xl">
        More from {product.category}
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;