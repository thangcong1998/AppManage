import { func } from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

type Props = {
  data: any | undefined;
};
export default function LineChart1({ data }: Props) {
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
    propsForDots: {
      r: '3',
      strokeWidth: '1',
      stroke: 'black'
    },
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional,
    InnerLines: false,
    propsForBackgroundLines: {
      strokeDasharray: '' // solid background lines with no dashes,
    },
    decimalPlaces: 0
  };
  const screenWidth = Dimensions.get('window').width;

  //   console.log({screenWidth});
  return (
    <View>
      <LineChart
        data={data}
        width={300}
        height={220}
        chartConfig={chartConfig}
        // yAxisSuffix="đ"
        bezier
        withDots={false}
        // withHorizontalLines={false}
        withVerticalLines={false}
      />
    </View>
  );
}
