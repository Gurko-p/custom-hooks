import { useEffect, useState } from "react";

type RequestFunction = () => Promise<{ data: any }>;

export default function useFetch(
  request: RequestFunction
): [any, boolean, string] {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    request()
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [request]);

  return [data, loading, error];
}
