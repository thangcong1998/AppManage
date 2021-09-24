import React, { useRef, VFC } from 'react';
import { CustomModal } from 'components/Modal/CustomModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from 'theme';
import { View, Button, StyleSheet, ScrollView, Text } from 'react-native';
import { spacing } from 'theme/spacing';
import { TextInput } from 'react-native-paper';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { CustomForm } from 'components/CustomAttribute/CustomForm';
import InputPaper from 'components/InputPaper';

interface filterProps {
  params: Record<string, unknown>;
  handleChangeParams: Function;
  inputs: Array<Record<string, unknown>>;
}

export const Filter: VFC<filterProps> = ({
  params,
  handleChangeParams,
  inputs
}) => {
  const initialValues: Record<string, unknown> = {};

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      handleChangeParams(values);
    }
  });

  useEffect(() => {
    formik.setValues(params);
  }, [params]);

  return (
    <View style={style.filterContainer}>
      <View style={style.searchInput}>
        <InputPaper
          mode="outlined"
          label="Tìm kiếm"
          value={params?.search}
          handleChange={(value: string) =>
            handleChangeParams({ search: value })
          }
          blurOnSubmit={true}
          left={{
            hideWhenForcus: true,
            render: <TextInput.Icon name="magnify" />
          }}
        />
      </View>
      <CustomModal
        content={(onClose: Function) => (
          <View style={style.filterModalContainer}>
            <View style={style.modalInside}>
              <ScrollView
                style={{
                  width: '100%',
                  height: '100%',
                  padding: spacing.medium
                }}
              >
                <View>
                  <Button
                    onPress={() => formik.handleSubmit()}
                    title="Áp dụng"
                    color="#841584"
                  />
                  <Button
                    onPress={() => onClose()}
                    title="Đóng"
                    color="#841584"
                  />
                </View>
                <CustomForm
                  inputs={inputs}
                  handleChange={formik.handleChange}
                  data={formik.values}
                />
              </ScrollView>
            </View>
          </View>
        )}
      >
        <Icon name="filter" size={30} color={color.dim} />
      </CustomModal>
    </View>
  );
};

const style = StyleSheet.create({
  filterContainer: {
    padding: spacing.medium,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInput: {
    width: '90%',
    marginRight: 10
  },
  filterModalContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  modalInside: {
    width: '85%',
    height: '100%',
    right: 0,
    backgroundColor: color.palette.white,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }
});
