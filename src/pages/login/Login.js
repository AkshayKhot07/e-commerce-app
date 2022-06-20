import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

//styles
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(email, password, displayName);
    login(email, password);

    // setEmail("");
    // setPassword("");
  };

  return (
    <div className="login">
      <h2>Login</h2>
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

        {!isPending && <button>Submit</button>}
        {isPending && <button disabled>loading</button>}
        {/* {error && <p>{error}</p>} */}
        {error && <p className="login-error">Please register/ signup first.</p>}
      </form>
    </div>
  );
}
