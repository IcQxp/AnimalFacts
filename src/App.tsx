import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import { Product } from './pages/Product/[id]';
import { CreatePage } from './pages/CreatePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<Product/>} >
      <Route path="Edit" element={<Product />} />
      </Route>
      <Route path="/create-product" element={<CreatePage/>} />
    </Routes>
  );
}

export default App;
