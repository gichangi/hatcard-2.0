import {useEffect,useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {apiFetch} from "../../assets/api/utils";
import ViewTableau from "./Tableau/ViewTableau";
import ViewHtmlDashboard from "./HTML/ViewHTMLDashboard";
import {FacebookCircularProgress} from "../../assets/ui";



function Index(props) {
    let { state } = useLocation();
    const [reComp, setReComp] = useState(<FacebookCircularProgress />)
    const [currentDashboard, setCurrentDashboard] = useState(null)
    const[currentId, setCurrentId] = useState(null);
    let { id } = useParams();

    useEffect(()=>{
        if(id !== undefined){
            apiFetch('get',{},`/api/bi-dashboards/find/${id}`,{}).then(res=>{
                pageSwitch(res.data.dashboard.dashboard_type,res.data.dashboard.id,res.data.dashboard)
            })
            setCurrentId(id)
        }else{
            if(state !== undefined && currentId !== state.id){
                apiFetch('get',{},`/api/bi-dashboards/find/${state.id}`,{}).then(res=>{
                    pageSwitch(res.data.dashboard.dashboard_type,res.data.dashboard.id,res.data.dashboard)
                })
                setCurrentId(state.id)
            }

        }


    },[state,id])

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
                setReComp(<FacebookCircularProgress />);
        }
    }


    return (
        <div>
            {reComp}
        </div>
    );
}

export default Index;
