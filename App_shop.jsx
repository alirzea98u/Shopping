import { React } from 'react';
import { Routes, Route } from "react-router-dom"
// import { Provider } from 'react-redux';
import NavbarAppShop from "./share/navbar_App_shop"

import AddressForm from './share/AddressForm';
import Store from './store';
import DetailProduct from "./detail_product"
import Shop from "./share/shop"

// import store from './Redux/store';

// Context 
import ProductContextProvider from "./context/productContextProvider"
import CardContextProvider from './context/cardContextProvider';

//styles
import './App_shop.scss'

///////////////////////
const AppShop = () => {
    return (
        <ProductContextProvider>
            <CardContextProvider>
                <NavbarAppShop>
                    <Routes>
                        <Route path="/:id" element={<DetailProduct />}></Route>
                        <Route path="/shop" element={<Shop />}></Route>
                        <Route path="/" element={<Store />}></Route>
                        <Route path="/checkout" element={<AddressForm />}></Route>
                    </Routes>
                </NavbarAppShop>
            </CardContextProvider>
        </ProductContextProvider>
    );
}

export default AppShop;
