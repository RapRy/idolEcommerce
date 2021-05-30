import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css'
import { store as notif } from 'react-notifications-component'

import { updateCart } from '../redux/dataReducer'

export const addToCart = async (product, dispatch, cart, quantity, actionType) => {

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

    if(cart.length > 0){
        const promise = new Promise((resolve) => {
            resolve(cart.filter((prod) => prod.id === product.id))
        })
    
        let result = await promise
    
        if(result.length > 0){

            switch(actionType){
                case "addToCart":
                    notification("danger", `${product.title} is already on the Cart. Go to Cart to add Quantity of this Product`)
                    break
                case "addQuantity":
                    const difference = quantity - result[0].quantity

                    if(difference === 0){
                        notification("danger", `You already have ${quantity > 1 ? `${quantity} items` : `${quantity} item`} of ${product.title} in the cart`)
                    }else{
                        dispatch(updateCart({ ...product, quantity: quantity }))
                        notification("info", `Added ${difference > 1 ? `${difference} items` : `${difference} item`} of ${product.title} in the cart`)
                    }
                    break
                default:
                    console.log('Invalid Action')
                    break
            }
        }else{
            dispatch(updateCart({ ...product, quantity: quantity }))

            notification("info", `${product.title} added to Cart`)
        }

    }else{
        dispatch(updateCart({ ...product, quantity: quantity }))

        notification("info", `${product.title} added to Cart`)
    }
}