import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RecommandBody from './RecommandBody';
import Grid from '@material-ui/core/Grid';
import FriendVisitCol from './FriendVisitCol'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width : '80%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


export default function Body(){
    const classes = useStyles;
    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={5}>
                {/* <Paper className={classes.paper}>xs</Paper> */}
                    <FriendVisitCol/>
                </Grid>
                <Grid item xs={7}>
                {/* <Paper className={classes.paper}>xs=6</Paper> */}
                <RecommandBody/>
                </Grid>

            </Grid>
        </Container>
    )
}