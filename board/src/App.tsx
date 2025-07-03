import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditMoviePage from "./pages/EditMoviePage";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import TvShowPage from "./pages/TvShowPage";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shows"
        element={
          <ProtectedRoute>
            <TvShowPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:id"
        element={
          <ProtectedRoute>
            <EditMoviePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
