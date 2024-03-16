import { useQuery } from "react-query";
import axios from "axios";

const fetchOrderData = async (token: string) => {
  const { data } = await axios.get(
    `https://bunus-be-production.up.railway.app/v1/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const useOrderData = (token: string) => {
  return useQuery(["orderData", token], () => fetchOrderData(token), {
    select: (data) => data.data,
  });
};
