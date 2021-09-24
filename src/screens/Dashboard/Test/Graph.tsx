import * as React from 'react';
import { useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Underlay from './Underlay';

interface Point {
  month: number;
  value: number;
  color: string;
}
interface GraphProps {
  data: Point[];
}

const { width: wWidth } = Dimensions.get('window');
// console.log({ height });
const aspectRatio = 195 / 305;
// const height = width * aspectRatio;

export const lerp = (v0: number, v1: number, t: number) =>
  (1 - t) * v0 + t * v1;

const Graph = ({ data }: GraphProps) => {
  const canvasWidth = wWidth - 16 * 2;
  const canvasHeight = canvasWidth * aspectRatio;
  const width = (canvasWidth - 24) / 1.1;
  const height = canvasHeight - 24;
  const values = data.map((x) => x.value / 1000000);

  const dates = data.map((x) => x.month);

  const minY = 0;
  const step = width / data.length;
  const value = values?.map((x, index) => {
    if (Math.ceil(x).toString().length == 3) {
      const result = Math.ceil(x / 100) * 100;
      return result;
    }
    if (Math.ceil(x).toString().length == 2) {
      const result = 100;
      return result;
    }
    return 100;
  });
  const maxY = Math.max(...value);

  return (
    <View
      style={{
        marginTop: 40,
        paddingBottom: 25,
        paddingLeft: 40
      }}
    >
      <Underlay
        dates={dates}
        minY={minY}
        maxY={maxY}
        step={step}
        height={height}
      />
      <View
        style={{
          height: height,
          width: width
        }}
      >
        {data.map((x, index) => {
          if (x.value === 0) {
            return null;
          }
          return (
            <View
              style={[
                styles.column,
                {
                  left: index * step,
                  width: step,
                  height: lerp(0, height, x.value / 1000000 / maxY)
                }
              ]}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 16,
                  right: 16,
                  backgroundColor: x.color,
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                  opacity: 0.1
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  height:
                    (x.value / 1000000 / maxY) * height > 24
                      ? 24
                      : (x.value / 1000000 / maxY) * height,
                  left: 16,
                  right: 16,
                  backgroundColor: x.color,
                  borderRadius: 25
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Graph;

const styles = StyleSheet.create({
  column: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center'
  }
});
