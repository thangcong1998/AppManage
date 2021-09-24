import { useAPI, useFetch } from 'api/api';
import { DefaultOptions } from 'navigation/DefaultOption';
import React, { Fragment, useState, VFC } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
  Pressable
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { color } from 'theme';
import { spacing } from 'theme/spacing';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Filter } from 'components/Filter/Filter';
import { CustomForm } from 'components/CustomAttribute/CustomForm';
import Input from 'components/InputPaper';

const MyIcon = <Icon name="rocket" size={30} color="#900" />;
interface Props {}

interface customer {
  id: number;
  name: String;
  email: String;
  phone: Number;
}

const Item = ({ id, name, email, phone }: customer) => (
  <View style={style.item}>
    <Avatar.Text size={60} label={name.charAt(0)} />
    <View style={style.infoContainer}>
      <Text style={style.name}>{name}</Text>
      <Text>{phone}</Text>
      <Text>{email}</Text>
    </View>
  </View>
);

const CustomerList: VFC<Props> = ({}) => {
  const [itemList, setItemList] = useState<customer[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const api = useAPI();
  const initialParams = {
    perPage: 20,
    page: 1
  };

  const [params, setParams] = useState<Record<string, unknown>>(initialParams);

  function handleChangeParams(values: Record<string, unknown>) {
    setParams({ ...params, ...values });
  }

  const _params = useMemo(
    () => ({
      ...params
    }),
    [params]
  );

  const { data: data } = useFetch(['customer', _params]);
  console.log({ data });
  // change params
  useEffect(() => {
    //refreshing
    if (isRefreshing) {
      setParams({ ...params, page: 1 });
      setIsRefreshing(false);
    } else {
      if (Array.isArray(data?.data)) {
        if (params.page === 1) {
          setItemList(data?.data);
        } else {
          let arr = [...itemList];
          arr = [...arr, ...data?.data];
          setItemList(arr);
        }
      }
    }
  }, [data, isRefreshing]);

  //load more
  const loadMore = () => {
    if (data) {
      if (!isRefreshing) {
        if (params.page < data.last_page) {
          setParams((pre) => ({ ...pre, page: pre.page + 1 }));
        }
      }
    }
  };

  const renderItem = (item: customer) => (
    <Item id={item.id} name={item.name} email={item.email} phone={item.phone} />
  );

  const [openModal, setOpenModal] = useState<Boolean | undefined>(false);
  const inputs = [
    {
      type: 'number',
      label: 'number',
      field: 'number'
    },
    {
      type: 'text',
      label: 'Tên',
      field: 'name'
    },
    {
      type: 'select',
      label: 'abc',
      field: 'abc',
      items: [
        {
          label: '123',
          value: '123'
        },
        {
          label: '1234',
          value: '1234'
        }
      ]
    },
    {
      type: 'date',
      label: 'date',
      field: 'date'
    }
  ];
  return (
    <View style={style.container}>
      <Filter
        params={params}
        handleChangeParams={handleChangeParams}
        inputs={inputs}
      />
      <FlatList
        data={itemList}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item, index) => `${item.id}`}
        progressViewOffset={3}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => setIsRefreshing(true)}
          />
        }
      />
    </View>
  );
};

export default CustomerList;

export const customerOptions: any = {
  ...DefaultOptions,
  headerShown: true,
  title: 'Khách hàng'
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  customerTitle: {
    borderBottomColor: color.dim,
    borderBottomWidth: 1
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  },
  item: {
    flexDirection: 'row',
    borderBottomColor: color.dim,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  infoContainer: {
    flexDirection: 'column'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15
  },
  filterContainer: {
    padding: spacing.medium,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInput: {
    width: '90%',
    marginRight: 10
  }
});
