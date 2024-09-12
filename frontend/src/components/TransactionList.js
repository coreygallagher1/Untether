import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/transactions/')
            .then(response => setTransactions(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Transaction List</h1>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.amount} rounded to {transaction.rounded_up}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;