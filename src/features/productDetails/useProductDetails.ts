import { useSelector } from "react-redux";
import { selectProductDetail } from "./productsDetailsSlice";

export const useProductDetails = () => {
  const { product } = useSelector(selectProductDetail);

  return { product };
};
