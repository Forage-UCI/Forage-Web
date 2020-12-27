import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 550,
        margin: "30px 0px 30px 0px",
    },
    });

async function checkIn(userName, restID){
    var apigClient = window.apigClientFactory.newClient(); 
    const body = {
        "userName": userName,
        "restID": restID,
    }
    apigClient.checkinPost({},body,{}).then(
        response =>{
        console.log(response);
        }
    )
}
export default function RestRecommandCard(props) {
    const imageUrl = props.restInfo.imageUrl;
    const restName = props.restInfo.restName;
    const restID = props.restInfo.id;
    const lastVisitTime = props.restInfo.lastVisitTime;
    const restType = props.restInfo.restType;
    const restCount = props.restInfo.restCount;

    const classes = useStyles();
    const restIntro = `A ${restType} restaurant you visited ${restCount}\n times. Last visit time: ${lastVisitTime}`;
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

