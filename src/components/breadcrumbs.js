import {Breadcrumb} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {IoHomeOutline} from "react-icons/io5";


export default function Breadcrumbs() {
    const location = useLocation();
    const pathNames = location.pathname.split("/").filter((x) => x);

    return (
        <Breadcrumb >
            {location.pathname === "/" ? null : <LinkContainer to="/"><Breadcrumb.Item className={'p'}><IoHomeOutline/></Breadcrumb.Item></LinkContainer>}
            {pathNames.map((value, index) => {
                const last = index === pathNames.length - 1;
                const to = `/${pathNames.slice(0, index + 1).join("/")}`;
                if (last){
                    return (
                        <Breadcrumb.Item active key={to} className={'p'}>{value}</Breadcrumb.Item>
                    )
                } else {
                    return (
                        <LinkContainer key={index} to={to}><Breadcrumb.Item className={'p'}>{value}</Breadcrumb.Item></LinkContainer>

                    )
                }

            })}
        </Breadcrumb>
    );
};