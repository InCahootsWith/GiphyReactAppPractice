import React, {useState} from "react";
import './Header.scss'

// bootstrap styling
import Navbar from 'react-bootstrap/Navbar'
import Col from 'react-bootstrap/Col'
import InputGroup from "react-bootstrap/InputGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button'

//const variables
const Header = (props) =>   {

    //slows the request down so an API call isn't made for every letter typed but rather once the user stops
    // typing
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            const context = this;
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args);
            }, wait);
        };
    }

    // sets the prop that's a hook to start the search
    const callSearchFunction = (e) => {
        props.search(e);
    }

    //caching it and applying wait
    const debounceOnChange = React.useCallback(debounce(callSearchFunction, 400), []);
    

    return(
        <Navbar className="shadow-lg" fixed="top" bg="light" variant="light">
            <Col xs={12} lg={{ span: 6, offset: 3 }}>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        aria-describedby="basic-addon1"
                        onChange={(e) => debounceOnChange(e.target.value)}
                        placeholder="type anything to start searching..."
                    />
                </InputGroup>
            </Col>
        </Navbar>
    )

}

export default  Header;
