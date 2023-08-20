import {useEffect, useState} from "react";
import {apiFetch} from "../../assets/api/utils";
import ViewTableau from "../dashboards/Tableau/ViewTableau";
import ViewHtmlDashboard from "../dashboards/HTML/ViewHTMLDashboard";
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
                setReComp(<Placeholder/>);
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
