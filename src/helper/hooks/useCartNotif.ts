import { useQuery } from "react-query";
import axios from "axios";

const fetchCartNotif = async (token: string | null) => {
  const { data } = await axios.get(
    "https://bunus-be-production.up.railway.app/v1/cart-notif",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const useCartNotif = (token: string | null) => {
  if (!token) return { data: { total: 0 }, isLoading: false };
  return useQuery(["cartNotif", token], () => fetchCartNotif(token), {
    select: (data) => data.data,
  });
};
