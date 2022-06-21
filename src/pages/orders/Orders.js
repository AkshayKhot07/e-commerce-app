import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import TableHeader from "./TableHeader";

//styles
import "./Orders.css";

export default function Orders() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "usersartworks",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  //   console.log("usersartworks", documents);
  let elements;
  if (documents) {
    let items = documents.map((document) => {
      let orderDate = document.orderDate;
      return document.productsFiltered.map((el) => {
        // let modElement = el;
        el["orderDate"] = orderDate;
        return el;
        // return modElement;
      });
    });

    elements = items;
    //concat 2 different arrays
    elements = [].concat.apply([], items);
    console.log("ELEMENTS:", elements);
  }

  return (
    <table id="table-container">
      {(!elements || elements.length === 0) && (
        <thead colSpan="4">
          <tr>
            <th>No orders placed yet...</th>
          </tr>
        </thead>
      )}
      {elements && elements.length > 0 && <TableHeader />}
      <tbody>
        {error && <p>{error}</p>}
        {elements &&
          elements.map((element) => (
            <tr key={element.id}>
              <td>{element.orderDate}</td>
              <td>{element.artworkTitle}</td>
              <td>₹ {element.artworkPrice}</td>
              <td>{element.count}</td>
              <td>₹ {element.count * element.artworkPrice}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
