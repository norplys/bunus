import { useQuery } from "react-query";
import axios from "axios";

const fetchCartData = async (token: string | null) => {
  const { data } = await axios.get(
    "https://bunus-be-production.up.railway.app/v1/cart",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const useCartData = (token: string | null) => {
  return useQuery(["cart", token], () => fetchCartData(token), {
    select: (data) => data.data,
  });
};
