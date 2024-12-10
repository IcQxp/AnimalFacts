import { FC } from "react"
import styles from "./ProductInfo.module.css"
import { MainFields } from "../../data/types";

interface ProductInfoProps extends MainFields {}

export const ProductInfo: FC<ProductInfoProps> = ({ title, text, image }) => {
  return (
    <>
      <h2>Текущее</h2>
      <div className={styles.now__container}>
        <h3>Текущее наименование товара:</h3>
        <p>{title}</p>
        <h3 className={styles.edit__step__title}>Текущее описание товара:</h3>
        <p>{text}</p>
        <h3 className={styles.edit__step__title}>Текущее URL на изображение вашего товара:</h3>
        <p>{image}</p>
      </div>
    </>);
}