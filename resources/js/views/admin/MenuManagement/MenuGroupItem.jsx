import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";

function MenuGroupItem(props) {
    const [defaultSwitch, setDefaultSwitch] = useState(true);
    const toggleHandler = () => {
        setDefaultSwitch((prevState) => !prevState);
    };
    useEffect(()=>{
        console.log("groups")
    },[])
    return (
            <Grid item xs={6}>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={3}>
                            Title
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" placeholder="Title" />
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
                            <div className="switch d-inline m-r-10">
                                <Form.Control type="checkbox" id="checked-default" defaultChecked={defaultSwitch} onChange={() => toggleHandler} />
                                <Form.Label htmlFor="checked-default" className="cr" />
                            </div>
                        </Col>
                    </Form.Group>
                </Form>
            </Grid>

    );
}

export default MenuGroupItem;
