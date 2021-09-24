import { useFetch } from 'api/api';
import { SCREEN_KEY } from 'navigation/ScreenKey';
import React, { VFC } from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from 'react-native';
import Transition from './Transaction';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

import Graph from './Graph';
import { useState } from 'react';
import { NumberFormat } from 'components/Chart/NumberFormat';
import { Surface } from 'react-native-paper';

interface Commission {
  navigation: any;
  colors: any;
}

const Test: VFC<Commission> = ({ navigation }) => {
  const { data: commission } = useFetch(['report']);
  // const colors: Commission[] = [];

  // while (colors.length < 6) {
  //   do {
  //     var color = Math.floor(Math.random() * 1000000 + 1);
  //   } while (colors.indexOf(color as any) >= 0);
  //   colors.push('#' + ('000000' + color.toString(16)).slice(-6));
  // }'
  const totalCommission = commission?.selfReport?.commission.reduce(function (
    a: any,
    b: any
  ) {
    return parseInt(a) + parseInt(b.value);
  },
  0);
  console.log({ commission });
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          backgroundColor: '#0f527d',
          minHeight: 100
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: 'flex-start' }}
          onPress={() =>
            navigation.navigate(`${SCREEN_KEY.DASHBOARD.DASHBOARD}`)
          }
        >
          <MaterialIcons name="arrow-back-ios" size={25} color={'white'} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            width: '90%'
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
            Biểu đồ hoa hồng
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: -30,
          padding: 10
        }}
      >
        <Surface
          style={{
            elevation: 20,
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            padding: 10,
            borderRadius: 10,
            minHeight: 70
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <Text style={{ fontSize: 12, opacity: 0.3 }}>
                Tổng số tiền hoa hồng
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {`${NumberFormat(totalCommission)}đ`}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#add',
                borderRadius: 10,
                padding: 5,
                opacity: 0.5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: '#029898', fontWeight: 'bold', width: 50 }}>
                6 tháng
              </Text>
            </View>
          </View>

          <Graph
            data={commission.selfReport.commission.map(
              (x: any, index: any) => ({
                ...x,
                color: 'orange'
              })
            )}
          />
        </Surface>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Chi tiết từng tháng
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        {commission.selfReport.commission
          .map((x: any, index: any) => ({
            ...x,
            color: 'orange'
          }))
          .map((c: any, ci: any) => {
            return <Transition transaction={c} />;
          })}
      </View>
    </ScrollView>
  );
};

export default Test;
