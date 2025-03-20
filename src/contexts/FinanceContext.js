import React, {createContext, useContext, useState, useEffect} from 'react';
import {db} from '../../db/database';

const FinanceContext = createContext();

export const FinanceProvider = ({children}) => {
    const [transactions, setTransactions] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [debts, setDebts] = useState([]);

    const loadTransactions = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM transactions', [], (_, {rows}) => {
                setTransactions(rows._array);
            });
        });
        };
    const addTransaction = (transaction) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO transactions (type, amount, date, category, account_id, description, recurring) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    transaction.type,
                    transaction.amount,
                    transaction.date.toISOString(),
                    transaction.category,
                    transaction.account_id,
                    transaction.description,
                    transaction.recurring ? 1 : 0,
                ],
                () => loadTransactions()
            );
        });
    };
    useEffect(() => {
        db.initializeDB();
        loadTransactions();
    }, []);

    return (
        <FinanceContext.Provider value={{
            transactions,
            accounts,
            debts,
            addTransaction,
            setAccounts,
            setDebts,
        }}>
            {children}
        </FinanceContext.Provider>
    );
};
export const useFinance = () => useContext(FinanceContext);
