import React from 'react';
import FriendVisitCard from './FriendVisitCard'

export default function FriendVisitCol(params) {
    const friendinfo = {
        name: "Yanjie",
        lastVisit: "9pm March 23 2020",
        imageUrl: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1968297127,1345521431&fm=15&gp=0.jpg",
        restName: "In-N-Out",
    }

    return(
        <div>
            <FriendVisitCard friendinfo = {friendinfo}/>
        </div>
    )
}