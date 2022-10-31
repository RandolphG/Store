import { motion } from "framer-motion";
import { FC } from "react";
import { Product, scaleUp } from "../../../utils";

interface IImage {
  product: Product;
  selectedImg: any;
}

const Image: FC<IImage> = ({ product, selectedImg }) => (
  <motion.img
    {...scaleUp}
    className="image"
    src={product.images[selectedImg].url}
    alt={product.images[selectedImg].alt}
  />
);

export default Image;
