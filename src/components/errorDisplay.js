import {Modal} from "react-bootstrap";


export default function ErrorDisplay({title, message, show}){
    return (<Modal show={show} className={'panel-warning'} >
        <Modal.Header className={'panel-heading'} closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
    </Modal>)
}