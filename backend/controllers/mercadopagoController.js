import asyncHandler from 'express-async-handler'
import mercadopago from 'mercadopago'

mercadopago.configure({
    access_token: 'TEST-8423361251720215-022415-a5c8f7230ad2645c1fe1463ad1342d8a-209738547'
});

const mercadopagoPay = asyncHandler(async (req, res) => {

    const preference = {
        items: [
            {
                title: 'Beat',
                quantity: 1,
                currency_id: 'ARS',
                unit_price: 10.5
            }
        ]
    };

    const order = await mercadopago.preferences.create(preference)

    if (order) {
        res.json(order)
    }
    else {
        res.status(404)
        throw new Error('Order not Found')
    }
})

export { mercadopagoPay }