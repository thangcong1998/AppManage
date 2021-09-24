import React from 'react';
import { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { color } from 'theme';
import { fontSize } from 'theme/fontSize';
import { useState } from 'react';

type InputProps = {
  value: string | number | null | undefined;
  error?: string;
  label: string;
  items?: Array<Record<string, unknown>>;
  handleChange: Function;
};

export default function Dropdown({
  value,
  error,
  label,
  items,
  handleChange,
  ...otherProps
}: InputProps) {
  const pickerRef = useRef();
  const [isForcusing, setIsForcusing] = useState<boolean>(false);
  function handleChangeValue(e) {
    handleChange(e);
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.labelContainer]}>
        <Text style={[styles.label]}>{label}</Text>
      </View>
      <View style={[styles.inputContainer]}>
        <Picker
          ref={pickerRef}
          onValueChange={handleChangeValue}
          selectedValue={value}
          onFocus={() => setIsForcusing(true)}
          onBlur={() => setIsForcusing(false)}
          {...otherProps}
        >
          {items?.map((item, index) => (
            <Picker.Item
              key={index}
              style={styles.styleItem}
              label={item.label as string}
              value={item.value as string}
              color={
                value == item.value && isForcusing
                  ? color.primary
                  : color.palette.black
              }
            />
          ))}
        </Picker>
      </View>
      {!!error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  inputContainer: {
    borderWidth: 1,
    width: '100%',
    height: 50,
    borderColor: color.dim
  },
  styleItem: {
    fontSize: fontSize.medium
  },
  inputError: {
    borderColor: color.error
  },
  labelContainer: {},
  label: {
    fontSize: fontSize.large,
    color: color.palette.black
  },
  selectedItem: {
    color: color.primary
  },
  error: {
    color: color.error
  }
});
