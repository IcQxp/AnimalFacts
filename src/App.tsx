import './App.css';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import { Product } from './pages/Product/[id]';
import { CreatePage } from './pages/CreatePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<Product/>} />

      <Route path="/create-product" element={<CreatePage/>} />

    </Routes>
  );
}

export default App;
