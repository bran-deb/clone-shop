import type { NextPage } from 'next'

import { Typography } from '@mui/material'

// import { initialData } from '../database/products'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'

import useSWR from 'swr'
const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())


const Home: NextPage = () => {

  const { data, error } = useSWR('/api/products', fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  console.log(data);

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos'}>
      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" component='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

      <ProductList products={data} />
      {/* <ProductList products={initialData.products as any} /> */}
    </ShopLayout>
  )
}


export default Home
