import { useQuery } from "react-query";
import axios from "axios";

const fetchOrderAdmin = async (token: string) => {
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

export const useOrderAdmin = (token: string) => {
  return useQuery(["orderAdmin", token], () => fetchOrderAdmin(token), {
    select: (data) => data.data,
  });
};
