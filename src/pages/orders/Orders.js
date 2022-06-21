import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

//styles
import "./Orders.css";

export default function Orders() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("usersartworks", [
    "uid",
    "==",
    user.uid,
  ]);

  console.log("usersartworks", documents);

  return <div>Orders</div>;
}
