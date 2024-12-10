export type Product = {
  id: number,
  title: string,
  text: string,
  createdDate: string,
  image: string,
  liked: boolean
};

export interface MainFields {
  title: string,
  text: string,
  image: string,
}