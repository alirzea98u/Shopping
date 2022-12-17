const shorten = title => {

    return title.split(" ")[0] + " " + title.split(" ")[1]
}

const isInCart = (state, id) => {
    const result = !!state.selectedItems.find(item => item.id === id)
    return result
}


// bishtr az 2ta

const quantityCount = (state, id) => {
    const index = state.selectedItems.findIndex(item => item.id === id)
    const quantity = state.selectedItems[index].quantity
    return quantity
}

export { shorten, isInCart, quantityCount }