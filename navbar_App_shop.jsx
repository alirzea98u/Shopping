import { React, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { AppBar, Drawer, Toolbar, IconButton, Box, TextField, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// context 
import { CardContext, prices } from "../context/cardContextProvider"
import { ProductContext } from "../context/productContextProvider"
import { createContext } from 'react';
// import { MoodHandlerContext } from '../'

// import { Children } from 'react';

///////////////////////
export const useStateContext = createContext()

const NavbarAppShop = ({ children }) => {

    const [search, setSearch] = useState({ text: "", bool: false });
    const [select, setSelect] = useState({ text: "", bool: false });
    const navigate = useNavigate();

    const { state } = useContext(CardContext);
    // const { MoodHandler } = useContext(MoodHandlerContext);
    const { products } = useContext(ProductContext);


    const searchHandler = (e) => {
        setSearch({ text: e.target.value, bool: true })
    }

    const selectHandler = (e) => {
        setSelect({ text: e.target.value, bool: true })
        // console.log(select);
    }

    const categoryBESelected = products.filter(item => item.category.includes(select.text))
    const searched = categoryBESelected.filter(item => item.title.includes(search.text));

    // console.log(categoryBESelected);
    // console.log(searched);

    const [isMobile, setIsMobile] = useState(false);

    // console.log(`current `, window.location.href);
    const location = useLocation();
    const PathName = location.pathname
    // console.log(PathName);
    return (
        <useStateContext.Provider value={{ search, select, searched, categoryBESelected }}>
            <AppBar>
                <Toolbar className='navbar_app_shop flex md:justify-around py-3'>

                    <div className='md:hidden'>
                        <IconButton aria-label='logo' onClick={() => setIsMobile(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={isMobile} anchor='left' onClose={() => setIsMobile(false)}>
                            <Box p={2}>
                                <Box m={1}>
                                    <button className='btn btn-success Btn_out ' onClick={() => navigate('/')} >
                                        <HomeIcon />
                                    </button>
                                </Box>
                                <Box m={1}>
                                    <button className='btn btn-primary Btn_out' onClick={() => navigate('/products')}>
                                        <ProductionQuantityLimitsIcon />  products
                                    </button>
                                </Box>
                                <Box m={1}>
                                    <button className=' btn btn-success Btn_out  ' onClick={() => navigate('/products/shop')}>
                                        <ShoppingCartIcon /> <Badge pill bg="secondary">{prices(state.selectedItems)}</Badge>
                                    </button>
                                </Box>

                                {/* <button className='bg-slate-500 rounded-3xl px-3 py-2  hover:bg-blue-700' onClick={() => MoodHandler()}> <DarkModeIcon />  </button> */}

                                <Box m={1}>
                                    <div className={PathName === "/products" ? "flex items-start flex-col gap-4" : "hidden"}>
                                        <div className='w-40'>
                                            <TextField className=' bg-zinc-300 rounded-md  '
                                                select fullWidth value={select.text} label="Please select a Category"
                                                // placeholder='please select your daste'
                                                onChange={selectHandler}
                                            //  helperText="Please select your daste " 
                                            >
                                                {/* <MenuItem value="category">select a category</MenuItem> */}
                                                <MenuItem value="">All</MenuItem>
                                                <MenuItem value="clothing">clothing</MenuItem>
                                                <MenuItem value="electronics">electrical devices</MenuItem>
                                                <MenuItem value="jeweler">jeweler</MenuItem>
                                            </TextField>
                                        </div>

                                        {/* <button className='btn'><SearchIcon fontSize='large' /></button> */}
                                        <div className='w-72'>
                                            <TextField className=' bg-zinc-300 rounded-lg' type="search" label={<SearchIcon />} fullWidth
                                                value={search.text} onChange={searchHandler} />
                                        </div>
                                    </div>
                                </Box>
                            </Box>
                        </Drawer>
                    </div>


                    <div className=' w-full flex items-center justify-between '>
                        <div>
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                <button className='btn btn-success Btn_out ' onClick={() => navigate('/')} >
                                    <HomeIcon />
                                </button>
                            </Box>
                        </div>

                        <div>
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                <button className='btn btn-primary Btn_out' onClick={() => navigate('/products')}>
                                    <ProductionQuantityLimitsIcon />  products
                                </button>
                            </Box>
                        </div>

                        <div className={PathName === "/products" ? "flex items-center MD:hidden" : "hidden"}>
                            <button className='btn'><SearchIcon fontSize='large' /></button>
                            <div className='flex-auto w-96'>
                                <TextField className=' bg-zinc-300 rounded-lg' type="search" label="search" fullWidth
                                    value={search.text} onChange={searchHandler} />
                            </div>
                            <div className='flex-auto w-40'>
                                <TextField className='ml-2 bg-zinc-300 rounded-md'
                                    select fullWidth value={select.text} label="Please select a Category"
                                    // placeholder='please select your daste'
                                    onChange={selectHandler}
                                //  helperText="Please select your daste " 
                                >
                                    {/* <MenuItem value="category">select a category</MenuItem> */}
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="clothing">clothing</MenuItem>
                                    <MenuItem value="electronics">electrical devices</MenuItem>
                                    <MenuItem value="jeweler">jeweler</MenuItem>
                                </TextField>
                            </div>
                        </div>

                        <div>
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                <button className=' btn btn-success Btn_out ' onClick={() => navigate('/products/shop')}>
                                    <ShoppingCartIcon /> <Badge pill bg="secondary">{prices(state.selectedItems)}</Badge>
                                </button>
                            </Box>
                        </div>

                    </div>
                </Toolbar>
            </AppBar >

            {children}

        </useStateContext.Provider >
    );
}

export default NavbarAppShop;
