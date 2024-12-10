import styles from "./Demo.module.css"
import { FC } from "react";

interface DemoProps {
  title: string,
  image: string,
  text: string,
}

export const Demo: FC<DemoProps> = ({ title, image, text }) => {
  return (<>
    <h2 className={styles.demo__title}> Предпросмотр</h2>
    <div className={styles.demo__container}>
      <div className={styles.demo}>
        <div className={styles.demo__img__container}>
          <img alt="img" src={image} className={styles.demo__img} />
        </div>
        <hr className={styles.demo__separator}></hr>
        <div className={styles.demo__text}>
          <h2 className={styles.demo__title} style={{ wordBreak: "break-word", fontSize: "1.5em", lineHeight: "1.5em", maxHeight: "3em", overflow: "hidden", textOverflow: "ellipsis" }}> {title}</h2>
          <p style={{ wordBreak: "break-word" }} className={styles.demo__description}>
            {text}

          </p>
        </div>
      </div>
    </div>
  </>)
}
