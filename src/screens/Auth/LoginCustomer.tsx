import React from 'react';
import {VFC, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useEffect} from 'react';

interface Props {
  colors: any;
  formik: any;
  code: any;
  setCode: any;
  Colors: any;
  confirmCode: any;
  signInWithPhoneNumber: any;
  confirm: any;
}

const LoginCustomer: VFC<Props> = ({
  colors,
  formik,
  code,
  setCode,
  Colors,
  confirmCode,
  signInWithPhoneNumber,
  confirm,
}) => {
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [time, setTime] = useState(120);

  useEffect(() => {
    if (time > 0) {
      const newTime = setInterval(() => {
        setTime(time - 1);
        clearInterval(newTime);
      }, 1000);
    }
  }, [time]);

  return (
    <React.Fragment>
      {confirm._verificationId == null ? (
        <React.Fragment>
          <TextInput
            label="Số điện thoại"
            // mode="outlined"
            keyboardType={'numeric'}
            selectionColor={'#c8c8c8'}
            underlineColor={'black'}
            style={{
              width: '90%',
              marginBottom: 10,
              color: colors.primary,
              backgroundColor: '#fff',
            }}
            render={(props: any) => (
              <TextInputMask {...props} mask="(+84)[000][000][000]" />
            )}
            value={formik.values.phone as any}
            onChangeText={text => formik.setFieldValue('phone', text)}
          />
          <Button
            color={Colors.blue500}
            mode="contained"
            style={{borderRadius: 20, width: '90%'}}
            contentStyle={{height: 50}}
            onPress={() => signInWithPhoneNumber()}>
            Đăng nhập
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Text style={{width: '100%', marginTop: 10, marginLeft: 10}}>
            Gửi lại: {time}s
          </Text>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={code}
            onChangeText={text => setCode(text)}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[
                  formik.errors.code ? styles.errorCell : styles.cell,
                  isFocused && styles.focusCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <HelperText type="error" style={{color: 'red'}}>
            {formik.errors?.code}
          </HelperText>

          <Button
            color={Colors.blue500}
            mode="contained"
            style={{borderRadius: 20, width: '90%'}}
            contentStyle={{height: 50}}
            onPress={() => confirmCode()}>
            xác nhận
          </Button>
          <View
            style={{
              width: '90%',
              marginTop: 10,
            }}>
            {time == 0 && (
              <TouchableOpacity
                onPress={() => {
                  signInWithPhoneNumber();
                  setTime(120);
                }}>
                <Text style={{color: Colors.blue500}}>Gửi lại mã</Text>
              </TouchableOpacity>
            )}
          </View>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    margin: 2,
  },
  errorCell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: 'red',
    textAlign: 'center',
    margin: 2,
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default LoginCustomer;
