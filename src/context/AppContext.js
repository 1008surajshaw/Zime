import React, { useState, useEffect,createContext } from 'react';

export const AppContext = createContext();
export default function AppContextProvider({children}){
    const API_URL = 'https://dummyjson.com/posts';
    
    const fetchData = async (skip, limit) => {
      try {
        const response = await fetch(`${API_URL}?skip=${skip}&limit=${limit}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    };
  const [data, setData] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const newData = await fetchData(pagination.skip, pagination.limit);
      if (newData) {
        setData(newData);
        setError(null);
      } else {
        setError('Failed to fetch data');
      }
      setLoading(false);
    };

    fetchDataAsync();
  }, [pagination]);

  const value = {
      loading,
      setLoading,
      data, 
      setData,
      pagination, 
      setPagination,
      error, 
      setError
      
  }

  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  );
};


