import { useSelector } from "react-redux";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { Product as ProductType } from "../../../types";
import styles from "./Product.module.css"
import { ProductEdit } from "../../../components/Products/ProductEdit/ProductEdit";
import { ProductView } from "../../../components/Products/ProductView/ProductView";


export const Product = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const products: ProductType[] = useSelector((state: RootState) => state.products.products);
  let numberId = Number(id);
  const product = products.find(elem => elem.id === numberId);
  if (!products.length || !product) {
    return <Navigate to="/" replace />;
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
      {location.pathname === `/product/${product?.id}` &&
        <ProductView product={product}/>
        }
      {location.pathname.includes("dit") && <ProductEdit product={product} />}
    </div>
  )
}