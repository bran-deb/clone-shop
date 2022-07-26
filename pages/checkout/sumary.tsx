import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link'

import { Card, Grid, CardContent, Typography, Divider, Box, Button, Link, Chip } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';
import { CartList, OrderSumary } from '../../components/cart';
// import { countries } from '../../utilities';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';



const Sumary = () => {

    const router = useRouter()
    const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext)
    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');



    useEffect(() => {
        if (!Cookies.get('firstName')) {
            router.push('/checkout/address')
        }
    }, [router])

    const onCreateOrder = async () => {
        setIsPosting(true)
        const { hasError, message } = await createOrder()

        if (hasError) {
            setIsPosting(false)
            setErrorMessage(message)
            return
        }
        router.replace(`/orders/${message}`)

    }

    if (!shippingAddress) return <></>;

    const { firstName, address, city, country, lastName, phone, zip, address2 } = shippingAddress

    return (
        <ShopLayout title='Resumen de la orden' pageDescription='Resumen de la orden'>
            <Typography variant="h1" component='h1'>Resumen de la orden</Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>

                <Grid item xs={12} sm={5} >
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen ({numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'})</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between' >
                                <Typography variant='subtitle1'>Direccion de entrega</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>{firstName} {lastName}</Typography>
                            <Typography>{address}{address2 ? `, ${address2}` : ''}</Typography>
                            <Typography>{city},{zip}</Typography>
                            {/* <Typography>{countries.find(c => c.code === country)?.name}</Typography> */}
                            <Typography>{country}</Typography>
                            <Typography>{phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSumary />

                            <Box
                                sx={{ mt: 3 }}
                                display="flex"
                                flexDirection="column">
                                {/* <NextLink href='/#' passHref> */}
                                {/* <Link> */}
                                <Button
                                    color='secondary'
                                    className='circular-btn'
                                    fullWidth
                                    onClick={onCreateOrder}
                                    disabled={isPosting}
                                >
                                    Confirmar Orden
                                </Button>
                                <Chip
                                    color='error'
                                    label={errorMessage}
                                    sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                                />

                                {/* </Link> */}
                                {/* </NextLink> */}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
    )
}

export default Sumary
