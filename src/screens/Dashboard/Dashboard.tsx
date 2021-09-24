import React, { VFC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView, Text, View } from 'react-native';
import {
  Button,
  Card,
  Colors,
  Surface,
  List,
  IconButton,
  ProgressBar
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ListButtonNavigator from './ListButtonNavigator';
import { DefaultOptions } from 'navigation/DefaultOption';
import { useFetch } from 'api/api';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ListButton from './ListButton';
import { NumberFormat } from 'components/Chart/NumberFormat';
// import Trangchu from './trangchu';
interface Props {
  navigation: any;
}

const Dashboard: VFC<Props> = ({ navigation }) => {
  // const user = useAppSelector((state) => state.auth.user);

  const { data: data } = useFetch(['report']);
  const date = new Date();
  const totalDebit = data?.debt?.totalDebt;
  const paidThisMonth = data?.paidThisMonth?.paidThisMonth;
  const totalMoney = parseInt(totalDebit) + parseInt(paidThisMonth);
console.log({paidThisMonth})
  return (
    <ScrollView style={{}}>
      <View style={styles.parent}>
        <View style={styles.child}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#2284c3', '#0f527d']}
            style={{
              width: '100%',
              flex: 1,
              padding: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white'
              }}
            >
              Trang chủ
            </Text>
          </LinearGradient>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          borderRadius: 6,
          marginTop: -50,
          // marginBottom: 20,
          alignItems: 'center',
          minHeight: 120
        }}
      >
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between'
          }}
        >
          <Surface
            style={{
              elevation: 20,
              width: '42%',
              flex: 1,
              marginRight: 15,
              borderRadius: 5
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#3EC7A7', '#2287D4']}
              style={{
                flex: 1,
                borderRadius: 5,
                padding: 10,
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* <View> */}
                {/* <Text style={{ color: 'white', fontSize: 17 }}>
                  {data ? Math.round((paidThisMonth * 100) / totalMoney) : 0}%
                </Text> */}
                {/* <Text style={{ color: 'white', opacity: 0.5, fontSize: 13 }}>
                  {paidThisMonth ? NumberFormat(paidThisMonth) : 0}đ
                </Text>
              </View>
              <ProgressBar
                progress={
                  data
                    ? Math.round((paidThisMonth * 100) / totalMoney) / 100
                    : 0
                }
                color={Colors.white}
              /> */}

              <Text style={{ color: 'white', opacity: 0.5, fontSize: 15 }}>
                Đã thanh toán
              </Text>
            </LinearGradient>
          </Surface>
          <Surface
            style={{ elevation: 20, width: '42%', flex: 1, borderRadius: 5 }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#E141ED', '#3949D5']}
              style={{
                flex: 1,
                borderRadius: 5,
                padding: 10,
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* <View>
                <Text style={{ color: 'white', fontSize: 17 }}>
                  {data ? Math.round((totalDebit * 100) / totalMoney) : 0}%
                </Text>
                <Text style={{ color: 'white', opacity: 0.5, fontSize: 13 }}>
                  {data ? NumberFormat(totalDebit) : 0}đ
                </Text>
              </View> */}
              {/* <ProgressBar
                progress={
                  data ? Math.round((totalDebit * 100) / totalMoney) / 100 : 0
                }
                color={Colors.white}
              /> */}

              <Text style={{ color: 'white', opacity: 0.5, fontSize: 15 }}>
                Dư nợ
              </Text>
            </LinearGradient>
          </Surface>
        </View>
      </View>
      <View
        style={{
          flex: 0.7,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ListButton navigation={navigation} data={data} date={date} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  root: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  parent: {
    minHeight: 150,
    width: '100%',
    transform: [{ scaleX: 2 }],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: 'hidden'
  },
  child: {
    flex: 1,
    transform: [{ scaleX: 0.5 }],
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default Dashboard;

export const dashboardOptions: any = {
  ...DefaultOptions,
  headerShown: false,
  title: 'Hoa hồng'
};
