import { Routes, Route } from 'react-router-dom';
import Footer from './../renders/fragments/Footer/index';
import Header from './../renders/fragments/Header/index';
import Shop from './../renders/pages/Shop/index';
import Cart from './../renders/pages/Cart/index';
import Product from './../renders/pages/Product/index';
import Home from './../renders/fragments/Home/index';

function App() {
  return (
    <>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;