import {useEffect,useState} from "react";
import {useLocation} from "react-router-dom";
import {apiFetch} from "../../assets/api/utils";
import PlatformAdd from "../admin/BI-Platforms/PlatformAdd";
import PlatformList from "../admin/BI-Platforms/PlatformList";
import TableauServerConfig from "../admin/BI-Platforms/Tableau/TableauServerConfig";
import TableauOnlineConfig from "../admin/BI-Platforms/Tableau/TableauOnlineConfig";
import ViewTableau from "./Tableau/ViewTableau";
import ViewHtmlDashboard from "./HTML/ViewHTMLDashboard";

function Index(props) {
    let { state } = useLocation();
    const [reComp, setReComp] = useState(<>Empty</>)
    const [currentDashboard, setCurrentDashboard] = useState(null)
    useEffect(()=>{
        apiFetch('get',{},`/api/bi-dashboards/find/${state.id}`,{}).then(res=>{
            console.log("res.data.dashboard")
            console.log(res.data.dashboard)
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
}

export default Index;
