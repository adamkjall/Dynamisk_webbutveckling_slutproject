import { useState, useEffect } from "react";

const useFetch = (url: string, options: RequestInit = {}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [url]);

  return { loading, data };
};

export default useFetch;
