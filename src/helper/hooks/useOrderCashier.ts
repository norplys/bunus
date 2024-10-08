import { useQuery } from "react-query";
import axios from "axios";

const fetchOrderCashier = async (token: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/orders/cashier`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const useOrderCashier = (token: string) => {
  return useQuery(["orderCashier", token], () => fetchOrderCashier(token), {
    select: (data) => data.data,
  });
};
