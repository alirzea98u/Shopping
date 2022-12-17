import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import styles from "./detail_product.module.scss"
import CircularProgress from '@mui/material/CircularProgress';



// Context
import axios from 'axios';
import { Grid } from '@mui/material';

////////////////////////////
const DetailProduct = () => {

    const params = useParams();
    const id = params.id;
    // console.log(id);

    const [loading, setLoading] = useState(false);

    //Method 1
    // const api_Data = async () => {
    //     const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
    //         .then()
    //     return response.data
    // }

    const [Data, setData] = useState([]);

    useEffect(() => {
        setLoading(true)
        console.log(loading);

        //Method 2
        const fetchApi = async () => {
            const { data: res } = await axios.get(`https://fakestoreapi.com/products/${id}`)
            setData(res)
        }
        fetchApi()

        setLoading(false)
    }, []);


    const { image, title, price, category, description } = Data

    return (
        <>
            {loading ?

                <div className='mt-36 flex items-center justify-center gap-3'>
                    <p className='text-3xl'> Loading...   </p>
                    <CircularProgress size={45} thickness={5} />
                </div>

                :

                <Grid container spacing={2} flex sx={{ justifyContent: { xs: 'center' } }} className='pt-36 px-3'>
                    <Grid item xs={5} md={3}>
                        <div className='bg-slate-200 shadow-2xl overflow-hidden'>
                            <img className='w-full rounded-3xl' src={image} alt="#" />
                        </div>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <div className='px-4 pt-2'>
                            <p className='text-center text-3xl mb-3 w-full border-b-4 pb-2 MD:mt-4'>{title} </p>
                            <p className='text-lg mb-2'> <span className='text-orange-600 text-2xl'> description </span>: <p>{description}</p>  </p>
                            <p className='mb-4 text-lg'> <span className='text-orange-600 text-2xl'> Category</span>  : {category} </p>
                            <div className='text-3xl'> {price} $ </div>
                        </div>
                    </Grid>
                </Grid>
            }
            <div className='text-center mt-4'>
                <Link className='link' to="/products">
                    <button className='btn btn-primary w-5/6 bg-blue-600  mt-3 py-2'>
                        back to shop
                    </button>
                </Link>
            </div>

        </>
    );
}

export default DetailProduct;
