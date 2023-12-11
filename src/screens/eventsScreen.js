import {Button, Col, Container, Dropdown, DropdownButton, Row} from "react-bootstrap";
import Poster from "../components/poster";
import React, {useEffect, useState} from "react";
import {Events} from "../podo/events";
import {LinkContainer} from "react-router-bootstrap";


export default function EventsScreen() {
    const [events, setEvents] = useState(Events);
    useEffect(() => {
        setEvents(Events())

    }, [])
    return (<Container fluid className={'bg-body py-3'}>
        <div className={'d-flex flex-row justify-content-between mb-3'}>
            <h4 className={'text-primary'}>Events</h4>
            <div className={'d-flex'}>
            <DropdownButton title={'Sort'} variant={'outline-primary'} >
                <Dropdown.Item>Name</Dropdown.Item>
            </DropdownButton>
                <LinkContainer to={'/events/new'}>
                    <Button variant={'outline-primary'} className={'ms-2'}>Create New Event</Button>
                </LinkContainer>
            </div>
        </div>
        <Row className={'gy-3'}>
            {events.map((event, index) => (<Col key={index}  md={'4'}><Poster eventDetails={event}/></Col>))}
        </Row>
    </Container>)
}