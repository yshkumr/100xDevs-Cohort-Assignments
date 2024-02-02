import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import useAuth from "./hooks/useAuth";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  const isLoggedIn = useAuth();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignIn />}
        />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfer" element={<Transfer />} />
        </Route>
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignUp />}
        />
        <Route
          path="/signin"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignIn />}
        />
        <Route
          path="*"
          element={
            <h1 className="text-center text-4xl font-bold text-red-600 flex justify-center items-center h-screen">
              Error 404 : Page not found
            </h1>
          }
        />
      </Routes>
    </>
  );
}

export default App;
