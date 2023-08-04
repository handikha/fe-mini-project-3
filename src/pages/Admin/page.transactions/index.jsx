import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getTransactions, resetSuccessTransaction} from "../../../store/slices/transactions/slices";
import Button from "../../../components/Button";
import TransactionsTable from "../page.transactions/table.transactions";
import RenderProductModals from "../page.products/modals";

export default function Transactions() {
    const limit = 10;

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const {
        transactions,
        // transactionItems,
        isGetTransactionLoading,
        current_page,
        total_pages,
    } = useSelector((state) => {
        return {
            transactions: state.transactions.data,
            // transactionItems: state.transactionItems.data,
            current_page: state.transactions.current_page,
            total_pages: state.transactions.total_pages,
            success: state.transactions.success,
            isGetTransactionsLoading: state.transactions.isGetTransactionsLoading,
        };
    });

    // const getTransactionItem = (id) => {
    //     const transactionItem = transactionItems.find((item) => item.id === id);
    //     return transactionItem;
    // };

    const handleShowModal = (action, id) => {
        if (action === "Details") {
            const transactionData = transactions.find((item) => item.id === id);
            setSelectedTransaction(transactionData);
            setShowModal({show: true, type: action, id});
        }

        document.body.style.overflow = "hidden";
    };

    const handleCloseModal = () => {
        setShowModal(false);
        document.body.style.overflow = "auto";

        dispatch(resetSuccessTransaction());
    };

    const handlePagination = (type) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        dispatch(
            getTransactions({
                page: type === "prev" ? current_page - 1 : current_page + 1,
                limit,
            })
        );
    };

    useEffect(() => {
        dispatch(getTransactions({page: 1, limit}));
    }, [dispatch, limit])

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <TransactionsTable
                    transactions={transactions}
                    handleShowModal={handleShowModal}
                    limit={limit}
                    current_page={current_page}
                />
            </div>

            {!isGetTransactionLoading && total_pages > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                    <Button
                        isPrimary
                        isButton
                        isDisabled={current_page === 1}
                        title="Prev"
                        onClick={() => handlePagination("prev")}
                    />
                    <Button
                        isPrimary
                        isButton
                        title="Next"
                        isDisabled={current_page === total_pages}
                        onClick={() => handlePagination("next")}
                    />
                </div>
            )}

            {/*<RenderTransactionModals*/}
            {/*    showModal={showModal.show}*/}
            {/*    type={showModal.type}*/}
            {/*    selectedTransaction={selectedTransaction}*/}
            {/*    handleCloseModal={handleCloseModal}*/}
            {/*    transactionItem={getTransactionItem(selectedTransaction?.id)}*/}
            {/*/>*/}
        </>
    );
}