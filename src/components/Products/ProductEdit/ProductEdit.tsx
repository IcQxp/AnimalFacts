import { FC, useState, useEffect } from "react";
import { Product, validateProduct } from "../../../types";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ProductEdit.module.css";
import { Demo } from "../Demo/Demo";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../store/ProductsSlice";
interface ProductEditProps {
  product?: Product;
}

const checkFields = (product: Product): boolean => {
  return Boolean(
    product.id &&
    product.title &&
    product.text &&
    product.createdDate &&
    product.image &&
    product.liked !== undefined
  );
};

export const ProductEdit: FC<ProductEditProps> = ({ product }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<{ title?: string; text?: string; image?: string }>({});
  const [elem, setElem] = useState<Product>({
    id: 0,
    title: "",
    text: "",
    liked: false,
    image: "",
    createdDate: new Date().toISOString(),
  });

  const [oldElem, setOldElem] = useState({
    title: "",
    text: "",
    image: "",
  });

  useEffect(() => {
    if (!product || !checkFields(product)) {
      navigate("/");
    } else {

      setElem({
        id: product.id,
        title: product.title,
        text: product.text,
        liked: product.liked,
        image: product.image,
        createdDate: product.createdDate,
      });
      setOldElem({
        title: product.title,
        text: product.text,
        image: product.image,
      })
    }
  }, [product, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setElem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setElem((prev) => ({
      ...prev,
      title: oldElem.title,
      text: oldElem.text,
      image: oldElem.image,
    }));
  }

  const handleSaveChanges = () => {
    const validationErrors = validateProduct(elem);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newProduct = { ...elem };

    dispatch(updateProduct(newProduct));
    setErrors({});
  }
  return (
    <div style={{ padding: "25px" }}>
      {product && (
        <div>
          <div className={styles.back__button}>
            <Link to={`/product/${elem.id}`}><h1 className={styles["back__button-hover"]}>Вернуться к карточке</h1></Link>
          </div>
          <h2>Текущее</h2>
          <div className={styles.now__container}>
            <h3>Текущее наименование товара:</h3>
            <p>{product.title}</p>
            <h3 className={styles.edit__step__title}>Текущее описание товара:</h3>
            <p>{product.text}</p>
            <h3 className={styles.edit__step__title}>Текущее URL на изображение вашего товара:</h3>
            <p>{product.image}</p>
          </div>
          <h2>Изменение</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 className={styles.edit__step__title}>Название</h3>
            <input
              className={styles.title__input}
              type="text"
              name="title"
              value={elem.title}
              onChange={handleChange}
              placeholder="Введите новое название товара"
              maxLength={50}
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
            <h3 className={styles.edit__step__title}>Описание</h3>
            <textarea
              className={styles.description__input}
              name="text"
              value={elem.text}
              onChange={handleChange}
              rows={4}
              placeholder="Введите новое описание товара"
              maxLength={500}
              style={{ resize: "none" }}
            />
            {errors.text && <span className={styles.error}>{errors.text}</span>}
            <h3 className={styles.edit__step__title}>Изображение</h3>
            <input
              className={styles.image__input}
              type="text"
              name="image"
              value={elem.image}
              onChange={handleChange}
              placeholder="Введите новый URL изображения"
            />
            {errors.image && <span className={styles.error}>{errors.image}</span>}
          </div>
          <Demo title={elem.title} image={elem.image} text={elem.text} />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
        <button className={styles.save__button} onClick={handleSaveChanges}>Сохранить</button>
        <button className={styles.reset__button} onClick={handleReset}>Сбросить</button>
      </div>
    </div>
  );
};