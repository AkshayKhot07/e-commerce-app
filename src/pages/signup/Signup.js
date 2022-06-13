import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

//styles
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(email, password, displayName);
    signup(email, password, displayName);

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  return (
    <div className="signup">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label>
          <span>Password:</span>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <label>
          <span>Display Name:</span>
          <input
            type="text"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        {!isPending && <button>Submit</button>}
        {isPending && <button disabled>loading</button>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
