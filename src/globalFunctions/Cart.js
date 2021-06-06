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
    // update cart items state
    const update = (product, cart, quantity, dispatch) => {
        // get items except the selected item
        const filProds = cart.items.filter((prod) => prod.id !== product.id)
        const dateNow = new Date()
        const month = dateNow.getMonth() + 1
        const date = dateNow.getDate()
        const year = dateNow.getFullYear()

        let newCartItems = []
        let newCount = 0

        if(cart.items.length > 0){
            // cart not empty, assign the filtered items then add the updated item
            newCartItems = [ ...filProds, { ...product, quantity, dateAdded: `${year}-${date}-${month}` } ]
            // add all items quantity
            const count = newCartItems.map(prod => prod.quantity)
            newCount = _.sum(count)
        }else{
            // cart is empty, add the selected item
            newCartItems = [ ...cart.items, { ...product, quantity, dateAdded: `${year}-${date}-${month}` } ]
            const count = newCartItems.map(prod => prod.quantity)
            newCount = _.sum(count)
        }
        // update cart items state
        dispatch(updateCart({ items: newCartItems, count: newCount }))
    }

    if(cart.items.length > 0){
        // cart not empty, fetch selected item from cart items
        const promise = new Promise((resolve) => {
            resolve(cart.items.filter((prod) => prod.id === product.id))
        })
    
        let result = await promise

        if(result.length > 0){
            // result not empty
            switch(actionType){
                case "addToCart":
                    // notify if selected item already on the cart
                    notification("warning", `${product.title} is already on the Cart. Go to Cart to add Quantity of this Product`)
                    break
                case "addQuantity":
                    // get difference of previous quantity and new quantity
                    const difference = quantity - result[0].quantity

                    if(difference === 0){
                        // notify if there is no difference
                        notification("warning", `You already have ${quantity > 1 ? `${quantity} items` : `${quantity} item`} of ${product.title} in the cart`)
                    }else{
                        // update cart and notify how many quantity added to the selected item 
                        update(product, cart, quantity, dispatch)
                        notification("info", `Added ${difference > 1 ? `${difference} items` : `${difference} item`} of ${product.title} in the cart`)
                    }
                    break
                case "addQuantityFromCart":
                    // update selected item dont show any notification
                    update(product, cart, quantity, dispatch)
                    break
                default:
                    // not a valid action type
                    console.log('Invalid Action')
                    break
            }
        }else{
            // item is not on the cart, add item to cart, update cart
            update(product, cart, quantity, dispatch)
            notification("info", `${product.title} added to Cart`)
        }

    }else{
        // cart is empty, add item to cart
        update(product, cart, quantity, dispatch)
        notification("info", `${product.title} added to Cart`)
    }
}

export const quantityCheck = (product, availStock, dispatch, cartItems, quantity, setQuantity, actionType) => {
    if(quantity > availStock || quantity === 0){
        // quantity input exceeds availStock, show warning notification
        notification("warning", `Only ${availStock} items are available to purchase`)
        // set quantity to availStock value
        setQuantity(availStock)
        return
    }else{
        // run addToCart function, validate item
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