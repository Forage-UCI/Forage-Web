import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RecommandBody from './RecommandBody';
import Grid from '@material-ui/core/Grid';
import FriendVisitCol from './FriendVisitCol'
import RestCard from './SearchRestCard'

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


export default function Searchpage(){
  const classes = useStyles;
  const items = [];
  const restInfo = [{
        imageUrl    : "https://www.grandforksherald.com/incoming/1043238-keoere-Rendering-of-the-Chick-fil-A-restaurant/alternates/BASE_LANDSCAPE/Rendering%20of%20the%20Chick-fil-A%20restaurant",
        restID      : "ABCDE",
        restName    : "ChickFilA",
        restType    : "Fried Chicken",
        restAddr    : "Unversity Town Center, Irvine, CA, 92614",
        restCount   : "23",
        lastVisitTime   : "2020 June 13"
    },
    {
        imageUrl    : "https://i0.wp.com/www.eatthis.com/wp-content/uploads/2018/12/mcdonalds-drive-through-restaurant.jpg?resize=640%2C360&ssl=1",
        restID      : "ABCDE",
        restName    : "McDonalds",
        restType    : "Fried Chicken",
        restAddr    : "Unversity Town Center, Irvine, CA, 92614",
        restCount   : "10",
        lastVisitTime   : "2020 June 23"
    },
    {
        imageUrl    : "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1968297127,1345521431&fm=15&gp=0.jpg",
        restID      : "ABCDE",
        restName    : "In-N-Out",
        restType    : "Fast Food",
        restAddr    : "Unversity Town Center, Irvine, CA, 92614",
        restCount   : "8",
        lastVisitTime   : "2020 Dec 23"
    }];
    for (var i = 0 ; i < 3; i++){
        items.push(<RestCard restInfo = {restInfo[i]} key={i} />);
    };
    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={5}>
                  {items[0]}
                </Grid>
                <Grid item xs={5}>
                  {items[1]}
                </Grid>
                <Grid item xs={5}>
                  {items[2]}
                </Grid>

            </Grid>
        </Container>
    )
}