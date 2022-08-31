import type { NextApiRequest, NextApiResponse } from 'next'

import { Product, User, Order } from '@/models';
import { db, seedDatabase } from '@/database'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No tiene acceso a la API' })
    }

    await db.connect()
    await User.deleteMany()
    await User.insertMany(seedDatabase.initialData.users)

    await Product.deleteMany()
    await Product.insertMany(seedDatabase.initialData.products)

    await Order.deleteMany()
    await db.disconnect()

    res.status(200).json({ message: 'Proceso realizado correctamente' })
}