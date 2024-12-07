import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreatePage.module.css";
import { Product } from "../../types";
import { addProduct, selectMaxProductId } from "../../store/ProductsSlice";
import { Link, Navigate } from "react-router-dom";


export const CreatePage = () => {
  const dispatch = useDispatch();
  const maxIdFromStore = useSelector(selectMaxProductId);
  let [maxId, setMaxId] = useState<number>(maxIdFromStore);

  const [elem, setElem] = useState<Product>({
    id: Date.now(),
    title: "",
    text: "",
    liked: false,
    image: "",
    createdDate: new Date().toISOString(),
  });

  const [errors, setErrors] = useState<{ title?: string; text?: string; image?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setElem((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: { title?: string; text?: string; image?: string } = {};
    if (!elem.title) newErrors.title = "Название товара обязательно для заполнения.";
    if (!elem.text) newErrors.text = "Описание товара обязательно для заполнения.";
    if (!elem.image) newErrors.image = "URL изображения обязателен для заполнения.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newProduct = { ...elem, id: maxId + 1 };
    dispatch(addProduct(newProduct));
    setElem({ id: 0, title: "", text: "", liked: false, image: "", createdDate: new Date().toISOString() });
    setErrors({});
    setMaxId(maxId + 1);
  };

  return (
    <div>
      <Link to={`/`}>
        <p>Вернуться</p>
      </Link>
      <form onSubmit={handleSubmit}>
        <p>Введите название товара</p>
        <input
          name="title"
          value={elem.title}
          onChange={handleChange}
        />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
        <p>Введите описание товара</p>
        <textarea
          name="text"
          value={elem.text}
          onChange={handleChange}
          rows={4}
        />
        {errors.text && <span className={styles.error}>{errors.text}</span>}
        <p>Введите URL на изображение вашего товара</p>
        <input
          name="image"
          value={elem.image}
          onChange={handleChange}
        />
        {errors.image && <span className={styles.error}>{errors.image}</span>}
        <button type="submit">Создать товар</button>
      </form>
      <div className={styles.demo__container}>
        <div className={styles.demo}>
          <div>
          </div>
          <hr></hr>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};