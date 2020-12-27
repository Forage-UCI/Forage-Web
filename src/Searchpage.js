import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useRouteMatch
} from "react-router-dom";

import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import SearchRestCard from './SearchRestCard'


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

function getData(searchContent){
    //console.log("h123")
    var param = {
        "q": searchContent
    };
    var apigClient = window.apigClientFactory.newClient(); 
    return apigClient.searchGet(param,{},{});
}

function useAsync(getMethod, param){
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getResource(){
        try{
            setLoading(true);
            const result = await getMethod(...param);
            setValue(result);
        }catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getResource();
    }, [param]);
    return { value, error, loading };
}

function Topic() {
    let { topicId } = useParams();
    const result = useAsync(getData, topicId);

    return (
        <div>
            {result.error 
                ? "Failed to load search result"
                : result.loading
                ? "Loading search result"
                : dynamicContent(result)
            }
        </div>
    );
}

function dynamicContent(result){
    const classes = useStyles;
    if (result){
        const resultdata = result.value;
        var textdata = resultdata.data;
        console.log(textdata);
        var newdata = textdata.replace(/\'/g, "\"")
        try{
            var data = JSON.parse(newdata)
            var restList = data.restaurant;
            console.log(restList);
            var restInfos = []
            for (var rest of restList){
                restInfos.push(
                    {
                        imageUrl    : rest.imageUrl,
                        restID      : rest.restID,
                        restName    : rest.restName,
                        restType    : rest.restType.join(""),
                        restAddr    : rest.address.join(""),
                        restCount   : rest.restCount,
                        lastVisitTime   : "2020 Dec 23"
                    }
                )
            }
            var count = 0;
            const items= []
            for (var restinfo of restInfos){
                items.push(<SearchRestCard restInfo = {restinfo} key={count} />);
                count = count + 1;
            };
            return (
            <Container className={classes.root}>
                {items}
            </Container>
            )

        }catch(e){
            console.log(e)
        }
    }
    
}

export default function Searchpage(){
    let {path} = useRouteMatch();
    
    return (
        <Router>
            <Switch>
                <Route exact path={path}>
                    <SearchStaticContent/>
                </Route>
                <Route path={`${path}/:topicId`}>
                    <Topic/>
            </Route>
            </Switch>
        </Router>
    )
}


function SearchStaticContent(){
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
        items.push(<SearchRestCard restInfo = {restInfo[i]} key={i} />);
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