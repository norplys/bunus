import { useQuery } from "react-query";
import axios from "axios";

const fetchOrderKitchen = async (token: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/orders/kitchen`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const useOrderKitchen = (token: string) => {
  return useQuery(["orderKitchen", token], () => fetchOrderKitchen(token), {
    select: (data) => data.data,
  });
};
