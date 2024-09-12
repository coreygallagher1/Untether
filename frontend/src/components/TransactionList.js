import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editTransactionId, setEditTransactionId] = useState(null);  // To track which transaction is being edited
    const [editableTransaction, setEditableTransaction] = useState({
        amount: '',
        rounded_amount: '',
        description: '',
        category: '',
        account: '',
        user: ''
    });

    // Fetch transactions from the backend API when the component loads
    useEffect(() => {
        axios.get('http://localhost:8000/api/transactions/')
            .then(response => {
                setTransactions(response.data); // Set the transactions in state
                setLoading(false); // Set loading to false after fetching data
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
                setError('Error fetching transactions');
                setLoading(false);
            });
    }, []); // Empty dependency array means this runs once on component mount

    // Function to delete a transaction
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/transactions/${id}/`)
            .then(response => {
                // Remove the deleted transaction from the list
                setTransactions(transactions.filter(transaction => transaction.id !== id));
            })
            .catch(error => {
                console.error('Error deleting transaction:', error);
            });
    };

    // Function to start editing a transaction
    const handleEdit = (transaction) => {
        setEditTransactionId(transaction.id);  // Set the ID of the transaction being edited
        setEditableTransaction({
            amount: transaction.amount,
            rounded_amount: transaction.rounded_amount,
            description: transaction.description,
            category: transaction.category,
            account: transaction.account,
            user: transaction.user
        });
    };

    // Function to handle form input changes for editable transaction
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableTransaction({
            ...editableTransaction,
            [name]: value
        });
    };

    // Function to save the edited transaction
    const handleSave = (id) => {
        axios.put(`http://localhost:8000/api/transactions/${id}/`, editableTransaction)
            .then(response => {
                console.log('Transaction updated:', response.data);
                setTransactions(transactions.map(transaction =>
                    transaction.id === id ? response.data : transaction
                ));
                setEditTransactionId(null);  // Exit edit mode
            })
            .catch(error => {
                console.error('Error updating transaction:', error);
            });
    };

    // Render loading state
    if (loading) {
        return <p>Loading transactions...</p>;
    }

    // Render error state
    if (error) {
        return <p>{error}</p>;
    }

    // Render the list of transactions
    return (
        <div>
            <h1>Transactions</h1>
            <ul>
                {transactions.length > 0 ? (
                    transactions.map(transaction => (
                        <li key={transaction.id}>
                            {editTransactionId === transaction.id ? (
                                <>
                                    {/* Editable form for the transaction */}
                                    <label>
                                        Amount:
                                        <input
                                            type="text"
                                            name="amount"
                                            value={editableTransaction.amount}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        Rounded Amount:
                                        <input
                                            type="text"
                                            name="rounded_amount"
                                            value={editableTransaction.rounded_amount}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        Description:
                                        <input
                                            type="text"
                                            name="description"
                                            value={editableTransaction.description}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        Category:
                                        <input
                                            type="text"
                                            name="category"
                                            value={editableTransaction.category}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        Account:
                                        <input
                                            type="text"
                                            name="account"
                                            value={editableTransaction.account}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        User:
                                        <input
                                            type="text"
                                            name="user"
                                            value={editableTransaction.user}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <br />
                                    <button onClick={() => handleSave(transaction.id)}>Save</button>
                                    <button onClick={() => setEditTransactionId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    {/* Display transaction details */}
                                    <strong>ID:</strong> {transaction.id}<br />
                                    <strong>Amount:</strong> ${Number(transaction.amount).toFixed(2)}<br />
                                    <strong>Rounded Amount:</strong> ${Number(transaction.rounded_amount).toFixed(2)}<br />
                                    <strong>Description:</strong> {transaction.description}<br />
                                    <strong>Category:</strong> {transaction.category}<br />
                                    <strong>Account:</strong> {transaction.account}<br />
                                    <strong>User:</strong> {transaction.user}<br />
                                    <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                                    <button onClick={() => handleEdit(transaction)}>Edit</button>
                                    <hr />
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No transactions found.</p>
                )}
            </ul>
        </div>
    );
};

export default TransactionList;