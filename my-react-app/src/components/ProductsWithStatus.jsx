import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductsWithStatus() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=8");

        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }

        const data = await response.json();

        if (!ignore) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setError("We couldn't load the products. Please try again later.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p className="status-message">Loading products...</p>;
  if (error) return <p className="error-message">❌ {error}</p>;

  return (
    <div>
      <h2>Shop</h2>
      <div className="card-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.title}
            price={product.price}
            image={product.thumbnail}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsWithStatus;

