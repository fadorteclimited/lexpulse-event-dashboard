import {
    Button,
    Col,
    Container, Dropdown, DropdownButton,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    FormText,
    InputGroup,
    Modal,
    Row, Table
} from "react-bootstrap";
import {IoCloseOutline, IoImageOutline} from "react-icons/io5";
import {LinkContainer} from "react-router-bootstrap";
import {useRef, useState} from "react";

export function PricingModal({show}) {
    let prices = [];
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');


    function handleSubmit() {
        prices.push({
            name: name, price: price
        })
        setName('');
        setPrice('');
    }

    return (<Modal show={show}>
        <Modal.Header closeVariant={'light'} closeButton>
            <h5>Add Pricing</h5>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row>
                    <Col>
                        <Table size={'sm'}>
                            <thead>
                            <tr>
                                <td>Name</td>
                                <td>Price</td>
                            </tr>
                            </thead>
                            <tbody>
                            {prices.map((_price) => (<tr>
                                <td>{_price.name}</td>
                                <td>{_price.price}</td>
                            </tr>))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <Container className={'p-3 rounded-3'}>
                            <Form>
                                <FormGroup>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl placeholder={'V.I.P, stage, reg'}
                                                 onChange={(_name) => setName(_name.value)}/>
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>Price</FormLabel>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control inputMode={'numeric'} type={'number'}
                                                      aria-label="Amount (to the nearest dollar)"
                                                      onChange={(_price) => setPrice(_price.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className={'d-flex'}>
                                    <Button type={'submit'} variant={'primary'}>Add</Button>
                                </FormGroup>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Modal.Body>
    </Modal>)
}

export default function NewEvent() {
    const [show, setShow] = useState(false);
    const [prices, setPrices] = useState([]);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [count, setCount] = useState(null);
    const [poster,setPoster] = useState(null);
    const inputFile = useRef(null)


    const pickPoster = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    const onChangeFile =(e) => {
        e.stopPropagation();
        e.preventDefault();
        let file = e.target.files[0];
        console.log(URL.createObjectURL(file))
        setPoster(URL.createObjectURL(file))
    }

    function showError(message) {
        console.log(`error: ${message}`)
    }
    function handleSubmit() {
        switch (null) {
            case name:
                showError('')
                break;
            case price:
                showError('');
                break;
            case count:
                showError('');
                break;
            default:
                let _prices = prices;
                console.log({
                    name: name, price: price, count: count
                })
                _prices.push({
                    name: name, price: price, count:count
                })
                setPrices(_prices)
                setName(null);
                setPrice(null);
                setCount(null)
                break;
        }
    }

    const [status, setStatus] = useState('');
    let statuses = [
        'Published', 'Draft', 'Pre-Release'
    ];
    let Event = {};
    return (<Container fluid>
        <input className={'d-none'} type='file' id='file' ref={inputFile} onChange={onChangeFile}/>

        <div className={'d-flex justify-content-between pt-3'}>
            <h4>Add Event</h4>
            <span>
                <LinkContainer to={'/'}>
                    <Button className={'me-2'} variant={'outline-primary'}>Cancel</Button>
                </LinkContainer>
                <Button variant={'primary'}  onClick={() => console.log(poster)}>Add Event</Button>
            </span>
        </div>
        <Row>
            <Col lg={'6'}>
                <Container onClick={pickPoster.bind(this)} className={(poster === null)? 'py-3 mt-2 rounded-4 glassEffect-Dark w-100 ar-square verticalCenter text-center':
                    'py-3  mt-2 rounded-4 w-100 ar-square verticalCenter text-center'}
                           fluid style={(poster === null)?{}: {
                               backgroundImage: `url("${poster}")`, backgroundPosition: 'center',
                    backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
                }}>
                    <div className={'text-primary'} >
                        <IoImageOutline className={''} size={100}/>
                        <p><small className={'fw-light'}>{(poster === null)? 'Add Image': 'Change Image'}</small></p>
                    </div>
                </Container>
            </Col>
            <Col sm={'12'} lg={'6'} className={'d-flex flex-column justify-content-around'}>
                <Container fluid className={'p-3 mt-2 rounded-4 bg-body-tertiary'}>
                    <h6>General</h6>
                    <Form>
                        <FormGroup className={''}>
                            <FormLabel>
                                Event Name
                            </FormLabel>
                            <FormControl placeholder={'Event Name'}/>
                        </FormGroup>
                        <FormGroup className={'mt-3'}>
                            <FormLabel>
                                Description
                            </FormLabel>
                            <FormControl as={'textarea'} rows={5} placeholder={'Description'}/>
                        </FormGroup>
                        <FormGroup className={'mt-3'}>
                            <FormLabel>Date</FormLabel>
                            <FormControl type={'datetime-local'} inputMode={'date'}/>
                        </FormGroup>

                    </Form>
                </Container>

                <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-2'}>
                    <h6>Status</h6>
                    <Form>
                        <FormGroup className={'mt-3'}>
                            <Form.Select value={status} onChange={(e) => {setStatus(e.target.value)}}>
                                {statuses.map((_status) => (<option value={_status}>{_status}</option>))}
                            </Form.Select>

                        </FormGroup>
                        {(status === statuses.at(2))? (<FormGroup className={'mt-1'}>
                            <FormLabel>Release Date</FormLabel>
                            <FormControl inputMode={'date'} type={'datetime-local'} min={Date.now()}/>
                        </FormGroup>) : (<div/>)}
                    </Form>
                </Container>
            </Col>

            <Col sm={'12'} lg={'6'}>
                <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                    <h6>Genre</h6>
                    <Form>
                        <FormGroup>
                            <FormControl placeholder={'Pick Genre'} inputMode={'search'}
                                         enterKeyHint={'go'}/>
                            <FormText>Cant find the category? <small className={'text-primary'}> add new</small>
                            </FormText>
                        </FormGroup>
                    </Form>
                </Container>

            </Col >
            <Col sm={'12'} lg={'6'}>
                <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                    <h6>Venue</h6>
                    <Form>
                        <FormGroup>
                            <FormControl placeholder={'search Existing Venue'} inputMode={'search'}
                                         enterKeyHint={'go'}/>
                            <FormText>Cant find the place? <small className={'text-primary'}> add new</small>
                            </FormText>
                        </FormGroup>
                    </Form>
                </Container>
            </Col>
            <Col sm={'12'} lg={'6'}>
                <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                    <h6>Add Price</h6>
                    <Form>
                        <FormGroup>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl value={name} placeholder={'V.I.P, stage, reg'}
                                         onChange={(_name) => setName(_name.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Price</FormLabel>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control value={price} inputMode={'numeric'} type={'number'} step=".01" min={0}
                                              aria-label="Amount (to the nearest dollar)"
                                              onChange={(_price) => setPrice(_price.target.value)}/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Stock</FormLabel>
                            <InputGroup className="mb-3">
                                <Form.Control value={count} inputMode={'numeric'} type={'number'} step="1" min={0}
                                              aria-label="Tickets Available"
                                              onChange={(e) => setCount(e.target.value)}/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className={'d-flex'}>
                            <Button variant={'primary'} onClick={handleSubmit.bind(this)}>Add</Button>
                        </FormGroup>
                    </Form>
                </Container>


            </Col>
            <Col>
                <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                    <h6>Pricing</h6>
                    <Table size={'sm'}  className={''} >
                        <thead>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Stock</td>
                            <td>Remove</td>
                        </tr>
                        </thead>
                        <tbody>
                        {prices.map((_price) => (<tr>
                            <td>{_price.name}</td>
                            <td>{_price.price}</td>
                            <td>{_price.count}</td>
                            <td className={'text-danger'}><IoCloseOutline size={'20'}/></td>
                        </tr>))}
                        </tbody>
                    </Table>
                </Container>
            </Col>
        </Row>



    </Container>)
}