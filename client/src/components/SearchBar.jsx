import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterText, selectFilterText } from '../store/postsSlice';
import { Form, Button, Row, Col } from 'react-bootstrap';

const SearchBar = () => {
    const dispatch = useDispatch();
    const filterText = useSelector(selectFilterText);

    return (
        <div className="mb-4">
            <Row className="align-items-center">
                <Col>
                    <h5 className="mb-3">Filtro de Nombre</h5>
                    <Form.Control
                        type="text"
                        placeholder="Escriba aquí..."
                        value={filterText}
                        onChange={(e) => dispatch(setFilterText(e.target.value))}
                        className="bg-white border-dark"
                        style={{ borderWidth: '2px' }}
                    />
                </Col>
                <Col xs="auto" className="align-self-end">
                    <Button variant="outline-dark" style={{ borderWidth: '2px', fontWeight: 'bold', marginTop: '32px' }}>
                        Buscar
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default SearchBar;
