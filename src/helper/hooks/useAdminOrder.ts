import { useQuery } from "react-query";
import axios from "axios";

const fetchAdminOrders = async (token: string | null, date: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/orders/admin?date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const useAdminOrder = (token: string | null, date: string) => {
  return useQuery(
    ["adminOrder", token, date],
    () => fetchAdminOrders(token, date),
    {
      select: (data) => data.data,
    },
  );
};
