import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateStory from "./pages/CreateStory";
import Storybook from "./pages/Storybook";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/create-story"
          element={<CreateStory />}
        />

        <Route
          path="/storybook"
          element={<Storybook />}
        />

      </Routes>
    </BrowserRouter>
  );
}