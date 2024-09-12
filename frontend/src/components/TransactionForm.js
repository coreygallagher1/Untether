import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
    const [amount, setAmount] = useState('');
    const [roundedAmount, setRoundedAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [account, setAccount] = useState('');
    const [user, setUser] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/transactions/', {
            amount: amount,
            rounded_amount: roundedAmount,
            description: description,
            category: category,
            account: account,
            user: user  // Replace with actual user info if required
        })
        .then(response => {
            console.log('Transaction Created:', response.data);
            setAmount('');
            setRoundedAmount('');
            setDescription('');
            setCategory('');
            setAccount('');
            setUser('');
            window.location.reload();  // Full page reload after successful submission
        })
        .catch(error => {
            console.error('Error creating transaction:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Amount:
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </label>
            <br />
            <label>
                Rounded Amount:
                <input
                    type="text"
                    value={roundedAmount}
                    onChange={(e) => setRoundedAmount(e.target.value)}
                />
            </label>
            <br />
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <br />
            <label>
                Category:
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </label>
            <br />
            <label>
                Account:
                <input
                    type="text"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                />
            </label>
            <br />
            <label>
                User:
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Create Transaction</button>
        </form>
    );
};

export default TransactionForm;