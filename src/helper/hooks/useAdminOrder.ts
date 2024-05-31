import { useQuery } from "react-query";
import axios from "axios";

const fetchAdminOrders = async (token: string | null) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/orders/admin`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const useAdminOrder = (token: string | null) => {
  return useQuery(["cart", token], () => fetchAdminOrders(token), {
    select: (data) => data.data,
  });
};
