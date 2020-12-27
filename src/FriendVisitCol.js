import React from 'react';
import FriendVisitCard from './FriendVisitCard'

export default function FriendVisitCol(params) {
    const items = [];
    const friendinfo = [{
       initialLetter: "A",
        name: "Annan Zhang",
        email: "az2345@nyu.edu",
        lastVisit: "9pm Dec 20 2020",
        imageUrl: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1968297127,1345521431&fm=15&gp=0.jpg",
        restName: "In-N-Out",
    },
    {
        initialLetter: "S",
         name: "Siwei Wang",
         email: "sw5050@nyu.edu",
         lastVisit: "9pm Dec 18 2020",
         imageUrl: "https://i0.wp.com/www.eatthis.com/wp-content/uploads/2018/12/mcdonalds-drive-through-restaurant.jpg?resize=640%2C360&ssl=1",
         restName: "McDonald's",
    }];
    for (var i =0 ; i< 2; i++){
        items.push(<FriendVisitCard friendinfo = {friendinfo[i]} />);
    }

    return(
        <div>
            {items}
        </div>
    )
}