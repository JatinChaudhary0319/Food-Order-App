import { useReducer } from "react";
import { createContext } from "react";

const CartContext = createContext({
    items : [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

function cartReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items];

        if(existingCartItemIndex > -1){
            const existingItem = state.items[existingCartItemIndex];

            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            }

            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems.push({...action.item, quantity: 1});
        }

        return { ...state, items: updatedItems };
    }

    if(action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const updatedItems = [...state.items];

        const existingItem = state.items[existingCartItemIndex];

        if(existingItem.quantity === 1){
            updatedItems.splice(existingCartItemIndex, 1);
        }else{
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1,
            }
            
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems };
    }

    if(action.type === 'CLEAR_CART'){
        return {...state, items: []};
    }

    return state;
}

export function CartContextProvider({children}) {
    const [cart, dispatchCartAction ] = useReducer(cartReducer, { items: [] });

    const cartContext = {
        items : cart.items,
        addItem: addItem,
        removeItem: removeItem,
        clearCart: clearCart
    };

    function addItem(item) {
        dispatchCartAction({type: 'ADD_ITEM', item: item});
    }

    function removeItem(id) {
        dispatchCartAction({type: 'REMOVE_ITEM', id: id});
    }

    function clearCart() {
        dispatchCartAction({type: 'CLEAR_CART'});
    }

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;