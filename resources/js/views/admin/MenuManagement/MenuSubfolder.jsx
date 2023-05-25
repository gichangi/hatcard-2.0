import Grid from "@mui/material/Grid";
import {Col, Form, Row} from "react-bootstrap";
import React from "./index";

function MenuSubfolder(props) {
    return (
        <Grid item xs={6}>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={3}>
                        Title
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control type="email" placeholder="Email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={3}>
                        Description
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" rows="3" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={3}>
                        Status
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Check type="radio" label="Active" name="formHorizontalRadios" id="formHorizontalRadios1" />
                        <Form.Check type="radio" label="Inactive" name="formHorizontalRadios" id="formHorizontalRadios2" />
                    </Col>
                </Form.Group>
            </Form>
        </Grid>
    );
}

export default MenuSubfolder;
