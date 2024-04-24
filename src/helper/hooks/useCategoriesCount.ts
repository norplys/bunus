import { useQuery } from "react-query";
import axios from "axios";

const fetchCategoriesIndex = async () => {
  const { data } = await axios.get(
    "https://bunus-be-production.up.railway.app/v1/categories/count",
  );
  return data;
};

export const useCategoriesCount = () => {
  return useQuery("categoriesCount", fetchCategoriesIndex, {
    select: (data) => data.data,
  });
};
