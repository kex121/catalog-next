import { useQuery } from '@tanstack/react-query'

import { Product } from '../types/product'

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products')
  if (!res.ok) throw new Error('Failed to fetch products')
  const data: Product[] = await res.json()
  
  const multipliedProducts: Product[] = []
  const timesToMultiply = 5
  
  for (let i = 1; i <= timesToMultiply; i++) {
    data.forEach((product) => {
      multipliedProducts.push({
        ...product,
        id: product.id + (i * 1000),
        title: `${product.title} (Вариант ${i})`,
      })
    })
  }
  
  return multipliedProducts
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  })
}
