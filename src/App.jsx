import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute component={<h1>Home</h1>} />}>
            <Route
              path="/dashboard"
              element={<PrivateRoute component={<h1>dashboard</h1>} />}
            />
          </Route>
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/signup" element={<h1>signup</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
