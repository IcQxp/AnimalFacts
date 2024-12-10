import React from 'react';
import styles from './RemovePopup.module.css';

interface RemovePopupProps {
  id: number;
  onConfirm: (id: number) => void;
  onCancel: () => void;
}

const RemovePopup: React.FC<RemovePopupProps> = ({ id, onConfirm, onCancel }) => {
  return (<>
    <div className={styles.popup__background} onClick={onCancel}></div>
    <div className={styles.popup}>
      <p>Вы уверены, что хотите удалить продукт с ID: {id}?</p>
      <div className={styles.buttons__container}>
      <button onClick={() => onConfirm(id)} className={styles.confirmButton}>Удалить</button>
      <button onClick={onCancel} className={styles.cancelButton}>Отменить</button>
      </div>
    </div>
    </>
  );
};

export default RemovePopup;