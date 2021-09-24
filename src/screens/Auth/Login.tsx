import {VFC} from 'react';
import React from 'react';
import {
  Button,
  Card,
  Title,
  TextInput,
  IconButton,
  Colors,
  useTheme,
  HelperText,
} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik, useFormik} from 'formik';
import {useAPI} from 'api/api';
import * as Yup from 'yup';
import * as storage from 'common/storage/storage';
import {STORAGE_KEY} from 'common/storage/constant';
import {useAppDispatch, useAppSelector} from 'common/hooks/store';
import {getAuth, setUser} from 'store/authSlice';
import {useFetch} from 'api/api';
import TextInputMask from 'react-native-text-input-mask';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color} from 'theme';
import auth from '@react-native-firebase/auth';
import LoginCustomer from './LoginCustomer';
import LoginGoogle from './LoginGoogle';

interface Props {}
interface LoginFormValue {
  emailOrPhone: String;
  password: String | null;
  phone: String | null;
  code: any;
}
interface Confirm {
  confirm: any;
}
const Login: VFC = ({}: Props) => {
  const api = useAPI();
  const LoginForm: LoginFormValue = {
    emailOrPhone: '',
    password: '',
    phone: '',
    code: '',
  };
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: LoginForm,
    validationSchema: Yup.object().shape({
      emailOrPhone: Yup.string()
        .max(50, 'Tối đa 50 ký tự')
        .required('Không được bỏ trống trường tên tài khoản'),
      password: Yup.string()
        .max(50, 'Tối đa 50 ký tự')
        .required('Không được bỏ trống trường mật khẩu'),
    }),
    onSubmit: async ({password, emailOrPhone}) => {
      // const [] = await storage.saveString();
      try {
        const res = await api.fetcher('post', 'user/login', {
          // phone_number: '+84' + phone.slice(1),
          password,
          emailOrPhone,
          // phone,
        });
        storage.saveString(STORAGE_KEY.user_access_token, res.access_token);
        dispatch(getAuth());
      } catch (error) {
        if (error.data.errors) {
          formik.setErrors(error.data.errors);
        }
      }
    },
  });

  const [customer, setCustomer] = useState(false);
  const {colors} = useTheme();

  const [confirm, setConfirm] = useState<Confirm>({confirm: null});

  const [code, setCode] = useState('');

  // Handle the button press
  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `${formik.values.phone}`,
      );
      setConfirm(confirmation);
    } catch (e) {
      console.log({e});
    }
  };
  async function confirmCode() {
    try {
      const verify = await confirm.confirm(code);

      if (verify) {
        const res = await api.fetcher(
          'post',
          'api-customer/loginWithPhoneNumber',
          {
            phone: '0' + `${String(formik.values.phone).slice(5)}`,
          },
        );
        if (res) {
          storage.saveString(STORAGE_KEY.user_access_token, res.access_token);
          dispatch(getAuth());
        }
      }
    } catch (error) {
      formik.setFieldError(
        'code',
        'Sai mã xác nhận hoặc số điện thoại không đúng',
      );
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.grow}>
        <View style={styles.circleBackground} />

        <Image
          source={require('assets/logo/logo.png')}
          style={{marginTop: 20}}
        />
        <Card style={styles.form}>
          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <Title style={{color: 'black'}}>Đăng nhập tài khoản</Title>
          </View>
          {customer == false ? (
            <LoginStaff formik={formik} colors={colors} />
          ) : (
            <View style={{alignItems: 'center'}}>
              <LoginCustomer
                formik={formik}
                colors={colors}
                code={code}
                setCode={setCode}
                Colors={Colors}
                confirmCode={confirmCode}
                signInWithPhoneNumber={signInWithPhoneNumber}
                confirm={confirm}
              />
            </View>
          )}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
            }}>
            <TouchableOpacity style={{width: '90%', marginTop: 20}}>
              {customer == false && (
                <Button
                  color={Colors.blue500}
                  mode="contained"
                  style={{borderRadius: 20, width: '100%'}}
                  contentStyle={{height: 50}}
                  onPress={formik.handleSubmit}>
                  Đăng nhập
                </Button>
              )}
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, height: 1, backgroundColor: '#bfc1c5'}} />
              <View>
                <Text
                  style={{
                    width: 50,
                    textAlign: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  Hoặc
                </Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: '#bfc1c5'}} />
            </View>
            {/* <LoginGoogle /> */}
          </View>
        </Card>
        <View>
          {customer == true ? (
            <TouchableOpacity onPress={() => setCustomer(false)}>
              <Text style={{color: 'black'}}>Đăng nhập dành cho nhân viên</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setCustomer(true)}>
              <Text style={{color: 'black'}}>
                Đăng nhập dành cho khách hàng
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

interface LoginStaffProps {
  formik: any;
  colors: any;
}

function LoginStaff(prop: LoginStaffProps) {
  return (
    <View style={{alignItems: 'center'}}>
      <TextInput
        label="Tên tài khoản hoặc số điện thoại"
        selectionColor={'#c8c8c8'}
        underlineColor={'black'}
        style={{
          width: '90%',
          marginBottom: 10,
          color: prop.colors.primary,
          backgroundColor: '#fff',
        }}
        error={prop.formik.errors.emailOrPhone}
        value={prop.formik.values.emailOrPhone}
        onChangeText={text => prop.formik.setFieldValue('emailOrPhone', text)}
      />
      {prop.formik.errors.emailOrPhone && (
        <HelperText type="error" style={{width: '100%', marginLeft: 20}}>
          {prop.formik.errors.emailOrPhone}
        </HelperText>
      )}
      <TextInput
        label="Mật khẩu"
        // mode="outlined"
        secureTextEntry
        selectionColor={'#c8c8c8'}
        underlineColor={'black'}
        style={{
          width: '90%',
          marginBottom: 10,
          backgroundColor: '#fff',
        }}
        error={prop.formik.errors.password}
        theme={{colors: {primary: Colors.blue500}}}
        value={prop.formik.values.password as any}
        onChangeText={e => prop.formik.setFieldValue('password', e)}
      />
      {prop.formik.errors.password && (
        <HelperText type="error" style={{width: '100%', marginLeft: 20}}>
          {prop.formik.errors.password}
        </HelperText>
      )}
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          marginTop: 10,
        }}>
        <TouchableOpacity>
          <Text>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0c899',
    // paddingHorizontal: 16,
    // height: css.height,
    flex: 1,
    minHeight: '100%',
  },
  grow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    // backgroundColor: 'red',
  },
  form: {
    width: '80%',
    marginBottom: 20,
    marginTop: 60,
    borderRadius: 25,
    // alignItems: 'center',
  },
  circleBackground: {
    width: 1000,
    height: 1200,
    borderRadius: 500,
    backgroundColor: '#e9d7b3',
    position: 'absolute',
    top: -840,
  },
  endItem: {
    alignSelf: 'flex-end',
  },
  primaryText: {
    // color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 10,
  },
  button: {
    marginVertical: 20,
  },
  orText: {
    color: '#9E9E9E',
    fontSize: 14,
    textAlign: 'center',
  },
  noAcc: {
    color: '#1F1F1F',
    fontSize: 14,
  },
  register: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
});
export default Login;
