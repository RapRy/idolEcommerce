import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css'
import { store as notif } from 'react-notifications-component'

import { updateCart, removeItem, removeAll } from '../redux/dataReducer'
import _ from 'lodash'

const notification = (messageType, message) => {
    notif.addNotification({
        message: message,
        type: messageType,
        insert: "bottom-right",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 6000,
            onScreen: true
        }
    })
}

export const addToCart = async (product, dispatch, cart, quantity, actionType) => {

    const update = (product, cart, quantity, dispatch) => {
        const filProds = cart.items.filter((prod) => prod.id !== product.id)
        const dateNow = new Date()
        const month = dateNow.getMonth() + 1
        const date = dateNow.getDate()
        const year = dateNow.getFullYear()

        let newCartItems = []
        let newCount = 0

        if(cart.items.length > 0){
            newCartItems = [ ...filProds, { ...product, quantity, dateAdded: `${year}-${date}-${month}` } ]
            const count = newCartItems.map(prod => prod.quantity)
            newCount = _.sum(count)
        }else{
            newCartItems = [ ...cart.items, { ...product, quantity, dateAdded: `${year}-${date}-${month}` } ]
            const count = newCartItems.map(prod => prod.quantity)
            newCount = _.sum(count)
        }
        
        dispatch(updateCart({ items: newCartItems, count: newCount }))
    }

    if(cart.items.length > 0){
        const promise = new Promise((resolve) => {
            resolve(cart.items.filter((prod) => prod.id === product.id))
        })
    
        let result = await promise

        if(result.length > 0){

            switch(actionType){
                case "addToCart":
                    notification("warning", `${product.title} is already on the Cart. Go to Cart to add Quantity of this Product`)
                    break
                case "addQuantity":
                    const difference = quantity - result[0].quantity

                    if(difference === 0){
                        notification("warning", `You already have ${quantity > 1 ? `${quantity} items` : `${quantity} item`} of ${product.title} in the cart`)
                    }else{
                        update(product, cart, quantity, dispatch)
                        notification("info", `Added ${difference > 1 ? `${difference} items` : `${difference} item`} of ${product.title} in the cart`)
                    }
                    break
                case "addQuantityFromCart":
                    update(product, cart, quantity, dispatch)
                    break
                default:
                    console.log('Invalid Action')
                    break
            }
        }else{
            update(product, cart, quantity, dispatch)
            notification("info", `${product.title} added to Cart`)
        }

    }else{
        update(product, cart, quantity, dispatch)
        notification("info", `${product.title} added to Cart`)
    }
}

export const quantityCheck = (product, availStock, dispatch, cartItems, quantity, setQuantity, actionType) => {
    if(quantity > availStock || quantity === 0){
        notification("warning", `Only ${availStock} items are available to purchase`)
        setQuantity(availStock)
        return
    }else{
        addToCart(product, dispatch, cartItems, quantity, actionType)
    }
}

export const removeItemFromCart = (id, title, cart, dispatch) => {

    const newCart = cart.items.filter((prod) => prod.id !== id)

    const quantity = newCart.map(prod => prod.quantity)

    dispatch(removeItem({ items: newCart, count: _.sum(quantity) }))

    notification("danger", `${title} removed from the Cart`)
}

export const removeAllFromCart = (dispatch) => dispatch(removeAll()) 