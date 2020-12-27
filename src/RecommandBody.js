import React from 'react';
import RestCard from './RestCard'

export default function RecommandBody(props) {  
    const items = [];
    const restInfo = {
        imageUrl    : "https://picsum.photos/200/300",
        restID      : "ABCDE",
        restName    : "ChickFilA",
        restType    : "Fried Chicken",
        restAddr    : "Unversity Town Center, Irvine, CA, 92614",
        restCount   : "23",
        lastVisitTime   : "2020 June 13"
    }
    for (var i =0 ; i< 4; i++){
        items.push(<RestCard restInfo = {restInfo} key={i} />);
    }
    return (
        <div>
            {items}
        </div>
    );
}