import { HashRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Shared/ui/MainLayout";
import AddPassword from './features/AddPassword'
import About from './features/About'
import Catalog from './features/Catalog'
import ManagePasswords from './features/ManagerPasswords'

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />} path="/">
          <Route element={<ManagePasswords />} path="/manage-passwords" />
          <Route element={<AddPassword />} path="/add-password" />
          <Route element={<About />} path="/about" />
          <Route element={<Catalog />} path="/how" />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
