import React from 'react';
import {View, StylesSheet} from 'react-native';
import {VictoryPie, VictoryChart, VictoryLine} from 'victory-native';
import { useFinance} from '../contexts/FinanceContext';

const Dashboard = () => {
    const {transactions} = useFinance();

    const processChartData = () => {
        const categories = {};
        transactions.forEach(t => {
            if (t.type === 'expense') {
                categories[t.category] = (categories[t.category] || 0) + t.amount;
            }
        });
        return Object.entries(categories).map(([label, value]));
    };
    return  (
        <View style={styles.container}>
            <VictoryPie
            data = {processChartData()}
            colorScale = "qualitative"
            innerradius = {70}
            style ={{labels: {fontSize: 12}}}
            />
            <VictoryChart>
                <VictoryLine
                data = {transactions.map(t => ({x: t.date, y: t.amount}))}
                interpolation = "natural"
                />
            </VictoryChart>
        </View>
    );
};
const styles = StylesSheet.create({
    container: {flex: 1, padding: 15},
});

export default Dashboard;
