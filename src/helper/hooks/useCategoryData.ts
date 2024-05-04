import { useQuery } from "react-query";
import axios from "axios";

const fetchCategories = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/categories`,
  );
  return data;
};

export const useCategoriesData = () => {
  return useQuery("categories", fetchCategories, {
    select: (data) => data.data,
  });
};
