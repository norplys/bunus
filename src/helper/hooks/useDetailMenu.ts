import { useQuery } from "react-query";
import axios from "axios";

const fetchDetailMenu = async (id: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/menus/${id}`,
  );
  return data;
};

export const useDetailMenu = (id: string) => {
  return useQuery(["detailMenu", id], () => fetchDetailMenu(id), {
    select: (data) => data.data,
  });
};
