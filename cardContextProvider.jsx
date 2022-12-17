import { useReducer, createContext } from 'react';

////////////////////////////

export const prices = (sum) => {
    const summ = sum.map(item => item.quantity)
    let summm = 0
    for (let i = 0; i < summ.length; i++) {
        summm += summ[i]
    }
    return summm
    // console.log(summm);
}
export const total_payment = (sum) => {
    const total_payment = sum.map(item => item.quantity * item.price)
    let payment = 0
    for (let i = 0; i < total_payment.length; i++) {
        payment += total_payment[i]
    }
    return payment
}

const initialState = {
    selectedItems: [],
    itemsCounter: 0,
    checkout: false
}

const cartReducer = (state, action) => {
    console.log(state)

    switch (action.type) {

        case "add_item":
            state.selectedItems.push({ ...action.payload, quantity: 1 })
            state.itemsCounter++
            return {
                ...state,
                selectedItems: [...state.selectedItems],
                itemsCounter: state.itemsCounter
            }

        // if (!state.selectedItems.find(item => item.id === action.payload.id)) {

        //     state.selectedItems.push({
        //         ...action.payload,
        //         quantity: 1
        //     })
        // }
        // return {
        //     ...state,
        //     selectedItems: [...state.selectedItems]
        // }

        case "remove_item":
            const newSelectedItems = state.selectedItems.filter(item => item.id !== action.payload.id)
            state.itemsCounter--;
             console.log(newSelectedItems);
            return {
                ...state,
                selectedItems: [...newSelectedItems]
            }

        // case "remove_item":
        //     // state.selectedItems.find(item => item.id === action.payload.id)

        //     const index = state.selectedItems.findIndex(item => item.id === action.payload.id)
        //     state.selectedItems[index].shift()
        //     state.itemsCounter--

        //     return {
        //         ...state,
        //         selectedItems: [...state.selectedItems]
        //     }

        case "add":
            const add_index = state.selectedItems.findIndex(item => item.id === action.payload.id)
            state.selectedItems[add_index].quantity++;
            return {
                ...state,
            }
        case "min":
            state.itemsCounter++;
            const min_index = state.selectedItems.findIndex(item => item.id === action.payload.id)
            state.selectedItems[min_index].quantity--;
            return {
                ...state,
            }

        case "checkout":
            return {
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                checkout: true,
            }

        case "clear":
            return {
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                checkout: false,
            }

        default: return state
    }
}

export const CardContext = createContext()

const CardContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(cartReducer, initialState)

    return (
        <CardContext.Provider value={{ state, dispatch }} >
            {children}
        </CardContext.Provider>
    );
}

export default CardContextProvider;

