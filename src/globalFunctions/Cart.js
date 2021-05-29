import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css'
import { store as notif } from 'react-notifications-component'

import { updateCart } from '../redux/dataReducer'

export const addToCart = async (product, dispatch, cart, quantity, actionType) => {

    if(cart.length > 0){
        const promise = new Promise((resolve) => {
            resolve(cart.filter((prod) => prod.id === product.id))
        })
    
        let result = await promise
    
        if(result.length > 0){

            switch(actionType){
                case "addToCart":
                    notif.addNotification({
                        message: `${product.title} is already on the Cart. Go to Cart to add Quantity of this Product`,
                        type: "danger",
                        insert: "bottom-right",
                        container: "bottom-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 6000,
                            onScreen: true
                        }
                    })
                    
                    break
                case "addQuantity":
                    dispatch(updateCart({ ...product, quantity: quantity }))

                    console.log(product)
    
                    notif.addNotification({
                        message: `${product.title} added to Cart`,
                        type: "info",
                        insert: "bottom-right",
                        container: "bottom-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 4000,
                            onScreen: true
                        }
                    })

                    break
                default:
                    console.log('Invalid Action')
                    break
            }
        }else{
            dispatch(updateCart({ ...product, quantity: quantity }))
    
            notif.addNotification({
                message: `${product.title} added to Cart`,
                type: "info",
                insert: "bottom-right",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    onScreen: true
                }
            })
        }

    }else{
        dispatch(updateCart({ ...product, quantity: quantity }))
    
        notif.addNotification({
            message: `${product.title} added to Cart`,
            type: "info",
            insert: "bottom-right",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 4000,
                onScreen: true
            }
        })
    }
}