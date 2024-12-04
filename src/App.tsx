import './App.css';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { ProductList } from './pages/ProductList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<div>Детали продукта</div>} />
    </Routes>
  );
}

export default App;
