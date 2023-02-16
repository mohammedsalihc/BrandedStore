

export const addCart = (product) => {
    return {
        type: "ADDCART",
        payload: product

    }
}


export const deleteCart = (product) => {
    return {
        type: "DELCART",
        payload: product
    }
}