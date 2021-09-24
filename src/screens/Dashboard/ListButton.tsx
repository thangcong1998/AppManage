import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { List, Surface } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SCREEN_KEY } from 'navigation/ScreenKey';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NumberFormat } from 'components/Chart/NumberFormat';
import { useFetch } from 'api/api';

interface ListButtonProps {
  navigation: any;
  data: any;
  date: any;
}

const ListButton = ({ navigation, date, data }: ListButtonProps) => {
  const month = date.getMonth() + 1;
  const commission = data?.selfReport?.commission.find(
    (x: any) => x.month == month
  );
  const totalCommission = data?.selfReport?.commission.reduce(function (
    a: any,
    b: any
  ) {
    return parseInt(a) + parseInt(b.value);
  },
  0);
  const { data: sale } = useFetch(['salesByMonth']);
  console.log({ sale });
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>
        Biểu đồ
      </Text>
      {/* hoa hong */}
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Text style={{ fontSize: 15, opacity: 0.5 }}>Hoa hồng</Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          {NumberFormat(totalCommission)} đ
        </Text>
      </View>
      <Surface
        style={{
          elevation: 20,
          width: '100%',
          borderRadius: 5,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          minHeight: 70
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#3f5efb', '#0f527d']}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
              backgroundColor: 'red',
              paddingHorizontal: 10,
              borderRadius: 7
            }}
          >
            <FontAwesome5 name={'hand-holding-usd'} size={25} color="white" />
          </LinearGradient>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Text>Trong tháng {month}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
              {NumberFormat(commission?.value)} đ
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            justifyContent: 'center'
          }}
          onPress={() =>
            navigation.navigate(`${SCREEN_KEY.DASHBOARD.COMMISSION}`)
          }
        >
          <MaterialIcons
            name={'arrow-forward-ios'}
            size={20}
            style={{ opacity: 0.5 }}
          />
        </TouchableOpacity>
      </Surface>
      {/* chi tieu */}
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10
        }}
      >
        <Text style={{ fontSize: 15, opacity: 0.5 }}>Chỉ tiêu</Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>10.000.000đ</Text>
      </View>
      <Surface
        style={{
          elevation: 20,
          width: '100%',
          borderRadius: 5,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          minHeight: 70
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#3f5efb', '#0f527d']}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
              backgroundColor: 'red',
              paddingHorizontal: 10,
              borderRadius: 7
            }}
          >
            <Feather name={'target'} size={27} color="white" />
          </LinearGradient>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Text>Trong tháng 8</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>10.000.00đ</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            justifyContent: 'center'
          }}
          onPress={() =>
            navigation.navigate(`${SCREEN_KEY.DASHBOARD.COMMISSION}`)
          }
        >
          <MaterialIcons
            name={'arrow-forward-ios'}
            size={20}
            style={{ opacity: 0.5 }}
          />
        </TouchableOpacity>
      </Surface>
      {/* doanh so */}
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10
        }}
      >
        <Text style={{ fontSize: 15, opacity: 0.5 }}>Doanh số</Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>10.000.000đ</Text>
      </View>
      <Surface
        style={{
          elevation: 20,
          width: '100%',
          borderRadius: 5,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          minHeight: 70
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#3f5efb', '#0f527d']}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
              backgroundColor: 'red',
              paddingHorizontal: 10,
              borderRadius: 7
            }}
          >
            <MaterialCommunityIcons name={'sale'} size={26} color="white" />
          </LinearGradient>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Text>Trong tháng 8</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>10.000.00đ</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            justifyContent: 'center'
          }}
          onPress={() =>
            navigation.navigate(`${SCREEN_KEY.DASHBOARD.COMMISSION}`)
          }
        >
          <MaterialIcons
            name={'arrow-forward-ios'}
            size={20}
            style={{ opacity: 0.5 }}
          />
        </TouchableOpacity>
      </Surface>
      {/* doanh so */}
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10
        }}
      >
        <Text style={{ fontSize: 15, opacity: 0.5 }}>
          Khách hàng chậm thanh toán
        </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>10.000.000đ</Text>
      </View>
      <Surface
        style={{
          elevation: 20,
          width: '100%',
          borderRadius: 5,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          minHeight: 70
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#3f5efb', '#0f527d']}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
              backgroundColor: 'red',
              paddingHorizontal: 10,
              borderRadius: 7
            }}
          >
            <MaterialIcons name={'payment'} size={26} color="white" />
          </LinearGradient>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Text>Trong tháng 8</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>10.000.00đ</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            justifyContent: 'center'
          }}
          onPress={() =>
            navigation.navigate(`${SCREEN_KEY.DASHBOARD.COMMISSION}`)
          }
        >
          <MaterialIcons
            name={'arrow-forward-ios'}
            size={20}
            style={{ opacity: 0.5 }}
          />
        </TouchableOpacity>
      </Surface>
      {/* doanh so */}
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10
        }}
      >
        <Text style={{ fontSize: 15, opacity: 0.5 }}>Sự cố</Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>10.000.000đ</Text>
      </View>
      <Surface
        style={{
          elevation: 20,
          width: '100%',
          borderRadius: 5,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          minHeight: 70
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#3f5efb', '#0f527d']}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
              backgroundColor: 'red',
              paddingHorizontal: 10,
              borderRadius: 7
            }}
          >
            <MaterialIcons name={'report-problem'} size={26} color="white" />
          </LinearGradient>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Text>Trong tháng 8</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>10.000.00đ</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            justifyContent: 'center'
          }}
          onPress={() =>
            navigation.navigate(`${SCREEN_KEY.DASHBOARD.COMMISSION}`)
          }
        >
          <MaterialIcons
            name={'arrow-forward-ios'}
            size={20}
            style={{ opacity: 0.5 }}
          />
        </TouchableOpacity>
      </Surface>
      {/* doanh so */}
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10
        }}
      >
        <Text style={{ fontSize: 15, opacity: 0.5 }}>Phản hồi</Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>10.000.000đ</Text>
      </View>
      <Surface
        style={{
          elevation: 20,
          width: '100%',
          borderRadius: 5,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          minHeight: 70
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#3f5efb', '#0f527d']}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
              backgroundColor: 'red',
              paddingHorizontal: 10,
              borderRadius: 7
            }}
          >
            <MaterialIcons name={'feedback'} size={26} color="white" />
          </LinearGradient>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Text>Trong tháng 8</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>10.000.00đ</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            justifyContent: 'center'
          }}
          onPress={() =>
            navigation.navigate(`${SCREEN_KEY.DASHBOARD.COMMISSION}`)
          }
        >
          <MaterialIcons
            name={'arrow-forward-ios'}
            size={20}
            style={{ opacity: 0.5 }}
          />
        </TouchableOpacity>
      </Surface>
    </View>
  );
};

export default ListButton;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%'
  }
});
