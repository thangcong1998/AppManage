import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { HelperText } from 'react-native-paper';
import { color } from 'theme';
import { fontSize } from 'theme/fontSize';
import { spacing } from 'theme/spacing';

type InputProps = {
  value: string | undefined;
  inputProps?: Record<string, unknown>;
  styleInput?: Record<string, unknown>;
  handleChange: Function;
  onSubmitEditing?: Function;
  error?: string;
  label: string;
  mode?: string;
  left?: Function | React.ReactNode;
  right?: Function | React.ReactNode;
  render?: Function | React.ReactNode;
  blurOnSubmit?: boolean;
  keyboardType?: 'numeric';
  labelProps?: Record<string, unknown>;
};

export default function Input({
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
  keyboardType,
  ...otherProps
}: InputProps) {
  const [valueInput, setValueInput] = useState<string | undefined>(
    value ? value : ''
  );
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
      <View style={[styles.labelContainer]}>
        <Text
          style={[
            styles.label,
            isForcusing && styles.labelForcus,
            !!error && styles.error
          ]}
        >
          {label}
        </Text>
      </View>
      <View
        style={[
          styles.inputContainer,
          isForcusing && styles.inputForcus,
          !!error && styles.inputError
        ]}
      >
        <TextInput
          {...otherProps}
          style={[styleInput, styles.styleInput]}
          value={valueInput}
          onBlur={() => handleOnBlur(valueInput)}
          onSubmitEditing={onSubmitEditing}
          onChangeText={(text) => setValueInput(text)}
          onFocus={() => {
            setIsForcusing(true);
          }}
          blurOnSubmit
          render={render}
          keyboardType={keyboardType}
        />
        {!!error && (
          <HelperText type="error" visible={!!error}>
            {error}
          </HelperText>
        )}
      </View>
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
    borderColor: color.dim,
    height: 50
  },
  styleInput: {
    fontSize: fontSize.medium,
    paddingHorizontal: spacing.medium
    // paddingLeft: spacing.tiny,
    // paddingRight: spacing.tiny
  },
  inputForcus: {
    borderColor: color.primary
  },
  inputError: {
    borderColor: color.error
  },
  labelContainer: {},
  label: {
    fontSize: fontSize.large,
    color: color.palette.black
  },
  labelForcus: {
    color: color.primary
  },
  error: {
    color: color.error
  }
});
