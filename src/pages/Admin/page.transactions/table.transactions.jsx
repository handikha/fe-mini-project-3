import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {getTransactions} from "../../../store/slices/transactions/slices";
import Button from "../../../components/Button";
import {motion} from "framer-motion";
import {HiOutlinePencilSquare} from "react-icons/hi2";

export default function TransactionsTable({
                                              transactions,
                                              limit,
                                              handleShowModal,
                                              current_page,
                                          }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransactions({page: 1, limit}));
    }, [dispatch, limit]);

    return (
        <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm">
            <thead
                className="text-gray-700 dark:bg-gray-700 dark:text-gray-400 bg-slate-100 text-sm uppercase dark:bg-slate-800">
            <tr>
                <th scope="col" className="p-3">
                    #
                </th>
                <th scope="col" className="p-3">
                    Transaction Date
                </th>
                <th scope="col" className="p-3">
                    Cashier Name
                </th>
                <th scope="col" className="p-3">
                    Customer Name
                </th>
                <th scope="col" className="p-3">
                    Table Number
                </th>
                <th scope="col" className="p-3">
                    Total Amount
                </th>
                <th scope="col" className="p-3">
                    Detail
                </th>
            </tr>
            </thead>
            <tbody>
            {transactions.length === 0 && (
                <tr className="text-center">
                    <td colSpan={3} className="p-3">
                        No data to display
                    </td>
                </tr>
            )}
            {transactions.map((item, index) => (
                <motion.tr
                    initial={{
                        opacity: 0,
                    }}
                    animate={{opacity: 1}}
                    transition={{duration: 0.1, delay: index * 0.05}}
                    key={index}
                    className="duration-300 odd:bg-slate-200/70 even:bg-slate-100 dark:odd:bg-slate-700 dark:even:bg-slate-800"
                >
                    <th
                        scope="row"
                        className="text-gray-900 whitespace-nowrap p-3 font-medium dark:text-white"
                    >
                        {index + 1 + (current_page - 1) * 10}
                    </th>
                    <td className="p-3">{item.transactionDate}</td>
                    <td className="p-3">{item.cashierName}</td>
                    <td className="p-3">{item.customerName}</td>
                    <td className="p-3">{item.tableNumber}</td>
                    <td className="p-3">{item.totalAmount}</td>
                    <td className="flex gap-2 p-3">
                        <Button
                            isSmall
                            isWarning
                            onClick={() => handleShowModal("Detail", item.id)}
                        >
                            <HiOutlinePencilSquare className="text-lg"/>
                        </Button>
                    </td>
                </motion.tr>
            ))}
            </tbody>
        </table>
    );
}
