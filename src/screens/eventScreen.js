import {Container} from "react-bootstrap";
import {useParams} from "react-router";
import {useState} from "react";


export default function EventScreen() {
    let {id} = useParams();
    const [details,setDetails] = useState();
    return (<Container fluid>
        <h3>{id}</h3>
    </Container> );
}