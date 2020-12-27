import React from 'react';
import RestCard from './RestCard'

export default function RecommandBody(props) {  
    const items = [];
    const restInfo = [
    {
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
    }
    ] 
    for (var i = 0 ; i < 3; i++){
        items.push(<RestCard restInfo = {restInfo[i]} key={i} />);
    }
    return (
        <div>
            {items}
        </div>
    );
}