import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

export const Loading = () => {
    return (
        <Button variant="primary" disabled style={{
            top: '45%',
            left: '45%',
            marginRight: '-50%', position: 'absolute'
        }}>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </Button>
    )
}