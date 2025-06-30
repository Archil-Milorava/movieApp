import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditMoviePage from "./pages/EditMoviePage";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<EditMoviePage />} />
      </Routes>
  );
};

export default App;
