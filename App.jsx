import { React, useReducer, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';



/////////// Redux 
import store from "./Redux/store"
import { Provider } from 'react-redux';


import Navbar from "./Navbar"
// import Navbar2 from './shoping/navbar2';
import Footer from './Footer'
import axios from 'axios';
import Landing from './Landing';
import Login from "./Form_Login"
import SingUp from './Form_singup '

import AppShop from "./shoping/App_shop"

import AppCrypto from "./Crypto/App_crypto"

import Slider from './Slider';

// import Pagination from './Crypto/service/Pagination';

import HeroSection from './HeroSection'

import { bool } from 'prop-types';

import './styles.scss'
////////////////////////////////////


const initialState = {
    data: {}
}

const reducer = (state, action) => {
    switch (action.type) {
        case "true":
            return {
                data: action.payload
            }

        default:
            return state
    }
}

export const MoodHandlerContext = createContext()

const App = () => {

    const [mood, setMood] = useState(false);

    const MoodHandler = () => {
        setMood(!mood);
    }

    // console.log(mood);

    const [data, dispatch] = useReducer(reducer, initialState)

    const get_Api = () => {
        axios.get("https://jsonplaceholder.typicode.com/posts/8")

            .then(response => {
                dispatch({
                    type: "true", payload: response.data
                })
            })
        // .then(response => console.log(response.data)
        // )
        // .catch(error => console.log(error))
    }

    // const [darkMode, setDarkMode] = useState(false);

    // const DarkModeHandler = () => {
    //     setDarkMode(!darkMode)

    //     return darkMode
    // }

    return (

        <>
            {/* <Provider store={store}> */}
                <div className={mood ? "dark" : ""}>
                    <MoodHandlerContext.Provider value={{ mood, MoodHandler }} >

                        {/* <Navbar2></Navbar2> */}

                        <Routes>
                            <Route path='/' element={<Navbar></Navbar>}></Route>

                            {/* <Route path='/singUp' element={<SingUp></SingUp>} ></Route> */}
                            {/* <Route path="/login" element={<Login></Login>} ></Route> */}
                            {/* <Route path="/home" element={<Landing></Landing>} ></Route> */}
                            <Route path="/products/*" element={<AppShop></AppShop>} ></Route>
                            {/* <Route path="/crypto/*" element={<AppCrypto></AppCrypto>} ></Route> */}

                            {/* <Redierct from="/" to="/"></Redierct> */}

                        </Routes>

                        {/* <HeroSection></HeroSection> */}
                        {/* <Slider></Slider> */}

                        {/* <Pagination></Pagination> */}

                        {/* <button onClick={get_Api} > Get api </button>
                         <h3>{data.data.id}</h3> */}

                        {/* <Footer></Footer> */}

                    </MoodHandlerContext.Provider>
                </div>
            {/* </Provider> */}
        </>

    );
}

export default App;
