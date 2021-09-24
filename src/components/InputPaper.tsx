import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { HelperText } from 'react-native-paper';
import { color } from 'theme';

type InputProps = {
  value: any;
  styleInput?: {};
  handleChange: Function;
  onSubmitEditing?: Function;
  error?: string;
  label?: string;
  mode?: string;
  left?: any;
  right?: any;
  render?: any;
  blurOnSubmit?: boolean;
};

export default function InputPaper({
  value,
  styleInput,
  handleChange,
  label,
  error,
  onSubmitEditing,
  left,
  right,
  render,
  blurOnSubmit,
  ...otherProps
}: InputProps) {
  const [valueInput, setValueInput] = useState<string | undefined>(value ? value : '');
  const [isForcusing, setIsForcusing] = useState<Boolean>(false);
  useEffect(() => {
    setValueInput(value);
  }, [value]);

  function handleOnBlur(value: any) {
    setIsForcusing(false);
    handleChange(value ? value : '');
  }
  
  return (
    <View style={[styles.container]}>
      <TextInput
        {...otherProps}
        outlineColor={color.dim}
        underlineColor={color.palette.white}
        // label={label}
        error={!!error}
        style={styleInput}
        value={valueInput}
        onBlur={() => handleOnBlur(valueInput)}
        onSubmitEditing={onSubmitEditing}
        onChangeText={(text) => setValueInput(text)}
        onFocus={() => {
          setIsForcusing(true);
        }}
        blurOnSubmit
        left={!(left?.hideWhenForcus && isForcusing) && left?.render}
        right={right}
        render={render}
      />
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
  }
});
