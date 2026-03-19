import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost } from '../store/postsSlice';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';

const PostForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        if (name && description) {
            dispatch(addNewPost({ name, description }));
            setName('');
            setDescription('');
            setValidated(false);
        }
    };

    return (
        <div className="mt-5 pt-3">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="align-items-end g-3">
                    <Col md={4}>
                        <Form.Group controlId="formName">
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border-dark"
                                style={{ borderWidth: '2px' }}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formDescription">
                            <Form.Control
                                required
                                type="text"
                                placeholder="Descripción"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border-dark"
                                style={{ borderWidth: '2px' }}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={2}>
                        <Button 
                            variant="outline-dark" 
                            type="submit" 
                            className="w-100" 
                            style={{ borderWidth: '2px', fontWeight: 'bold' }}
                        >
                            Crear
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default PostForm;
