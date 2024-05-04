import { useQuery } from "react-query";
import axios from "axios";

const fetchOrderDetail = async (id: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/orders/${id}`,
  );
  return data;
};

export const useOrderDetail = (id: string) => {
  return useQuery(["orderDetail", id], () => fetchOrderDetail(id), {
    select: (data) => data.data,
  });
};
