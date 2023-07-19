import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import users from "./json/user.json";
import Profile from "./pages/Profile";
import ProfileSetting from "./pages/Profile/profile.setting";
import AccountSetting from "./pages/Profile/account.setting";

function App() {
  const user = users.find(user=>user.id===1)
  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/profile/account-setting/:setting"
          element={<AccountSetting />}
        />
        <Route path="/profile/profile-setting" element={<ProfileSetting />} />
        <Route path="/profile/:context" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
