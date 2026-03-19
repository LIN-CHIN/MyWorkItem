import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListPage } from "./pages/ListPage";
import { CreatePage } from "./pages/CreatePage";
import { EditPage } from "./pages/EditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
