function ProductCard({ name, price, image, inStock = true, rating }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />

      <div className="product-info">
        <h3>{name}</h3>
        <p className="product-price">${price.toFixed(2)}</p>
        {rating != null && <p className="product-rating">⭐ {rating.toFixed(1)}</p>}
        {!inStock && <p className="out-of-stock">Out of Stock</p>}
        <button className="product-button" disabled={!inStock}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
