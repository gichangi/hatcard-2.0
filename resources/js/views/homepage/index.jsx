import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import Card from '../../components/Card/MainCard';
import {useEffect, useState} from "react";
import {apiFetch} from "../../assets/api/utils";
import ViewTableau from "../dashboards/Tableau/ViewTableau";
import ViewHtmlDashboard from "../dashboards/HTML/ViewHTMLDashboard";

const Index = (props) => {
    const [reComp, setReComp] = useState(<>Empty</>)
    useEffect(()=>{
        apiFetch('get',{},`/api/bi-dashboards/homepage`,{}).then(res=>{
            pageSwitch(res.data.dashboard.dashboard_type,res.data.dashboard.id,res.data.dashboard)
        })
    },[])

    const pageSwitch = (category,id,dashboard) =>{
        switch (category) {
            case 'tableau_server':
                setReComp(<ViewTableau id={id}/>);
                break;
            case 'tableau_public':
                setReComp(<ViewTableau id={id}/>);
                break;
            case 'html_dashboard':
                setReComp(<ViewHtmlDashboard id={id} details={dashboard}/>);
                break;
            default:
                setReComp(<>Empty</>);
        }
    }

    return (
        <div>
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
