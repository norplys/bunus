import { useQuery } from "react-query";
import axios from "axios";

const fetchOrderFinish = async (date: string) => {
  const { data } = await axios.get(
    `https://bunus-be-production.up.railway.app/v1/orders/success?date=${date}`,
  );
  return data;
};

export const useOrderFinish = (date: string) => {
  return useQuery(["orderFinish", date], () => fetchOrderFinish(date), {
    select: (data) => data.data,
  });
};
