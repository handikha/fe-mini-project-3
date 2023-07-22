import { useNavigate, useParams } from "react-router-dom";

import ProfileCard from "./profile.card";
import ProductsTable from "./table.products";
import UsersTable from "./table.users";
import CategoriesTable from "./table.categories";
import Dashboard from "./dashboard";
import { useEffect } from "react";

export default function Admin({ user }) {
  const isVerified = false;
  const navigate = useNavigate();
  const { context } = useParams();

  const allowedContexts = ["products", "users", "categories"];
  useEffect(() => {
    if (!allowedContexts.includes(context)) {
      navigate("/admin");
    }
  }, [context, navigate]);

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
            {!context && <Dashboard />}
            {context === "products" && <ProductsTable />}
            {context === "users" && <UsersTable />}
            {context === "categories" && <CategoriesTable />}
          </div>
        </div>
      </div>
    </>
  );
}
