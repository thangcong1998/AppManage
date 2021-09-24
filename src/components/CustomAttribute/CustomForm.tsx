// import DateInput from 'components/DateInput';
import Input from 'components/Input';
import Dropdown from 'components/Select';
import React, { FC, FunctionComponent, VFC, Fragment } from 'react';
import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

interface renderInputProps {
  type?: string;
  value:
    | Record<string, unknown>
    | string
    | number
    | Date
    | null
    | undefined;
  label: string;
  handleChange: Function;
}

interface customFormProps {
  inputs: Array<Record<string, unknown>>;
  data: Record<string, unknown>;
  handleChange: Function;
}
export const CustomForm = ({ inputs, data, handleChange }: customFormProps) => {
  const RenderInput = ({
    type,
    value,
    handleChange,
    label,
    ...otherProps
  }: renderInputProps) => {
    switch (type) {
      case 'text':
      case 'password':
      case 'textarea':
        return (
          <Input
            {...otherProps}
            value={value as string | undefined}
            label={label}
            handleChange={handleChange}
          />
        );
      case 'number':
        return (
          <Input
            {...otherProps}
            value={value as string | undefined}
            label={label}
            handleChange={handleChange}
            keyboardType="numeric"
          />
        );
      case 'select':
        return (
          <Dropdown
            value={value?.toString() as string | number | null}
            label={label}
            handleChange={handleChange}
            {...otherProps}
          />
        );
      // case 'date':
      //   return (
      //     <DateInput
      //       value={value as string | Date | moment.Moment | undefined}
      //       label={label}
      //       handleChange={handleChange}
      //     />
      //   );
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      {inputs?.map(({ label, type, field, ...otherProps }, index) =>
        otherProps?.hide ? (
          <Fragment></Fragment>
        ) : (
          <View key={field as string}>
            {RenderInput({
              value: data[field as string] as
                | Record<string, unknown>
                | string
                | number
                | Date
                | null
                | undefined,
              handleChange: handleChange(field),
              label: label as string,
              type: type as string,
              ...otherProps
            })}
          </View>
        )
      )}
    </ScrollView>
  );
};
