import { ProductType } from '@/app/components/products/productList'
import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

export type CartContextType = {
  cartItems: {
    discountedTotal: number
    products: [ProductType]
    totalProducts: number
    totalQuantity: number
    userId: number
    id: number
    total: number
  }
  addToCart: (item: ProductType) => void
  removeFromCart: (item: ProductType, quantity?: number) => void
  getCartTotal: () => number
}

export const CartContext = createContext<CartContextType>(
  null as unknown as CartContextType,
)

const CART_ITEMS = 'cart_items'

export const CartProvider = ({ children }: { children: any }) => {
  const [cartItems, setCartItems] = useState(
    typeof window !== 'undefined'
      ? JSON.parse(window.localStorage.getItem(CART_ITEMS) || '[]')
      : '[]',
  )

  const addToCart = (item: ProductType) => {
    const isItemInCart = cartItems.products.find(
      (product: ProductType) => product.id === item.id,
    )

    if (isItemInCart) {
      setCartItems({
        ...cartItems,
        products: cartItems.products.map((product: ProductType) =>
          product.id === item.id
            ? {
                ...product,
                quantity: product.quantity + 1,
                total: product.total + item.price,
              }
            : { ...product },
        ),
      })
    } else {
      // Add new item to cartItem
      cartItems.products.push(item)

      setCartItems({
        ...cartItems,
        totalProducts: cartItems.totalProducts + 1,
        products: cartItems.products.map((product: ProductType) => ({
          ...product,
          total: product.price * (product.quantity || 1),
          quantity: product.quantity || 1,
        })),
      })
    }
  }

  const removeFromCart = (item: ProductType, removeQuantity?: number) => {
    // Check if item is in cart
    const isItemInCart = cartItems.products.find(
      (cartItem: ProductType) => cartItem.id === item.id,
    )

    if (
      isItemInCart.quantity === 1 ||
      removeQuantity === isItemInCart.quantity
    ) {
      setCartItems({
        ...cartItems,
        totalProducts: cartItems.totalProducts - 1,
        products: cartItems.products.filter(
          (cartItem: ProductType) => cartItem.id !== item.id,
        ),
      })
    } else {
      setCartItems({
        ...cartItems,
        products: cartItems.products.map((cartItem: ProductType) => {
          return cartItem.id === item.id
            ? {
                ...cartItem,
                total: cartItem.total - cartItem.price,
                quantity: cartItem.quantity - 1,
              }
            : cartItem
        }),
      })
    }
  }

  const getCartTotal = () => {
    return cartItems
      ? cartItems?.products?.reduce(
          (total: number, item: ProductType) =>
            Math.floor((total + item.price * item.quantity) * 100) / 100,
          0,
        )
      : 0
  }

  const getDefaultProductList = async () => {
    const response = await axios.get('https://dummyjson.com/carts/1')
    setCartItems(response.data)
  }

  // use this function if you want to reset products to default product list
  // getDefaultProductList()

  // get initial local storage or get default products to show the basket with products from the beginning
  useEffect(() => {
    const data = localStorage.getItem(CART_ITEMS)
    if (data) {
      setCartItems(JSON.parse(data))
    } else {
      getDefaultProductList()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_ITEMS, JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
