import {
    Button,
    Col,
    Container, Form,
    FormControl,
    FormGroup,
    FormLabel,
    FormText,
    InputGroup,
    Row, Table
} from "react-bootstrap";
import {IoCloseOutline, IoImageOutline} from "react-icons/io5";
import {LinkContainer} from "react-router-bootstrap";
import {useEffect, useRef, useState} from "react";
import {handleUpload} from "../podo/events";
import {serviceCountries} from "../podo/utils";
import LoadingScreen from "../components/LoadingScreen";



export default function NewEvent() {

    const [prices, setPrices] = useState([]);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [count, setCount] = useState(null);
    const [poster,setPoster] = useState(null);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputFile = useRef(null)
    const [errorMessage, setErrorMessage] = useState('0');
    const service= serviceCountries();
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [currency, setCurrency] = useState('');
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [currencyIndex, setCurrencyIndex] = useState(0);
    const [image, setImage] = useState(null)


    useEffect(() => {
        setCountry(service.at(currencyIndex).name);
        setCurrency(service.at(currencyIndex).currencies)

    }, [currencyIndex, service])
    const pickPoster = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    const onChangeFile =(e) => {
        e.stopPropagation();
        e.preventDefault();
        let file = e.target.files[0];
        setImage(file);
        setPoster(URL.createObjectURL(file))
    }

    function showError(message) {
        if (show){
            console.log(`error: ${message} ${errorMessage}`);
        }

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

    async function upload(event) {
        event.preventDefault();
        event.stopPropagation();
        setLoading(true);
        let successObj = await handleUpload({name: eventName,
            location: location,
            category: category,
            currency: currency,
            date: date.toString(), description: description, image: image, country: country, ticketInfo: prices });
        setLoading(false)
        if (successObj.success) {
            setShow(true);
            setErrorMessage(successObj)
            // history('/events');
        } else {
            setShow(true);
            setErrorMessage(successObj);
        }
    }


   if (loading){
       return (<LoadingScreen/>)
   } else {
       return (<Container fluid>
           <Form onSubmit={upload}>
               <input className={'d-none'} type='file' id='file' ref={inputFile} onChange={onChangeFile}/>

               <div className={'d-flex justify-content-between pt-3'}>
                   <h4>Add Event</h4>
                   <span>
                <LinkContainer to={'/'}>
                    <Button className={'me-2'} variant={'outline-primary'}>Cancel</Button>
                </LinkContainer>
                <Button variant={'primary'} type={'submit'}>Add Event</Button>
            </span>
               </div>
               <Row>
                   <Col className={'verticalCenter'} lg={'6'}>
                       <Container onClick={pickPoster.bind(this)} className={(poster === null)? 'mt-3 rounded-4 glassEffect-Dark w-100 ar-square verticalCenter text-center':
                           'mt-3 rounded-4 w-100 ar-square verticalCenter text-center'}
                                  fluid style={(poster === null)?{}:  {
                           backgroundImage: `url("${poster}")`, backgroundPosition: 'center',
                           backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
                       }}>
                           <div className={'text-primary'} >
                               <IoImageOutline className={''} size={100}/>
                               <p><small className={'fw-light'}>{(poster === null)? 'Add Image': 'Change Image'}</small></p>
                           </div>
                       </Container>
                   </Col>
                   <Col sm={'12'} lg={'6'} className={'d-flex flex-column justify-content-between'}>
                       <Container fluid className={'p-3 mt-3 rounded-4 bg-body-tertiary h-100'}>
                           <h6>General</h6>
                           <FormGroup className={''}>
                               <FormLabel>
                                   Event Name
                               </FormLabel>
                               <FormControl required placeholder={'Event Name'} onChange={(e) => setEventName(e.target.value)}/>
                           </FormGroup>
                           <FormGroup className={'mt-3'}>
                               <FormLabel>
                                   Description
                               </FormLabel>
                               <FormControl as={'textarea'} rows={5} placeholder={'Description'} onChange={(e) => setDescription(e.target.value)}/>
                           </FormGroup>
                           <FormGroup className={'mt-3'}>
                               <FormLabel>Date</FormLabel>
                               <FormControl  required type={'datetime-local'} inputMode={'date'} onChange={(e) => setDate(e.target.value)}/>
                           </FormGroup>
                           <FormGroup className={'mt-3'}>
                               <FormLabel>Country</FormLabel>
                               <Form.Select value={currencyIndex} onChange={(e) => {setCurrencyIndex(e.target.value); console.log(e.target)}}>
                                   {service.map((_serve, index) => (<option value={index}>{_serve.name}</option>))}
                               </Form.Select>
                           </FormGroup>


                           <FormGroup className={'mt-3'}>
                               <FormLabel>Status</FormLabel>
                               <Form.Select value={status} onChange={(e) => {setStatus(e.target.value)}}>
                                   {statuses.map((_status) => (<option value={_status}>{_status}</option>))}
                               </Form.Select>
                           </FormGroup>
                           {(status === statuses.at(2))? (<FormGroup className={'mt-1'}>
                               <FormLabel>Release Date</FormLabel>
                               <FormControl inputMode={'date'} type={'datetime-local'} min={Date.now()}/>
                           </FormGroup>) : (<div/>)}
                       </Container>
                   </Col>

                   <Col sm={'12'} lg={'6'}>
                       <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                           <h6>Category</h6>
                           <FormGroup>
                               <FormControl required placeholder={'Category'} inputMode={'search'}
                                            enterKeyHint={'go'} onChange={(e) => setCategory(e.target.value)}/>
                               <FormText>Cant find the category? <small className={'text-primary'}> add new</small>
                               </FormText>
                           </FormGroup>
                       </Container>

                   </Col >
                   <Col sm={'12'} lg={'6'}>
                       <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                           <h6>Location</h6>
                           <FormGroup>
                               <FormControl required value={location} placeholder={'search Existing Venue'} inputMode={'search'}
                                            enterKeyHint={'go'} onChange={(e) => {setLocation(e.target.value)}}/>
                               <FormText>Cant find the place? <small className={'text-primary'}> add new</small>
                               </FormText>
                           </FormGroup>
                       </Container>
                   </Col>
                   <Col sm={'12'} lg={'6'}>
                       <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                           <h6>Add Price</h6>
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
                                   <InputGroup.Text>{currency}</InputGroup.Text>
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
                               <Button variant={'primary'} type={'button'} onClick={handleSubmit.bind(this)}>Add</Button>
                           </FormGroup>
                       </Container>


                   </Col>
                   <Col>
                       <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                           <h6>Pricing</h6>
                           <Table size={'sm'}  className={''} >
                               <thead>
                               <tr>
                                   <td><strong>Name</strong></td>
                                   <td><strong>Price</strong></td>
                                   <td><strong>Stock</strong></td>
                                   <td><strong>Remove</strong></td>
                               </tr>
                               </thead>
                               <tbody>
                               {prices.map((_price,index) => (<tr key={index}>
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


           </Form>
       </Container>)
   }
}