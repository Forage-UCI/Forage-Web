import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 550,
        margin: "30px 0px 30px 0px",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

async function checkIn(userName, restID){
    console.log("h123")
    var apigClient = window.apigClientFactory.newClient(); 
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // var date = `${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
    const body = {
        "userName": userName,
        "restID": restID,
    }
    apigClient.checkinPost({},body,{}).then(
        response =>{
            console.log(response);
            alert("Check in success!")
        }
    )
}
export default function SearchRestCard(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render


    
    const imageUrl = props.restInfo.imageUrl;
    const restName = props.restInfo.restName;
    const restID = props.restInfo.restID;
    const restType = props.restInfo.restType;
    const restCount = props.restInfo.restCount;

    const restIntro = `A ${restType} restaurant you friends visited ${restCount}\n times.`;
    return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
                component="img"
                alt={restName}
                height="300"
                image= {imageUrl}
                title={restName}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {restName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {restIntro}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary" onClick={()=> {checkIn("testdian", restID)}}>
            Check In
            </Button>
            <Button size="small" color="primary">
            See Location
            </Button>
        </CardActions>
        </Card>
    );
}

