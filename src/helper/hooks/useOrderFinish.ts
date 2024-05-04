import { useQuery } from "react-query";
import axios from "axios";

const fetchOrderFinish = async (date: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/orders/success?date=${date}`,
  );
  return data;
};

export const useOrderFinish = (date: string) => {
  return useQuery(["orderFinish", date], () => fetchOrderFinish(date), {
    select: (data) => data.data,
  });
};
