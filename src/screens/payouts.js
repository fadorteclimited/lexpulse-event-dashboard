import {Button, Col, Container, Row} from "react-bootstrap";
import {faker} from "@faker-js/faker";
import {getRandomInt} from "../podo/utils";

export default function Payouts() {
    let calcBal = getRandomInt(20000,800);
    let address = faker.location;
    let payoutModel = {
        balance: faker.commerce.price({min: calcBal, max:30000,symbol:'$'}),
        availableBalance: faker.commerce.price({min: 800, max:calcBal,symbol:'$',}),
        account_num: faker.finance.accountNumber(),
        account_name: faker.finance.accountName(),
        bic: faker.finance.bic({includeBranchCode: true}),
        address: {
            line1: address.street(),
            line2: address.secondaryAddress(),
            district: address.state(),
            City: address.city(),
            Country: address.country(),
        },

    }

    return (<Container fluid className={'py-3'}>
        <Row>
            <Col>
                <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                    <div className={'d-flex flex-row mb-2'}>
                        <h5 className={'text-primary'}>Bank Details</h5>
                        <div className={'ms-auto'}>
                            <Button variant={'outline-primary'} >Edit</Button>
                        </div>
                    </div>
                    <span className={'d-flex flex-row justify-content-between'}><small
                        className={'fw-bold'}>Account Name: </small>{payoutModel.account_name}</span>
                    <span className={'d-flex flex-row justify-content-between'}><small
                        className={'fw-bold'}>Account Number: </small>{payoutModel.account_num}</span>
                    <span className={'d-flex flex-row justify-content-between'}><small
                        className={'fw-bold'}>BIC: </small>{payoutModel.bic}</span>
                    <h6 className={'mt-3 text-primary'}>Bank Address</h6>
                    <span className={'d-flex flex-row justify-content-between'}><small
                        className={'fw-bold'}>Account Number: </small>{payoutModel.address.line1}</span>
                    <span className={'d-flex flex-row justify-content-between'}><small
                        className={'fw-bold'}>Address Line 2: </small>{payoutModel.address.line2}</span>
                    <span className={'d-flex flex-row justify-content-between'}><small
                        className={'fw-bold'}>District: </small>{payoutModel.address.district}</span>
                    <span className={'d-flex flex-row justify-content-between'}><small
                        className={'fw-bold'}>City: </small>{payoutModel.address.city}</span>
                    <span className={'d-flex flex-row justify-content-between'}><small
                        className={'fw-bold'}>Country: </small>{payoutModel.address.Country}</span>
                </Container>


            </Col>
            <Col md={'4'}>
                <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                    <h5 className={'text-primary'}>Your Balance</h5>
                    <h6>  <small className="text-body-secondary fw-bold ff-montserrat">{payoutModel.balance}</small>
                    </h6>
                    <h5 className={'text-primary'}>Available Balance </h5>
                    <h6>  <small className="text-body-secondary fw-bold ff-montserrat">{payoutModel.availableBalance}</small>
                    </h6>
                    <Button variant={'primary'}>Withdraw</Button>
                  </Container>
            </Col>
        </Row>
        <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3 text-center'}>
            <h5 className={'text-primary'}>Transactions</h5>
        </Container>
    </Container>)
}