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
    height:'100%'
}));



function Index(props) {
    let { state } = useLocation();
    const [cardItems, setCardItems] = useState([])
    useEffect(()=>{
        console.log(state);
        apiFetch('get',{},`/api/menu-cards/${state.id}`,{}).then(res=>{
            console.log(res.data.navigation_menu_items)
            setCardItems(res.data.navigation_menu_items)
        })
    },[props])


    return (
        <div>
            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="stretch" direction="row"  justifyContent="flex-start">
                {cardItems.map((i) => (

                        <Grid item xs={2} sm={3} md={3} key={i.id} >

                            {/*<Link to={{ pathname: '/explore', state: { id: i.id}}}>*/}
                            <Link to={{ pathname: `${i.type!='item'?'/explore':i.url}`, state: { id: i.id}}}>
                            <Item>
                                <Card sx={{height:'100%'}}>
                                    <CardMedia
                                        component="img"
                                        height="auto"
                                        image={`${i.image}`}
                                        alt="Paella dish"
                                    />
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
