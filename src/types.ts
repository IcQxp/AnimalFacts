export type Product = {
  id: number,
  title: string,
  text: string,
  createdDate: string,
  image: string,
  liked: boolean
};

export const validateProduct = (product: Product) => {
  const errors: { title?: string; text?: string; image?: string } = {};
  if (!product.title) errors.title = "Название товара обязательно для заполнения.";
  if (!product.text) errors.text = "Описание товара обязательно для заполнения.";
  if (!product.image) errors.image = "URL изображения обязателен для заполнения.";
  return errors;
};

