/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

const usePeriodicFetch = (
  fetchFunction,
  interval = 300000,
  dependencies = []
) => {
  const savedFetchFunction = useRef();

  useEffect(() => {
    savedFetchFunction.current = fetchFunction;
  }, [fetchFunction]);

  useEffect(() => {
    const fetchData = () => {
      savedFetchFunction.current();
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [interval, ...dependencies]);
};

export default usePeriodicFetch;
