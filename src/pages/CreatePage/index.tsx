import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreatePage.module.css";
import { Product } from "../../data/types";
import { addProduct, selectMaxProductId } from "../../store/ProductsSlice";
import { Link } from "react-router-dom";
import { Demo } from "../../components/Products/Demo/Demo";
import { formatDate, validateProduct } from "../../data";

export const CreatePage = () => {
  const dispatch = useDispatch();
  const maxIdFromStore = useSelector(selectMaxProductId);
  let [maxId, setMaxId] = useState<number>(maxIdFromStore);

  const [elem, setElem] = useState<Product>({
    id: 0,
    title: "",
    text: "",
    liked: false,
    image: "",
    createdDate: "",
  });

  const [errors, setErrors] = useState<{ title?: string; text?: string; image?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setElem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elemFormatted = {...elem,title:elem.title.trim(),text:elem.text.trim(),image:elem.image.trim()}
    const validationErrors = validateProduct(elemFormatted);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newProduct = { ...elem, title: elem.title.substring(0, 50).trim(), text: elem.text.substring(0, 500).trim(), id: maxId + 1, createdDate: formatDate(new Date()),image:elem.image.trim() };
    dispatch(addProduct(newProduct));
    setElem({ id: 0, title: "", text: "", liked: false, image: "", createdDate: "" });
    setErrors({});
    setMaxId(maxId + 1);
    alert("Успешно добавлено");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.back__button}>
          <Link to={`/`}>
            <h2 className={styles["back__button-hover"]}>Вернуться</h2>
          </Link>
        </div>
      </header>
      <main className={styles.create__container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3 className={`${styles.menu__step}`}>Введите название товара</h3>
          <input
            name="title"
            value={elem.title}
            onChange={handleChange}
            maxLength={50}
            className={styles.title__input}
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
          <h3 className={`${styles.menu__step}`}>Введите описание товара</h3>
          <textarea
            className={styles.description__input}
            name="text"
            value={elem.text}
            onChange={handleChange}
            rows={4}
            maxLength={500}
          />
          {errors.text && <span className={styles.error}>{errors.text}</span>}
          <h3 className={`${styles.menu__step}`}>Введите URL на изображение вашего товара</h3>
          <input
            className={styles.image__input}
            name="image"
            value={elem.image}
            onChange={handleChange}
          />
          {errors.image && <span className={styles.error}>{errors.image}</span>}
          <Demo title={elem.title} text={elem.text} image={elem.image} />
          <button className={styles.create__button} type="submit">Создать товар</button>
        </form>
      </main>
    </>);
};