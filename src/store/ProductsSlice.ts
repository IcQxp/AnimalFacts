import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../data/types';

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    toggleLike(state, action: PayloadAction<number>) {
      const product = state.products.find(product => product.id === action.payload);
      if (product) {
        product.liked = !product.liked;
      }
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const updatedProduct = action.payload;
      state.products = state.products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
    },
  },
});

export const selectMaxProductId = (state: { products: ProductState }) => {
  let arrayLength = state.products.products.length
  if (!arrayLength)
    return 0;
  return state.products.products[arrayLength - 1].id;
};


export const { setProducts, addProduct, removeProduct, toggleLike, updateProduct } = productSlice.actions;
export default productSlice.reducer;