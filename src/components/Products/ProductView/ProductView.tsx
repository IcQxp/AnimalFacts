import { FC, useState } from "react";
import { Product } from "../../../types";
import styles from "./ProductView.module.css"
import RemovePopup from "../../RemovePopup/RemovePopup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeProduct, toggleLike } from "../../../store/ProductsSlice";

interface ProductViewProps {
product:Product,
}

export const ProductView: FC<ProductViewProps> = ({product}) => {

  const [isRemovePopupVisible, setIsRemovePopupVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToEdit = () => {
    navigate("edit")
  }

  const handleDelete = (id: number) => {
    dispatch(removeProduct(id));
    setIsRemovePopupVisible(false);
  };

  const toggleRemovePopup = () => {
    setIsRemovePopupVisible(!isRemovePopupVisible);
  };

  const handleFavourite = () => {
    dispatch(toggleLike(product.id))
  }

  return (
    <div className={styles.main__box}>
      {isRemovePopupVisible && (
        <RemovePopup
          id={product.id}
          onConfirm={handleDelete}
          onCancel={toggleRemovePopup}
        />
      )}
      <div className={styles.images__box}>
        <img alt="Продукт" className={styles.product__image} src={product?.image} />
      </div>
      <hr className={styles.separator} />
      <div className={styles.text}>
        <h2 className={styles.product__title}>{product?.title}</h2>
        <div className={styles.description}>{product?.text}</div>
        <div className={styles.buttons__container}>
          <button className={styles.like__button} onClick={handleFavourite}>{product.liked ? "Удалить из избранного" : "Добавить в избранное"}</button>
          <button className={styles.change__button} onClick={navigateToEdit}>Изменить</button>
          <button className={styles.delete__button} onClick={toggleRemovePopup}>Удалить</button>
        </div>
        <div className={styles.createdDate}>
          {product?.createdDate}
        </div>
      </div>
    </div>);
}