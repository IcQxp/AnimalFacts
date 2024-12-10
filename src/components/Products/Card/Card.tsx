import { FC, useEffect, useRef, useState } from "react";
import { Product } from "../../../data/types";
import styles from "./Card.module.css";
import HeartIcon from "../../ViewComponents/HeartIcon/HeartIcon";
import ToolsIcon from "../../ViewComponents/ToolsIcon/ToolsIcon";
import { Link, useNavigate } from "react-router-dom";
import RemovePopup from "../../RemovePopup/RemovePopup";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../../store/ProductsSlice";

interface CardProps extends Product {
  onToggleLike: (id: number) => void;
}

export const Card: FC<CardProps> = ({ id, title, text, createdDate, image, liked, onToggleLike }) => {

  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [isRemovePopupVisible, setIsRemovePopupVisible] = useState<boolean>(false);
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    onToggleLike(id);
  };

  const handleDelete = (id: number) => {
    dispatch(removeProduct(id));
    setIsRemovePopupVisible(false);
  };

  const handleEdit = () => {
    navigate(`/product/${id}/Edit`);
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const toggleRemovePopup = () => {
    setIsRemovePopupVisible(!isRemovePopupVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setPopupVisible(false);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [popupRef]);

  return (
    <div className={styles.card}>
      {isRemovePopupVisible && (
        <RemovePopup id={id} onConfirm={handleDelete} onCancel={toggleRemovePopup}
        />
      )}
      <div className={styles.card__buttons__all} ref={popupRef}>
        {isPopupVisible &&
          <div className={`${styles.tools__buttons} ${isPopupVisible && styles["tools__buttons-active"]}`}  >
            <button className={styles.tools__change__button} onClick={handleEdit}>Изменить</button>
            <button className={styles.tools__delete__button} onClick={toggleRemovePopup}>Удалить</button>
          </div>
        }
        <div className={styles.card__buttons}>
          <button onClick={handleToggleLike} className={`${styles.card__button__like} ${isLiked && styles["card__button__like-active"]}`} >
            <HeartIcon />
          </button>
          <button onClick={togglePopup} className={styles.card__dropdownButton} >
            <ToolsIcon />
          </button>
        </div>
      </div>
      <Link to={`/product/${id}`} className={styles.card__link} >
        <div className={styles.card__imageContainer}>
          <img alt={title} src={image} className={styles.card__image} />
        </div>
        <div className={styles.card__text}>
          <h1 className={styles.card__text__title} >
            {title}
          </h1>
          <div className={styles.card__text__description} >
            {text}
          </div>
        </div>
      </Link>
    </div>
  )
}