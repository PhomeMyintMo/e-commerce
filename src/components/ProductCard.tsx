import { getTotalStock, isNewProduct } from "@/lib/helper";
import { Heart } from "lucide-react";
import { Badge } from "./ui/badge";

type Props = {
  product: any;
  wishlist: any;
  addToWishlist: any;
  removeFavoriteItem: any;
  navigate: any;
};

export const ProductCard = ({
  product,
  wishlist,
  addToWishlist,
  removeFavoriteItem,
  navigate
}: Props) => {
  const getStockStatus = (data: any) => {
    const total = getTotalStock(data);
    if (total === 0) return "out";
    if (total <= 5) return "low";
    return "in";
  }

  const isNew = isNewProduct(product.createdAt);

  const isFavorite = wishlist.some(
    (item: any) => item.id === product.id
  );
  const status = getStockStatus(product);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all">

      <div
        className="relative aspect-[4/5] bg-gray-100 cursor-pointer overflow-hidden isolate"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        {product.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            className="h-full w-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            isFavorite
              ? removeFavoriteItem(product.id)
              : addToWishlist(product)
          }
          }
          className="absolute top-3 right-3 p-2 hover:bg-white/50 rounded-full"
        >
          <Heart
            size={20}
            fill={isFavorite ? "currentColor" : "none"}
            className="text-foreground/80"
            strokeWidth={1.5}
          />
        </button>

        {/* NEW */}
        {isNew && (
          <Badge className="absolute top-3 left-3 z-10 bg-blue-500 text-white pointer-events-none style-normal">
            NEW
          </Badge>
        )}

        {/* OUT OF STOCK */}
        {status === "out" && (
          <Badge className="absolute top-12 left-3 z-10 bg-red-500 text-white pointer-events-none">
            Out of Stock
          </Badge>
        )}

        {/* LOW STOCK */}
        {status === "low" && (
          <Badge className="absolute bottom-3 left-3 z-10 bg-yellow-500 text-black pointer-events-none">
            Low Stock
          </Badge>
        )}
      </div>

      <div className="p-4 flex flex-col space-y-3 items-start">
        <p className="text-xs text-gray-400 uppercase">
          {product.category?.name}
        </p>

        <h2 className="font-semibold line-clamp-2">
          {product.name}
        </h2>

        <p className="font-semibold text-muted-foreground">
          MMK {product.price.toLocaleString()}
        </p>

        {product.variants?.length > 0 && (
          <div className="flex items-center gap-2 mt-1">
            {[
              ...new Set(
                product.variants.map(
                  (variant: any) => variant.color
                )
              ),
            ].map((color: any, index: number) => (
              <div
                key={index}
                className="h-5 w-5 rounded-full border border-2"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}