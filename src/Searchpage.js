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

// export default function Searchpage(){
//     let {path} = useRouteMatch();
    
//     return (
//         <Router>
//             <Switch>
//                 <Route exact path={path}>
//                     <SearchStaticContent/>
//                 </Route>
//                 <Route path={`${path}/:topicId`}>
//                     <Topic/>
//             </Route>
//             </Switch>
//         </Router>
//     )
// }


export default function SearchStaticContent(){
    const classes = useStyles;
    const items = [];
    const restInfo = [{
        imageUrl    : "https://s3-media2.fl.yelpcdn.com/bphoto/VsyY6r-OyS07tcyEoxpgjA/o.jpg",
        restID      : "ABCDE",
        restName    : "B & B 47",
        restType    : "Delis",
        restAddr    : "757 3rd Ave', 'New York, NY 10017",
        restCount   : "23",
        lastVisitTime   : "2020 June 13"
    },
    {
        imageUrl    : "https://s3-media4.fl.yelpcdn.com/bphoto/TPJvZ756ABhk8_0X6bsOkA/o.jpg",
        restID      : "ABCDE",
        restName    : "C&B",
        restType    : "Breakfast & Brunch",
        restAddr    : "178 E 7th St', 'New York, NY 10009",
        restCount   : "10",
        lastVisitTime   : "2020 June 23"
    },
    {
        imageUrl    : "https://s3-media2.fl.yelpcdn.com/bphoto/B-ESETk1sKburCzTFxNwKA/o.jpg",
        restID      : "ABCDE",
        restName    : "Kirsh Bakery & Kitchen",
        restType    : "Breakfast & Brunch",
        restAddr    : "551 Amsterdam Ave', 'New York, NY 10024",
        restCount   : "8",
        lastVisitTime   : "2020 Dec 23"
    },
    {
        imageUrl    : "https://s3-media4.fl.yelpcdn.com/bphoto/R2onHYbQdBM1oVjWRZ900w/o.jpg",
        restID      : "pWywDImlX0n_XKPNg0Bizg",
        restName    : "Sunny and Annie s",
        restType    : "Sandwiches",
        restAddr    : "94 Ave B', 'New York, NY 10003",
        restCount   : "8",
        lastVisitTime   : "2020 Dec 23"
    }];
    for (var i = 0 ; i < 4; i++){
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
                <Grid item xs={5}>
                    {items[3]}
                </Grid>
            </Grid>
        </Container>
    )
}