import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'

import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    //If there is data on local storage it will be loaded
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return <FormContainer>
        <CheckOutSteps step1 step2 />
        <h1>Envio</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Address'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter city'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Codigo Postal</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter postal code'
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Pais</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Country'
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}></Form.Control>
            </Form.Group>

            <Button className="mt-3" type='submit' variant='primary'>
                Continuar
            </Button>
        </Form>
    </FormContainer>
}

export default ShippingScreen
