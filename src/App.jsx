import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./pages/theme/Layout";
import Canvas from "./pages/Canvas";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute component={Layout} />}>
            <Route
              path="/dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route
              path="/canvas"
              element={<PrivateRoute component={Canvas} />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
