import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
const Searchbox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form className="d-flex flex-row me-3" onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => { setKeyword(e.target.value) }}
                placeholder='Buscar Productos'

            ></Form.Control>
            <Button type='submit' variant='outline-success' className='ms-2'>Buscar</Button>
        </Form>
    )
}

export default Searchbox
