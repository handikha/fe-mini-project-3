import { useNavigate, useParams } from "react-router-dom";
import ProfileCard from "./profile.card";
import UsersTable from "./page.users/table.users";
import Dashboard from "./page.dashboard/dashboard";
import { Toaster } from "react-hot-toast";
import Products from "./page.products";
import Categories from "./page.categories";
import Transactions from "./page.transactions";
import { useEffect } from "react";

export default function Admin({ user }) {
  const navigate = useNavigate();
  const isVerified = false;
  const { context } = useParams();

  useEffect(() => {
    const allowedContext = [
      "dashboard",
      "products",
      "users",
      "categories",
      "transactions"
    ].find((item) => item === context);

    if (!allowedContext) {
      return navigate("/not-found", { replace: true });
    }
  }, [context]);

  if (!user.role) {
    return navigate("/");
  }

  return (
    <>
      <div className="container px-10 py-24">
        <div className="grid grid-cols-4 gap-10">
          <ProfileCard
            username={user.username}
            fullName={user.fullName}
            profileImg={user.profileImg}
            isVerified={isVerified}
            context={context}
          />

          <div className="col-span-full md:col-span-3">
            {context === "dashboard" && <Dashboard />}
            {context === "products" && <Products />}
            {context === "users" && <UsersTable />}
            {context === "categories" && <Categories />}
            {context === "transactions" && <Transactions />}
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
