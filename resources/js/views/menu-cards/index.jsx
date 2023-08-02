import {useLocation, withRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import {apiFetch} from "../../assets/api/utils";
import _ from "lodash";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {Avatar, Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import {  Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'40vh'
}));



function Index(props) {
    let { state } = useLocation();
    const [cardItems, setCardItems] = useState([])
    useEffect(()=>{
        console.log("menu cards")
        const elements = document.getElementsByClassName('breadcrumb');
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        if(state !== undefined){
            apiFetch('get',{},`/api/menu-cards/${state.id}`,{}).then(res=>{
                setCardItems(res.data.navigation_menu_items)
            })
        }

    },[props])


    return (
        <div>
            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="stretch" direction="row"  justifyContent="flex-start" sx={{height:"90vh"}}>
                {cardItems.map((i) => (

                        <Grid item xs={2} sm={3} md={3} key={i.id} >

                            {/*<Link to={{ pathname: '/explore', state: { id: i.id}}}>*/}
                            <Link to={{ pathname: `${i.type!='item'?'/explore':i.url}`, state: { id: i.id,category:i.category}}}>
                            <Item>

                                <Card sx={{height:'100%'}}>
                                    <CardMedia sx={{height:'25vh'}}>
                                        <img
                                            height={'auto'}
                                            src={`${i.image}`}
                                            alt={'Loading...'}
                                            style={{
                                                width: 'auto',
                                                height: '100%',
                                                alignSelf: 'center',
                                            }}
                                        />
                                    </CardMedia>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" sx={{color:'#0F697D',fontWeight:'bold'}}>
                                            {i.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{color:'#992E62',fontSize:"14px",fontFamily:`Trebuchet !important`}}>
                                            {i.description}
                                        </Typography>
                                    </CardContent>
                                </Card>

                            </Item>
                            </Link>
                        </Grid>


                ))}
            </Grid>
        </div>
    );
}

export default Index;
