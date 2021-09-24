import React from 'react';
import {TouchableOpacity} from 'react-native';
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
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useAPI} from 'api/api';
import {STORAGE_KEY} from 'common/storage/constant';
import * as storage from 'common/storage/storage';
import {useAppDispatch} from 'common/hooks/store';
import {getAuth, setUser} from 'store/authSlice';
import Toast from 'react-native-toast-message';

export default function LoginGoogle({}) {
  GoogleSignin.configure({
    webClientId:
      '438414772662-ribjk4fpojb6dm13n56bg8r19k9u1peh.apps.googleusercontent.com',
  });
  const api = useAPI();
  const dispatch = useAppDispatch();

  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();
      let res = await api.fetcher('post', 'user/loginWithGoogle', {
        id_token: userInfo.idToken,
      });
      if (res) {
        storage.saveString(STORAGE_KEY.user_access_token, res.access_token);
        dispatch(getAuth());
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Không có quyền truy cập',
        topOffset: 40,
        visibilityTime: 2000,
      });
    }
  }

  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => onGoogleButtonPress()}>
        <IconButton
          icon="google"
          color={Colors.blue500}
          size={20}
          animated={true}
        />
      </TouchableOpacity>
    </React.Fragment>
  );
}
