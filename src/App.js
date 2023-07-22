import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cashier from "./pages/Cashier";
import users from "./json/user.json";
import Admin from "./pages/Admin";
import AdminAccountSetting from "./pages/Admin/account.setting/index.js";
import CashierAccountSetting from "./pages/Cashier/account.setting";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { keepLogin } from "./store/slices/auth/slices";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const user = users.find((user) => user.id === 1);

  const location = useLocation();

  const shouldRenderNavbar = () => {
    return location.pathname !== "/";
  };

  return (
    <>
      {shouldRenderNavbar() && <Navbar user={user} />}

      <Routes>
        <Route exact path='/' element={<Login />} />
        {user?.role == 1 && (
          <>
            <Route path='/admin' element={<Admin user={user} />} />
            <Route path='/admin/:context' element={<Admin user={user} />} />
            <Route
              path='/admin/account-setting/:context'
              element={<AdminAccountSetting user={user} />}
            />
          </>
        )}

        {user?.role == 2 && (
          <>
            <Route path='/cashier' element={<Cashier />} />
            <Route
              path='/cashier/account-setting/:context'
              element={<CashierAccountSetting user={user} />}
            />
          </>
        )}

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
