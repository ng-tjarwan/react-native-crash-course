import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn: () => Promise<any>) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fn();
      setData(res);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fn]);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
