import { React, useEffect, useState, createContext } from "react"
//Api 
import getProducts from "../service/api"

export const ProductContext = createContext();


const ProductContextProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);


    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)

            setProducts(await getProducts());
            // console.log(products);

            setLoading(false)
        }
        fetchApi()
    }, []);

    return (

        <ProductContext.Provider value={{ products: products, loading: loading }} >

            {children}

        </ProductContext.Provider >
    );
}

export default ProductContextProvider;




