import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || 'Something went wrong')
  }
  return resData;
}

export default function useHTTP(url, config, initialValue) {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function clearData() {
    setData(initialValue);
  }

  const sendRequest = useCallback(async function sendRequest(reqData) {
    setIsLoading(true);
    try {
      const resData = await sendHttpRequest(url, {...config, body: reqData});
      setData(resData);
    } catch (error) {
      console.log(error)
      setError(error.message || 'Something went wrong')
    }
    setIsLoading(false)
  }, [url, config])


  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config])


  return {
    data,
    error,
    isLoading,
    sendRequest,
    clearData
  }
}