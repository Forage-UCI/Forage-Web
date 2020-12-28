import React, { useState, useEffect, Component } from "react";
import RestCard from './RestCard'
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useRouteMatch
} from "react-router-dom";
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import { render } from "@testing-library/react";

Amplify.configure({
    API: {
        Auth: {
            // REQUIRED - Amazon Cognito Identity Pool ID
            identityPoolId: "us-east-1:1f71bc96-94c9-4625-beb4-0bdc3da950f2",
            // REQUIRED - Amazon Cognito Region
            region: "us-east-1",
            // OPTIONAL - Amazon Cognito User Pool ID
            userPoolId: "us-east-1_N2FhDCvWR",
            // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
            userPoolWebClientId: "3kc23nevdrnq65bpm3nqi8uvcd",
        },
        endpoints: [
            {
                name: "Forage",
                endpoint: "https://f8t110v4j6.execute-api.us-east-1.amazonaws.com/test"
            },
        ]
    }
})

function getData() { 
    const apiName = 'Forage';
    const path = '/recommendation';
    const myInit = {
        body: "HelloWorld"
    };
    console.log(API.get(apiName, path, myInit));
    return API.get(apiName, path, myInit);
}
// function getData(userName){
//     console.log("h123")
//     var param = {
//         "q": userName
//     };
//     var apigClient = window.apigClientFactory.newClient(); 
//     return apigClient.recommendationGet(param,{},{});
// }

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
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)
    const items = [];
    const restInfo = [
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
    }
    ] 
    for (var i = 0 ; i < 3; i++){
        items.push(<RestCard restInfo = {restInfo[i]} key={i} />);
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick = {onClick}> Get Recommendation!</Button>
            {showResults && items}
        </div>
    );

}
