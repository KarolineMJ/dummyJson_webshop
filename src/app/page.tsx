'use client'
import { getURL } from '@/app/utils'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [productList, setProductList] = useState([])
  useEffect(() => {
    const getAllProductList = async () => {
      const response = await axios.get(getURL())
      setProductList(response.data.products)
    }
    getAllProductList()
  }, [])

  return (
    <div>
      {productList.length > 0 &&
        productList.map(
          (
            product: {
              title: string
            },
            index,
          ) => {
            return <p key={index}>{product.title}</p>
          },
        )}
    </div>
  )
}
