import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/UseAuthContext";

//Pages
import Home from "./pages/Home";
import Navbar from "./components/Navber";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
