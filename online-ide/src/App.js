import Ide from "./components/Ide";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/ide"
          element={
            <PrivateRoute>
              <Ide />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
