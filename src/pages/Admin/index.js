import products from "../../json/products.json";
import users from "../../json/user.json";
import categories from "../../json/categories.json";
import { useParams } from "react-router-dom";

import ProfileCard from "./profile.card";
import ProductsTable from "./products.table";
import UsersTable from "./users.table";
import CategoriesTable from "./categories.table";

export default function Admin({ user }) {
  const isVerified = false;
  const { context } = useParams();

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
            {!context && <ProductsTable products={products} />}

            {context === "users" && <UsersTable users={users} />}
            {context === "categories" && (
              <CategoriesTable categories={categories.categories} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
