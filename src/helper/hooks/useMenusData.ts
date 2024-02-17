import { useQuery } from "react-query";
import axios from "axios";

const fetchCategoryMenus = async (id: string) => {
  const { data } = await axios.get(
    `https://bunus-be-production.up.railway.app/v1/menus?id=${id}`,
  );
  return data;
};

export const useCategoriesMenus = (id: string) => {
  return useQuery(["categoryMenus", id], () => fetchCategoryMenus(id), {
    select: (data) => data.data,
  });
};
