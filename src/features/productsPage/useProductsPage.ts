import { useEffect, useState } from "react";
import { getProducts } from "../../utils";
import { requestAddProduct, selectCartItems } from "../cart";
import { requestAddNotification } from "../notifications";
import { requestSetProductDetails } from "../productDetails";
import { requestSetLoaded, requestSetProducts } from "./productSlice";
import { Product, Products } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export const useProductsPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const [products, setProducts] = useState<Products>([]);

  useEffect(() => {
    getServerProps().then((_r) => console.log("Done:"));
  }, []);

  async function getServerProps(): Promise<Products> {
    try {
      const serverSideProps = await getProducts();
      setProducts(serverSideProps);
      dispatch(requestSetProducts(serverSideProps));
      dispatch(requestAddNotification("PRODUCTS FETCHED"));
      dispatch(requestSetLoaded());
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
    dispatch(requestAddNotification(`${product.title} Added`));
  };

  return {
    products,
    handleSetProductDetails,
    handleAddProduct,
    items,
  };
};
