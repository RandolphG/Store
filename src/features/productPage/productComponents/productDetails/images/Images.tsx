import { FC } from "react";
import { Product } from "../../../utils";
import Image from "./Image";
import SlickSlider from "./SlickSlider";

interface IImages {
  setSelectedImg: () => void;
  product: Product;
  selectedImg: any;
}

const Images: FC<IImages> = ({ setSelectedImg, product, selectedImg }) => (
  <div key="slick" className="slick">
    <Image product={product} selectedImg={selectedImg} />
    <SlickSlider
      product={product}
      onClick={setSelectedImg}
      selectedImg={setSelectedImg}
    />
  </div>
);

export default Images;
