import RenderCards from "../../components/Card";
import user from "../../json/user.json";
import Modal from "../../components/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { capitalizeEachWords } from "../../utils/capitalizeEachWords";
import ProfileCard from "./profile.card";

export default function Profile() {
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
    navigate("/profile");
    document.body.style.overflow = "auto";
  };

  const [contextTitle, setContextTitle] = useState(null);
  useEffect(() => {
    setContextTitle(
      params.context
        ? capitalizeEachWords(params.context.split("-").join(" "))
        : "My Articles"
    );
  }, [params]);

  return (
    <>
      <div className="container px-10 py-24">
        <div className="grid grid-cols-4 gap-10">
          <ProfileCard
            username={user.username}
            fullName={user.Profile.fullName}
            profileImg={user.Profile.profileImg}
            bio={user.Profile.bio}
            handleShowModal={handleShowModal}
            isVerified={isVerified}
          />

          <div className="col-span-full md:col-span-3">
            <h3 className="title mb-4 pl-4">{contextTitle}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <RenderCards />
            </div>
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
