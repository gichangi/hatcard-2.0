import {useEffect,useState} from "react";
import {useLocation} from "react-router-dom";
import {apiFetch} from "../../assets/api/utils";
import PlatformAdd from "../admin/BI-Platforms/PlatformAdd";
import PlatformList from "../admin/BI-Platforms/PlatformList";
import TableauServerConfig from "../admin/BI-Platforms/Tableau/TableauServerConfig";
import TableauOnlineConfig from "../admin/BI-Platforms/Tableau/TableauOnlineConfig";
import ViewTableau from "./Tableau/ViewTableau";
import ViewHtmlDashboard from "./HTML/ViewHTMLDashboard";
import Box from '@mui/material/Box';
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

function FacebookCircularProgress(props) {
    return (
        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{height:"90vh"}}>
            <Grid item xs={4} >
                <Box sx={{ position: 'relative' }}>
                    <CircularProgress
                        variant="determinate"
                        sx={{
                            color: (theme) =>
                                theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                        }}
                        size={500}
                        thickness={4}
                        {...props}
                        value={100}
                    />
                    <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        sx={{
                            color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                            animationDuration: '550ms',
                            position: 'absolute',
                            left: 0,
                            [`& .${circularProgressClasses.circle}`]: {
                                strokeLinecap: 'round',
                            },
                        }}
                        size={500}
                        thickness={4}
                        {...props}
                    />
                </Box>
            </Grid>
        </Grid>

    );
}

function Index(props) {
    let { state } = useLocation();
    const [reComp, setReComp] = useState(<FacebookCircularProgress />)
    const [currentDashboard, setCurrentDashboard] = useState(null)
    const[currentId, setCurrentId] = useState(null)
    useEffect(()=>{
        if(state !== undefined && currentId !== state.id){
            apiFetch('get',{},`/api/bi-dashboards/find/${state.id}`,{}).then(res=>{
                console.log("res.data.dashboard")
                console.log(res.data.dashboard)
                pageSwitch(res.data.dashboard.dashboard_type,res.data.dashboard.id,res.data.dashboard)
            })
            setCurrentId(state.id)
        }

    },[state])

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
