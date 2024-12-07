import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { Product as ProductType } from "../../../types";
import styles from "./Product.module.css"

export const Product = () => {
  const { id } = useParams<{ id: string }>();
  const products: ProductType[] = useSelector((state: RootState) => state.products.products);
  let numberId = Number(id);
  const product = products.find(elem => elem.id === numberId);
  if (!products.length) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <div className={styles.main__box}>
        <div className={styles.images__box}>
          <div className={styles.product__image}>
            <img className={styles.product__image} src={product?.image} />
          </div>
        </div>
        <hr className={styles.separator} />
        <div className={styles.text}>
          <h2 className={styles.product__title}>{product?.title}</h2>
          <div className={styles.description}>{product?.text}</div>
          <button className={styles.like__button}>Добавить в избранное</button>
          <button className={styles.change__button}>Изменить</button>
          <button className={styles.delete__button}>Удалиить</button>
          <div className={styles.createdDate}>
            {product?.createdDate}
          </div>
        </div>
      </div>
    </div>
  )
}