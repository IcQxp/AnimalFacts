import { Product } from "./types";

export function formatDate(DateForFormatted: Date): string {
    const pad = (i: number) => (i < 10) ? "0" + i : "" + i;
    return `${DateForFormatted.getFullYear()}.${pad(1 + DateForFormatted.getMonth())}.${pad(DateForFormatted.getDate())}, ${pad(DateForFormatted.getHours())}:${pad(DateForFormatted.getMinutes())}:${pad(DateForFormatted.getSeconds())}`
  }

  export const validateProduct = (product: Product) => {
    const errors: { title?: string; text?: string; image?: string } = {};
    if (!product.title) errors.title = "Название товара обязательно для заполнения.";
    if (!product.text) errors.text = "Описание товара обязательно для заполнения.";
    if (!product.image) {
      errors.image = "URL изображения обязателен для заполнения.";
    } else if (!product.image.startsWith("http://")&&!product.image.startsWith("https://")) {
      errors.image = "URL изображения должен начинаться с http:// или https://.";
    }
    return errors;
  };

  export const checkFields = (product: Product): boolean => {
    return Boolean(
      product.id &&
      product.title &&
      product.text &&
      product.createdDate &&
      product.image &&
      product.liked !== undefined
    );
  };

  export function normalizeData(data: any[]): Product[] {
    return data.map((item, index): Product => {
      let formattedDate = formatDate(new Date());
      return {
        id: index + 1,
        title: item.title,
        text: item.description,
        createdDate: formattedDate,
        image: item.image,
        liked: false
      };
    });
  }