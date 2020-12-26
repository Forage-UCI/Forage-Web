import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        margin: "30px 0px 30px 50px", 
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
});

export default function FriendVisitCard(props) {
    const classes = useStyles();

    const name = props.friendinfo.name;
    const lastVisit = props.friendinfo.lastVisit;
    const restName = props.friendinfo.restName;
    const imageUrl = props.friendinfo.imageUrl;

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={imageUrl}
                title={restName}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="subtitle1" >
                        {name}
                    </Typography>
                    <Typography component="h5" variant="h5">
                        {restName}
                    </Typography>
                    <Typography variant="subtitle1" >
                        Checked in at {lastVisit}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
}
