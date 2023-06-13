import React, { createContext, useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';

const AdsContext = createContext();

const AdsProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchClient = algoliasearch(
      'YKD5UDOP7U',
      'a6bcd56b74197d5249be963f46104d9e'
    );

    const index = searchClient.initIndex('Lists');

    const fetchData = async () => {
      try {
        const { hits } = await index.search('', { hitsPerPage: 30 });
        setAds(hits);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const searchAds = async (query) => {
    const searchClient = algoliasearch(
      'YKD5UDOP7U',
      'a6bcd56b74197d5249be963f46104d9e'
    );

    const index = searchClient.initIndex('Lists');

    try {
      const { hits } = await index.search(query, { hitsPerPage: 30 });
      setAds(hits);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdsContext.Provider value={{ ads, loading, searchAds }}>
      {children}
    </AdsContext.Provider>
  );
};

export { AdsContext, AdsProvider };
