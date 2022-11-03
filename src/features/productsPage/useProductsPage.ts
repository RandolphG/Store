import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../utils";
import { requestAddNotification } from "../notifications";
import { requestSetProducts } from "./ProductSlice";
import { Products } from "../../types";

export const useProductsPage = () => {
  const dispatch = useDispatch();
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

  const handBuyClicked = () => {
    console.log("CLICKED_BUY:");
    // dispatch();
  };

  return { products };
};
