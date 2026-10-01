import { useState } from "react";

const ProductGallery = ({ product }) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const images = product.images || [];

  const selectedImage =
    images[selectedImageIdx] || images[0];

  if (!selectedImage) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl border-2 border-ink bg-sand/30">
        <span className="text-sm font-bold text-ink/60">
          No image available
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-ink bg-sand/30 shadow-sticker-sm">
        <img
          src={selectedImage}
          alt={product.name}
          className="h-full w-full object-cover transition-all duration-300"
        />

        {/* Product Badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-md border border-white bg-ink px-2.5 py-1 text-xs font-extrabold tracking-wider text-white">
            {product.badge}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const isSelected =
              selectedImageIdx === index;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() =>
                  setSelectedImageIdx(index)
                }
                className={`
                  relative
                  h-20 w-20 shrink-0
                  overflow-hidden
                  rounded-xl
                  border-2 border-ink
                  shadow-sticker-sm
                  transition
                  ${
                    isSelected
                      ? "scale-105 ring-2 ring-coral"
                      : "opacity-70 hover:opacity-100"
                  }
                `}
                aria-label={`View image ${index + 1}`}
                aria-pressed={isSelected}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;