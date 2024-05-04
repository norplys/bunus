import { useQuery } from "react-query";
import axios from "axios";

const fetchCategoriesIndex = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/categories/count`,
  );
  return data;
};

export const useCategoriesCount = () => {
  return useQuery("categoriesCount", fetchCategoriesIndex, {
    select: (data) => data.data,
  });
};
