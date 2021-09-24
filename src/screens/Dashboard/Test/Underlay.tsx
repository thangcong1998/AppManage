import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { lerp } from './Graph';

interface UnderlayProps {
  dates: number[];
  minY: number;
  maxY: number;
  step: number;
  height: number;
}

const Underlay = ({ dates, minY, maxY, step, height }: UnderlayProps) => {
  const hieuga = [1, 0.75, 0.5, 0.25, 0];
  const ROW_Height = height / hieuga.length;
  return (
    <View style={StyleSheet.absoluteFill}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}
      >
        {hieuga.map((t) => {
          return (
            <View
              key={t}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: ROW_Height,
                bottom: lerp(0, height, t) - ROW_Height / 2,
                position: 'absolute',
                width: '100%'
                // top: t === 0 ? ROW_Height / 2 : t === 1 ? -ROW_Height / 2 : 0
              }}
            >
              <View style={{ width: 40, paddingRight: 16 }}>
                <Text style={{ textAlign: 'right' }}>
                  {Math.round(lerp(minY, maxY, t))}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: 'grey',
                  opacity: 0.5
                }}
              />
            </View>
          );
        })}
      </View>
      <View
        style={{
          marginLeft: 40,
          height: 24,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        {dates.map((date, index) => {
          return (
            <View style={{ width: step }}>
              <Text key={index} style={{ textAlign: 'center' }}>
                {date}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Underlay;

const styles = StyleSheet.create({
  container: {}
});
