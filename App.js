import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FinanceProvider } from './src/contexts/FinanceContext';
import Dashboard from './src/screens/Dashboard';
import TransactionForm from './src/components/TransactionForm';
import Transactions from './src/screens/Transactions';

const Tab = createNativeStackNavigator();

const App = () => {
    return (
        <FinanceProvider>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Dashboard" component={Dashboard} />
                    <Tab.Screen name="Transactions" component={Transactions} />
                    <Tab.Screen name="TransactionForm" component={TransactionForm} />
                </Tab.Navigator>
            </NavigationContainer>
        </FinanceProvider>
    );
};

export default App;
