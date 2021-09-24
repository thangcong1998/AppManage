import { NumberFormat } from 'components/Chart/NumberFormat';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
interface TrasactionProps {
  transaction: any;
}

const Trasaction = ({ transaction }: TrasactionProps) => {
  return (
    <View style={styles.container}>
      <Surface style={{ elevation: 20, padding: 10, borderRadius: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: transaction.color,
                width: 10,
                height: 10,
                borderRadius: 40,
                marginRight: 10
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: 'bold', opacity: 0.5 }}>
              {`Tháng` + ` ` + `${transaction?.month}`}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{`${NumberFormat(
              transaction?.value
            )}đ`}</Text>
          </View>
        </View>
      </Surface>
    </View>
  );
};

export default Trasaction;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1
  },
  icon: {
    position: 'relative'
  }
});
