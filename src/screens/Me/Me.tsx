import React, { VFC } from "react";
import { ScrollView, Text } from 'react-native';
import {Button} from 'react-native-paper'
import { AnyAction } from "redux";

interface Props {
  navigation: any,
  route: AnyAction
}

const Me:VFC<Props> = ({navigation, route }) => {
  return <ScrollView>
    <Text>Me</Text>
    <Button onPress={() => navigation.navigate('NoAuth')}>Pree</Button>
  </ScrollView>
}
export default Me;