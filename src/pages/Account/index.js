import Modal from "../../components/Modal";
import products from "../../json/products.json";
import users from "../../json/user.json";
import categories from "../../json/categories.json";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { capitalizeEachWords } from "../../utils/capitalizeEachWords";
import ProfileCard from "./profile.card";
import ProductsTable from "./products.table";
import UsersTable from "./users.table";
import CategoriesTable from "./categories.table";

export default function Account({ user }) {
  const isVerified = false;
  const params = useParams();
  const navigate = useNavigate();
  // MODAL HANDLER
  const [showModal, setShowModal] = useState({
    show: false,
    context: params.context,
  });
  const handleShowModal = (context) => {
    setShowModal({ show: true, context: context });

    document.body.style.overflow = "hidden";
  };
  const handleCloseModal = () => {
    setShowModal({ show: false, context: "" });
    navigate("/dashboard");
    document.body.style.overflow = "auto";
  };

  const [contextTitle, setContextTitle] = useState(null);
  useEffect(() => {
    setContextTitle(
      params.context
        ? capitalizeEachWords(params.context.split("-").join(" "))
        : "Products"
    );
  }, [params]);

  return (
    <>
      <div className="container px-10 py-24">
        <div className="grid grid-cols-4 gap-10">
          <ProfileCard
            username={user.username}
            fullName={user.fullName}
            profileImg={user.profileImg}
            handleShowModal={handleShowModal}
            isVerified={isVerified}
          />

          <div className="col-span-full md:col-span-3">
            <h3 className="title mb-4 pl-4">{contextTitle}</h3>
            {!params.context && <ProductsTable products={products} />}

            {params.context === "users" && <UsersTable users={users} />}
            {params.context === "categories" && (
              <CategoriesTable categories={categories.categories} />
            )}
          </div>
        </div>
      </div>

      <Modal
        closeModal={() => handleCloseModal()}
        showModal={showModal.show}
        title={contextTitle}
      ></Modal>
    </>
  );
}
