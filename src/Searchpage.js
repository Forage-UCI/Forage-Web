import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
export default function Searchpage() {
    let queryContent = useParams()

    return (<h2>Hello</h2>);
}