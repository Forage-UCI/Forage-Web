import React, { useState, useEffect } from "react";
import RestCard from './RestCard'
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useRouteMatch
} from "react-router-dom";

function getData(userName){
    console.log("h123")
    var param = {
        "q": userName
    };
    var apigClient = window.apigClientFactory.newClient(); 
    return apigClient.recommendationGet(param,{},{});
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
    // let { topicId } = useParams();
    const result = useAsync(getData, "testdian");

    return (
        <div>
            {result.error 
                ? "Failed to load recommendation result"
                : result.loading
                ? "Loading recommendation result"
                : dynamicContent(result)
            }
        </div>
    );
}

function dynamicContent(result){
    if (result){
        const resultdata = result.value;
        var textdata = resultdata.data;
        console.log(textdata);
        //var newdata = textdata.replace(/\'/g, "\"")
        try{
            // var data = JSON.parse(newdata)
            var restList = textdata.restaurant;
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
                        lastVisitTime   : rest.lastVisitTime,
                    }
                )
            }
            var count = 0;
            const items= []
            for (var restinfo of restInfos){
                items.push(<RestCard restInfo = {restinfo} key={count} />);
                count = count + 1;
            };
            return (
            <div>
                {items}
            </div>
            )

        }catch(e){
            console.log(e)
        }
    }
    
}

// import Amplify, { API } from 'aws-amplify';
// import awsconfig from './aws-exports';

// Amplify.configure({
//     API: {
//         Auth: {
//             // REQUIRED - Amazon Cognito Identity Pool ID
//             identityPoolId: "us-east-1:1f71bc96-94c9-4625-beb4-0bdc3da950f2",
//             // REQUIRED - Amazon Cognito Region
//             region: "us-east-1",
//             // OPTIONAL - Amazon Cognito User Pool ID
//             userPoolId: "us-east-1_N2FhDCvWR",
//             // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//             userPoolWebClientId: "3kc23nevdrnq65bpm3nqi8uvcd",
//         },
//         endpoints: [
//             {
//                 name: "Forage",
//                 endpoint: "https://f8t110v4j6.execute-api.us-east-1.amazonaws.com/test"
//             },
//         ]
//     }
// })

// function getRecommendation() { 
//     const apiName = 'Forage';
//     const path = '/recommendation';
//     const myInit = {
//         body: "HelloWorld"
//     };
    
//     API
//         .get(apiName, path, myInit)
//         .then(response => {
//             console.log(response["restaurant"]);
//         })
//         .catch(error => {
//             console.log(error.response);
//         });
// }

export default function RecommandBody(props) {  
    // const items = [];
    // const restInfo = [
    // {
    //     imageUrl    : "https://www.grandforksherald.com/incoming/1043238-keoere-Rendering-of-the-Chick-fil-A-restaurant/alternates/BASE_LANDSCAPE/Rendering%20of%20the%20Chick-fil-A%20restaurant",
    //     restID      : "ABCDE",
    //     restName    : "ChickFilA",
    //     restType    : "Fried Chicken",
    //     restAddr    : "Unversity Town Center, Irvine, CA, 92614",
    //     restCount   : "23",
    //     lastVisitTime   : "2020 June 13"
    // },
    // {
    //     imageUrl    : "https://i0.wp.com/www.eatthis.com/wp-content/uploads/2018/12/mcdonalds-drive-through-restaurant.jpg?resize=640%2C360&ssl=1",
    //     restID      : "ABCDE",
    //     restName    : "McDonalds",
    //     restType    : "Fried Chicken",
    //     restAddr    : "Unversity Town Center, Irvine, CA, 92614",
    //     restCount   : "10",
    //     lastVisitTime   : "2020 June 23"
    // },
    // {
    //     imageUrl    : "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1968297127,1345521431&fm=15&gp=0.jpg",
    //     restID      : "ABCDE",
    //     restName    : "In-N-Out",
    //     restType    : "Fast Food",
    //     restAddr    : "Unversity Town Center, Irvine, CA, 92614",
    //     restCount   : "8",
    //     lastVisitTime   : "2020 Dec 23"
    // }
    // ] 
    // for (var i = 0 ; i < 3; i++){
    //     items.push(<RestCard restInfo = {restInfo[i]} key={i} />);
    // }
    return (
        <div>
            {/* <Button variant="contained" color="primary" onClick={function() {getRecommendation() }}> Get Recommendation!</Button> */}
            <Topic/>
        </div>
    );
}