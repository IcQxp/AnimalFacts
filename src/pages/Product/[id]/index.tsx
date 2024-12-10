import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { Product as ProductType } from "../../../types";
import styles from "./Product.module.css"
import { useState } from "react";
import { ProductEdit } from "../../../components/Products/ProductEdit/ProductEdit";
import RemovePopup from "../../../components/RemovePopup/RemovePopup";
import { removeProduct, toggleLike } from "../../../store/ProductsSlice";


export const Product = () => {
  const [isRemovePopupVisible,setIsRemovePopupVisible] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch(); 
  const location = useLocation();
  const navigate = useNavigate();
  const products: ProductType[] = useSelector((state: RootState) => state.products.products);
  let numberId = Number(id);
  const product = products.find(elem => elem.id === numberId);
  if (!products.length || !product) {
    return <Navigate to="/" replace />;
  } 
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

const handleFavourite = ()=> {
  dispatch(toggleLike(product.id))
}
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.back__button}>
        <Link to={`/`}>
      <h2 className={styles["back__button-hover"]}>Назад</h2>
                </Link>
        </div>
      </header>
      {location.pathname===`/product/${product?.id}`&&
      
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
          <button className={styles.like__button} onClick={handleFavourite}>{product.liked?"Удалить из избранного":"Добавить в избранное"}</button>
          <button className={styles.change__button} onClick={navigateToEdit}>Изменить</button>
          <button className={styles.delete__button} onClick={toggleRemovePopup}>Удалиить</button>
          <div className={styles.createdDate}>
            {product?.createdDate}
          </div>
        </div>
      </div>}
      {location.pathname.includes("dit")&&<ProductEdit product={product}/>}
    </div>
  )
}