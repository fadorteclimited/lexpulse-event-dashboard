import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormText, Row} from "react-bootstrap";
import {IoImageOutline} from "react-icons/io5";
import {LinkContainer} from "react-router-bootstrap";

export default function NewEvent() {
    let Event = {};
    return (<Container fluid>
        <div className={'d-flex justify-content-between pt-3'}>
            <h4>Add Event</h4>
            <span >
                <LinkContainer to={'/'}>
                    <Button className={'me-2'} variant={'outline-primary'}>Cancel</Button>
                </LinkContainer>
                <Button variant={'primary'}>Add Event</Button>
            </span>
        </div>
        <Row>
            <Col lg={'6'}>
                <Container className={'py-3 mt-2 rounded-4 glassEffect-Dark w-100 ar-square verticalCenter text-center'} fluid>
                    <div>
                        <IoImageOutline size={100}/>
                        <p><small className={'fw-light'}>Add Image</small> </p>
                    </div>
                </Container>
            </Col>
            <Col>
                <Container fluid className={'p-3 mt-2 rounded-4 bg-body-tertiary'}>
                    <Form>
                        <FormGroup>
                            <FormLabel>
                                Event Name
                            </FormLabel>
                            <FormControl placeholder={'Event Name'}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Description
                            </FormLabel>
                            <FormControl as={'textarea'} rows={5} placeholder={'Description'}/>
                        </FormGroup>
                        <FormGroup >
                            <FormLabel>Date</FormLabel>
                            <FormControl type={'datetime-local'} inputMode={'date'}/>
                        </FormGroup>

                    </Form>
                </Container>
                <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                    <h6>Venue</h6>
                    <Form>
                        <FormGroup>
                            <FormControl placeholder={'search Existing Venue'} inputMode={'search'} enterKeyHint={'go'}/>
                            <FormText>Cant find the place? <small className={'text-primary'}> add new</small> </FormText>
                        </FormGroup>
                    </Form>
                </Container>
            </Col>
        </Row>
    </Container> )
}