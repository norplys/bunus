import { useQuery } from "react-query";
import axios from "axios";

const fetchCartNotif = async (token: string | null) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/cart-notif`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const useCartNotif = (token: string | null) => {
  return useQuery(["cartNotif", token], () => fetchCartNotif(token), {
    select: (data) => data.data,
  });
};
