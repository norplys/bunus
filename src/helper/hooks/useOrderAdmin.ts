import { useQuery } from "react-query";
import axios from "axios";

const fetchOrderAdmin = async (token: string) => {
  const { data } = await axios.get(
    "https://bunus-be-production.up.railway.app/v1/orders/admin",
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
