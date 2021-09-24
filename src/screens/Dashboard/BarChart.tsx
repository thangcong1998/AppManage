import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';
type Props = {
  data: any | undefined;
};
export default function BarChart1({}) {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        data: [10, 45, 28, 80, 99, 43]
      }
    ]
  };
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.5,
    fillShadowGradient: '#d1d3d6',
    fillShadowGradientOpacity: 0.5,
    color: (opacity = 1) => `rgba(63, 143, 244, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(10, 10, 10, ${opacity})`,
    style: {
      borderRadius: 16
    },
    barPercentage: 0.5,
    propsForBackgroundLines: {
      strokeDasharray: '' // solid background lines with no dashes,
    },
    withHorizontalLines: false,
    decimalPlaces: 0
  };

  return (
    <View>
      <BarChart
        // style={styles.graphStyle}
        data={data}
        width={300}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        showBarTops={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  graphStyle: { borderRadius: 7 }
});
