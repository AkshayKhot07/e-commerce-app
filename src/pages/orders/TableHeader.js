import "./Orders.css";

export default function TableHeader() {
  return (
    <thead>
      <tr className="table-header">
        <th>Order Date</th>
        <th>Item</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
    </thead>
  );
}
