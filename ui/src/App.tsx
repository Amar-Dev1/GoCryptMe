import { HashRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Shared/ui/MainLayout";
import AddPassword from "./features/AddPassword";
import About from "./features/About";
import Catalog from "./features/Catalog";
import ManagePasswords from "./features/ManagePasswords";
import Login from "./features/Auth/pages/Login";
import { isLoggedIn } from "./Shared/utils/isLoggedIn";
import { isNew } from "./Shared/utils/isNew";
import FirstLogin from "./features/Auth/pages/FirstLogin";

function App() {
  const isNewUser = isNew();
  const isLoggedInUser = isLoggedIn();

  return (
    <>
      <HashRouter>
        <Routes>
          {isNewUser! ? (
            // Step 1: master‑key creation
            <Route index element={<FirstLogin />} />
          ) : !isLoggedInUser ? (
            // Step 2: key‑entry (login)
            <Route index element={<Login />} />
          ) : (
            // Step 3: main app
            <Route element={<MainLayout />} path="/">
              <Route element={<ManagePasswords />} path="/manage-passwords" />
              <Route element={<AddPassword />} path="/add-password" />
              <Route element={<About />} path="/about" />
              <Route element={<Catalog />} path="/how" />
            </Route>
          )}
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
