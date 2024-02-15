import { useQuery } from "react-query";
import axios from "axios";

const fetchCategories = async () => {
    const { data } = await axios.get("https://bunus-be-production.up.railway.app/v1/categories");
    return data;
};

export const useCategoriesData = () => {
    return useQuery("categories", fetchCategories, {
        select: (data) => data.data,
    });
}