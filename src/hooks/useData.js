import React, {useEffect, useState} from 'react'
import apiClient from '../utils/api-client';

const useData = (endpoint, customConfig, deps) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      apiClient
        .get(endpoint,customConfig)
        .then((res) => {
          if(endpoint === "/products" && data && data.products && customConfig.params.page !== 1){
            setData(prev => ({
              ...prev, products: [...prev.products, ...res.data.products]
              
            }))
          } else{
            setData(res.data);

          }
         
          setLoading(false);
        })
        .catch((err) => {setError(err.message)
          setLoading(false)
        });
    }, deps ? deps : []);

    return {data, error, isLoading}
}

export default useData