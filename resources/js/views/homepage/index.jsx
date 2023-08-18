import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import Card from '../../components/Card/MainCard';
import {useEffect, useState} from "react";
import {apiFetch} from "../../assets/api/utils";
import ViewTableau from "../dashboards/Tableau/ViewTableau";
import ViewHtmlDashboard from "../dashboards/HTML/ViewHTMLDashboard";
import AdminLayout from '../../layouts/AdminLayout';
import Breadcrumb from "../../layouts/AdminLayout/Breadcrumb";
import Placeholder from "../../components/Placeholder";


const Index = (props) => {
    const [reComp, setReComp] = useState(<Placeholder/>)
    useEffect(()=>{
        apiFetch('get',{},`/api/bi-dashboards/homepage`,{}).then(res=>{
            pageSwitch(res.data.dashboard.dashboard_type,res.data.dashboard.id,res.data.dashboard)
        })
    },[])

    const pageSwitch = (category,id,dashboard) =>{
        switch (category) {
            case 'tableau_servers':
                setReComp(<ViewTableau id={id}/>);
                break;
            case 'tableau_publics':
                setReComp(<ViewTableau id={id}/>);
                break;
            case 'html_dashboards':
                setReComp(<ViewHtmlDashboard id={id} details={dashboard}/>);
                break;
            default:
                setReComp(<Placeholder/>);
        }
    }

    return (
        <div>
            <Breadcrumb />
            {reComp}
        </div>
    );
};

/*

const mapStateToProps = state => {
    return {
        laravel: state
    };
};
export default connect(mapStateToProps)(SamplePage);
*/


export default Index;
