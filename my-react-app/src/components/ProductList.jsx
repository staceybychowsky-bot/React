import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59.99,
    image: "https://picsum.photos/seed/headphones/400/300",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 129.5,
    image: "https://picsum.photos/seed/watch/400/300",
    inStock: false,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 39,
    image: "https://picsum.photos/seed/speaker/400/300",
    inStock: true,
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 24.99,
    image: "https://picsum.photos/seed/laptop/400/300",
    inStock: true,
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 89.99,
    image: "https://picsum.photos/seed/keyboard/400/300",
    inStock: false,
  },
  {
    id: 6,
    name: "USB-C Hub",
    price: 34.95,
    image: "https://picsum.photos/seed/hub/400/300",
    inStock: true,
  },
];

function ProductList() {
  return (
    <div>
      <h2>Products</h2>

      <div className="card-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            inStock={product.inStock}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;



