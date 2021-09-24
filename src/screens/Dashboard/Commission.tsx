import React from 'react';
import { View, Text, Image } from 'react-native';
import { DefaultOptions } from 'navigation/DefaultOption';
import LinearGradient from 'react-native-linear-gradient';
import LineChart1 from './LineChart';
import { Surface } from 'react-native-paper';
import Select from 'components/Select';
import { color } from 'theme';

function LogoTitle() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white' }}>Hoa hồng</Text>
    </View>
  );
}
const data = {
  labels: ['3', '4', '5', '6', '7', '8'],
  datasets: [
    {
      data: [20, 45, 28, 80, 1111, 1112],
      color: (opacity = 1) => `rgba(14, 14, 13, ${opacity})`, // optional
      strokeWidth: 0 // optional
    }
  ]
};
export default function Commission({}) {
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
    >
      {/* <Text style={{ fontSize: 17 }}>Báo cáo cá nhân</Text> */}
      <Surface
        style={{
          elevation: 4,
          borderRadius: 5,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={{ width: '100%', marginBottom: 10, flexDirection: 'row' }}>
          <Text>Chọn ngày: </Text>
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
            29/7/2021
          </Text>
        </View>
        <LineChart1 data={data} />
        <Text>Hoa hồng(triệu đồng)</Text>
      </Surface>
    </View>
  );
}
export const commissionOptions: any = {
  ...DefaultOptions,
  headerShown: false,
  headerStyle: {
    backgroundColor: '#3949D5'
  },
  headerTitle: <LogoTitle />
};
