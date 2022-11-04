import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../utils";
import { requestAddProduct, selectCart } from "../cart";
import { requestAddNotification } from "../notifications";
import { requestSetProductDetails } from "../productDetails";
import { requestSetProducts } from "./ProductSlice";
import { Product, Products } from "../../types";

export const useProductsPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCart);
  const [products, setProducts] = useState<Products>([]);

  useEffect(() => {
    getServerProps().then((_r) => console.log("Done"));
  });

  async function getServerProps(): Promise<Products> {
    try {
      const serverSideProps = await getProducts();
      setProducts(serverSideProps);
      dispatch(requestSetProducts(serverSideProps));
      dispatch(requestAddNotification("PRODUCTS FETCHED"));
      return serverSideProps;
    } catch (error: any) {
      console.log(error.message());
      return [];
    }
  }

  /**
   * handleSetProductDetails
   * @param product
   */
  const handleSetProductDetails = (product: Product) => {
    dispatch(requestSetProductDetails(product));
  };
  /**
   * handleSetProductDetails
   * @param product
   */

  const handleAddProduct = (product: Product) => {
    dispatch(requestAddProduct(product));
  };

  return { products, handleSetProductDetails, handleAddProduct, items };
};
