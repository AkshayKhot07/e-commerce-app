import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages and components
import Navbar from "./components/Navbar";
import AddArtwork from "./pages/addartwork/AddArtwork";
import Signup from "./pages/signup/Signup.js";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home.js";

//styles
import "./App.css";

export default function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/addartwork">
                {!user && <Redirect to="/" />}
                {user && user.uid !== "4aBmeX3p2JSfaabIr6NoiVGNsIp1" && (
                  <Redirect to="/" />
                )}
                {user && user.uid === "4aBmeX3p2JSfaabIr6NoiVGNsIp1" && (
                  <AddArtwork />
                )}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/" />}
                {!user && <Signup />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}
