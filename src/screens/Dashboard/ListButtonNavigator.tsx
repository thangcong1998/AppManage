import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  View,
  StyleSheet,
  Text
} from 'react-native';
import { List, Surface } from 'react-native-paper';
import { SCREEN_KEY } from 'navigation/ScreenKey';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ButtonNavigator = {
  commission: undefined;
  navigation: any;
};
const Tab = createBottomTabNavigator();
export default function ListButtonNavigator({ navigation }: ButtonNavigator) {
  return (
    <View
      style={{
        width: '90%'
        // marginTop: -15
      }}
    >
      <Surface style={{ elevation: 4, borderRadius: 4, marginBottom: 10 }}>
        <List.Item
          title="10.000.00đ"
          left={(props) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#3EC7A7', '#2287D4']}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              >
                <List.Icon {...props} icon="sale" color="white" />
              </LinearGradient>
            </View>
          )}
          right={(props) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(`${SCREEN_KEY.DASHBOARD.COMMISSION}`)
              }
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <MaterialIcons {...props} name="arrow-forward-ios" size={15} />
            </TouchableOpacity>
          )}
        />
      </Surface>
      <Surface style={{ elevation: 4, borderRadius: 4, marginBottom: 10 }}>
        <List.Item
          title="Hoa hồng"
          left={(props) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#3EC7A7', '#2287D4']}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              >
                <List.Icon {...props} icon="sale" color="white" />
              </LinearGradient>
            </View>
          )}
          right={(props) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(`${SCREEN_KEY.DASHBOARD.COMMISSION}`)
              }
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <MaterialIcons {...props} name="arrow-forward-ios" size={15} />
            </TouchableOpacity>
          )}
        />
      </Surface>
      <Surface style={{ elevation: 4, borderRadius: 4, marginBottom: 10 }}>
        <List.Item
          title="Hoa hồng"
          left={(props) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#3EC7A7', '#2287D4']}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              >
                <List.Icon {...props} icon="sale" color="white" />
              </LinearGradient>
            </View>
          )}
          right={(props) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(`${SCREEN_KEY.DASHBOARD.COMMISSION}`)
              }
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <MaterialIcons {...props} name="arrow-forward-ios" size={15} />
            </TouchableOpacity>
          )}
        />
      </Surface>
      <Surface style={{ elevation: 4, borderRadius: 4, marginBottom: 10 }}>
        <List.Item
          title="Hoa hồng"
          left={(props) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#3EC7A7', '#2287D4']}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              >
                <List.Icon {...props} icon="sale" color="white" />
              </LinearGradient>
            </View>
          )}
          right={(props) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(`${SCREEN_KEY.DASHBOARD.COMMISSION}`)
              }
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <MaterialIcons {...props} name="arrow-forward-ios" size={15} />
            </TouchableOpacity>
          )}
        />
      </Surface>
      <Surface style={{ elevation: 4, borderRadius: 4, marginBottom: 10 }}>
        <List.Item
          title="Hoa hồng"
          left={(props) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#3EC7A7', '#2287D4']}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              >
                <List.Icon {...props} icon="sale" color="white" />
              </LinearGradient>
            </View>
          )}
          right={(props) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(`${SCREEN_KEY.DASHBOARD.COMMISSION}`)
              }
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <MaterialIcons {...props} name="arrow-forward-ios" size={15} />
            </TouchableOpacity>
          )}
        />
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1
    }
  }
});
