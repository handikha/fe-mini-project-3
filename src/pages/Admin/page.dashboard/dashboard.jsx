import React, {useEffect, useMemo} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {getTransactions} from "../../../store/slices/transactions/slices";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function App() {

  const dispatch = useDispatch();

  const {
    transactions
  } = useSelector((state) => {
    return {
      transactions: state.transactions.data,
    };
  });

  useEffect(() => {
    dispatch(getTransactions({page: 1, limit: 9999}));
  }, [dispatch])

  const {labels, values} = useMemo(() => {
    const result = {};
    for (let i = 0; i < transactions.length; i++) {
      result[moment(transactions[i].transactionDate).format("MMMM")] = transactions[i].totalAmount;
    }
    return {
      labels: Object.keys(result),
      values: Object.values(result)
    }
  }, [transactions]);
  return (

      <div>
        <h3>Dashboard</h3>
        <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
            data={{
              labels,
              datasets: [
                {
                  label: 'Sales Performance',
                  data: values,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            }}
        />
      </div>
  );
}

export default App;