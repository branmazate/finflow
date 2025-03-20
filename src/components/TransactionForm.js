import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput, RadioButton, Text} from 'react-native-paper';
import {useFinance} from '../contexts/FinanceContext';

const TransactionForm = () => {
    const [type, setType] = useState('expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const {addTransaction} = useFinance();

    const handleSubmit = () => {
        addTransaction({
            type,
            amount: parseFloat(amount),
            date: new Date(),
            category,
            account_id: 1, //hardcoded for now
            recurring: false,
        });
    };
    return (
        <View style={styles.container}>
            <RadioButton.Group onValueChange={setType} value={type}>
                <View style={styles.row}>
                    <Text>Gasto</Text>
                    <RadioButton value="expense" />
                    <Text>Ingreso</Text>
                    <RadioButton value="income" />
                    </View>
            </RadioButton.Group>

            <TextInput
            label="Monto"
            kweyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
            />

            <TextInput
            label="Categoria"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
            />

            <Button mode="contained" onPress={handleSubmit}>
                Registrar
            </Button>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {padding: 20},
    row: {flexDirection: 'row', alignItems: 'center'},
    input: {marginVertical: 5},
});

export default TransactionForm;
