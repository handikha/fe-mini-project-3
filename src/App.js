import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import users from "./json/user.json";
import Account from "./pages/Account";
import AccountSetting from "./pages/Account/account.setting";

function App() {
  const user = users.find((user) => user.id === 1);
  return (
    <>
      <Navbar user={user} />
      <Routes>
        {user.role === 1 ? (
          <Route path="/" element={<Account user={user} />} />
        ) : (
          <Route path="/" element={<HomePage />} />
        )}
        <Route path="/account-setting/:setting" element={<AccountSetting />} />
        <Route path="/:context" element={<Account user={user} />} />
      </Routes>
    </>
  );
}

export default App;
