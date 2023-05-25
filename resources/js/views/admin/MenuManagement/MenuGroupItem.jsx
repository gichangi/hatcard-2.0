import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import {useState} from "react";
import Grid from "@mui/material/Grid";
import React from ".";

function MenuGroupItem(props) {
    const [defaultSwitch, setDefaultSwitch] = useState(true);
    const toggleHandler = () => {
        setDefaultSwitch((prevState) => !prevState);
    };
    return (
            <Grid item xs={6}>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={3}>
                            Group Title
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="email" placeholder="Email" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={3}>
                            Group Description
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={3}>
                            Status
                        </Form.Label>
                        <Col sm={9}>
                            <div className="switch d-inline m-r-10">
                                <Form.Control type="checkbox" name="checkbox-fill-1" id="checkbox-fill-1" defaultChecked={true} />
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <div className="switch d-inline m-r-10">
                            <Form.Control type="checkbox" id="checked-default" defaultChecked={defaultSwitch} onChange={() => toggleHandler} />
                            <Form.Label htmlFor="checked-default" className="cr" />
                        </div>
                        <Form.Label>Checked</Form.Label>
                    </Form.Group>
                </Form>
            </Grid>

    );
}

export default MenuGroupItem;
