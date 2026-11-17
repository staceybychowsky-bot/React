const cartItems = [
  { id: 1, name: "Notebook", price: 4.5, quantity: 2 },
  { id: 2, name: "Pen Set", price: 7.25, quantity: 1 },
  { id: 3, name: "Backpack", price: 39.99, quantity: 1 },
  { id: 4, name: "Water Bottle", price: 12.5, quantity: 3 },
];

function CartSummary() {
  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <h2>Cart Summary</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Line Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <th colSpan="3">Grand Total</th>
            <td>${grandTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CartSummary;
