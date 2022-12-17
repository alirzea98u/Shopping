import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faDeleteLeft, faMinus, faShoppingBag, faShoppingBasket, faShoppingCart, faShopSlash } from '@fortawesome/free-solid-svg-icons';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { Card, Grid } from '@mui/material';
import { shorten, isInCart, quantityCount } from "../helpers/function"

//Context
import { CardContext, prices } from "../context/cardContextProvider"

// styles 
// import styles from "./product.module.scss"

///////////////////////////////////

const Product = (props) => {

    const { state, dispatch } = useContext(CardContext)

    const { image, price, title, id } = props.Data

    return (

        <Card elevation={8} className='py-3 dark:bg-slate-500 '>
            <img src={image} alt="#" />
            <div className='flex justify-between py-6'>
                <p className='text-start font-bold pl-2 text-lg '>{shorten(title)}</p>
                <p className='text-end pr-2 text-lg '> {price}$ </p>
            </div>

            <Grid className='flex' alignItems={'center'} justifyContent={'space-evenly'} >
                <Link to={`/products/${id}`} className='link'>
                    <button className='btn btn-success  text-sm text-center w-20 rounded-lg'> Details </button>
                </Link>

                <div>
                    {
                        isInCart(state, id) ?
                            <div>
                                {quantityCount(state, id) > 1 ?
                                    <span>
                                        <button onClick={() => { dispatch({ type: "min", payload: props.Data }) }}
                                            className='btn btn-danger Btn_out text-sm'>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                    </span>
                                    :
                                    <span>
                                        <button onClick={() => { dispatch({ type: "remove_item", payload: props.Data }) }}
                                            className='btn btn-danger Btn_out text-xs'>
                                            {/* <FontAwesomeIcon icon={faDeleteLeft} /> */}
                                            <DeleteForeverSharpIcon fontSize='small' />
                                        </button>
                                    </span>
                                }

                                {<Badge pill className='p-2 m-1'> {quantityCount(state, id)} </Badge>}

                                <span>
                                    <button onClick={() => { dispatch({ type: "add", payload: props.Data }) }}
                                        className='btn btn-info Btn_out text-sm'>
                                        <FontAwesomeIcon icon={faAdd} />
                                    </button>
                                </span>
                            </div>
                            :
                            <button onClick={() => { dispatch({ type: "add_item", payload: props.Data }) }}
                                className='btn  btn-info text-sm w-36'>
                                <FontAwesomeIcon icon={faShoppingCart} />
                                Add to card
                            </button>
                    }
                </div>
            </Grid>

        </Card>
    );
}

export default Product;
