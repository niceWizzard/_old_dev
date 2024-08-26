import './App.css';
import HomePage from './components/home/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './components/product_page/ProductPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='products/:id' element={<ProductPage/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
