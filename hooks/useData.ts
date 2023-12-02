import { useState, useEffect } from 'react';

interface Data {
 id: string;
 content: string;
}

export const useData = (id: string): [Data | null, boolean] => {
 const [data, setData] = useState<Data | null>(null);
 const [loading, setLoading] = useState<boolean>(true);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/data/${id}.json`);
        const json: Data = await res.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
 }, [id]);

 return [data, loading];
};