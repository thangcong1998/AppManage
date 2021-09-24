import { Method } from 'axios';
import {useState, useMemo} from 'react';
import useSWR from 'swr';

import request from './request';

function useFetch(key: any, options?: any) {
  const {fetcher, loading, cancel} = useAPI();
  const {data, error, revalidate} = useSWR(
    key ? ['get'].concat(key) : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      ...options,
    },
  );

  return {data, error, revalidate, loading, cancel};
}

function useAPI(initData?: any) {
  const [error, setError] = useState({});
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(false);
  const [cancel, setCancel] = useState(() => () => false);

  const fetcher = useMemo(() => {
    let ignore = false;
    setCancel(() => () => (ignore = true));
    return async (method: any, endpoint: any, params: any, config = {}) => {
      setError({});
      setLoading(true);
      return request({
        url: endpoint,
        method: method,
        [method.toLowerCase() === 'get' ? 'params' : 'data']:
          typeof params === 'string' ? JSON.parse(params) : params,
        ...config,
      })
        .then((response) => {
          setData(response.data);
          return response.data;
        })
        .catch((err) => (ignore ? null : Promise.reject(errorResponse(err))))
        .finally(() => (ignore ? null : setLoading(false)));
    };
  }, []);

  function errorResponse(errors: any) {
    if (errors.response) {
      const {
        response: {data: errorData, status},
      } = errors;

      // if (status === 401) {
      //   history.push('/error-401');
      // }-
      setError(errorData.errors);
      return {data: errorData, status};
    }
  }

  return {fetcher, data, error, loading, cancel};
}

export {useAPI, useFetch};
