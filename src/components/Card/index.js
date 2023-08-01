import React, { useState } from "react";

import Button from "../Button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import formatNumber from "../../utils/formatNumber";
import Modal from "../Modal";

export default function Card({
  name,
  image,
  category,
  onClick,
  showModal,
  price,
}) {
  const [count, setCount] = useState(0);

  return (
    // TODO: H-FIT OR H-FULL FOR ITEMS LENGTH > 1
    <div className="group flex h-[320px] w-full flex-col gap-3 rounded-md p-4 shadow-md duration-300 hover:scale-[103%] hover:shadow-xl dark:bg-slate-800/60">
      <div className="aspect-[2/1] w-full overflow-hidden rounded-lg">
        <img
          src={process.env.REACT_APP_IMAGE_URL + image}
          alt={name}
          className="h-full w-full object-cover duration-300 group-hover:scale-110"
        />
      </div>

      <div className="">
        <h3 className="card-title" onClick={showModal}>
          {name}
        </h3>
        <p>{category}</p>
      </div>

      {/* TODO: ADD QUANTITY */}
      <div className="mt-auto flex flex-col items-center justify-between gap-1 text-sm text-light-gray lg:flex-row">
        <p className="card-price">IDR {formatNumber(price)}</p>
        <div className="flex gap-2 text-xs">
          <Button
            isSecondary
            isSmall
            onClick={() => {
              count > 0 && setCount(count - 1);
            }}
          >
            <FaMinus className=" text-white" />
          </Button>
          <input
            type="text"
            className="w-full text-center lg:w-10 "
            placeholder="Qty"
            value={count}
          />
          <Button
            isPrimary
            isSmall
            className="font-bold"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <FaPlus className=" text-white" />
          </Button>
        </div>
      </div>
      <Button
        isButton
        isBLock
        isPrimary
        title="Add"
        onClick={() => {
          onClick(count);
        }}
      />
    </div>
  );
}

// export default function RenderCards({ products, categories }) {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const getCategoryByName = (id) => {
//     const category = categories.find((item) => item.id === id);
//     return category?.name;
//   };

//   const handleShowModal = (action, id) => {
//     if (action === "Details") {
//       const productData = products.find((item) => item.id === id);
//       setSelectedProduct(productData);
//       setShowModal({ show: true, type: action, id });
//       console.log(id);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
//       {products.map((product, index) => (
//         <Card
//           key={index}
//           name={product.name}
//           price={product.price}
//           category={getCategoryByName(product.categoryId)}
//           image={product.image}
//           onClick={() => handleShowModal("Details", product.id)}
//           id={product.id}
//         />
//       ))}

//       {showModal.show && showModal.type === "Details" && (
//         <Modal
//           showModal={showModal}
//           title={`${showModal.type} Product`}
//           closeModal={() => handleCloseModal()}
//         >
//           <div className="flex flex-col">
//             <div className="aspect-[2/1] w-full overflow-hidden rounded-lg">
//               <img
//                 src={process.env.REACT_APP_IMAGE_URL + selectedProduct.image}
//                 alt={`${selectedProduct.name}`}
//                 className="h-full w-full object-cover "
//               />
//             </div>
//             <h3 className="title mt-4">{selectedProduct.name}</h3>
//             <p>{getCategoryByName(selectedProduct.categoryId)}</p>
//             <p className="card-price mt-2">
//               IDR {formatNumber(selectedProduct.price)}
//             </p>
//             <p className="mt-4">{selectedProduct.description}</p>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// }
