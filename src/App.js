import React, {Component} from 'react'
import ButtonAppBar from './Appbar'
import Body from './Body'
import Searchpage from './Searchpage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component{
  render(){
    return(
      <Router>
          <Switch>
            <Route path="/search">
              <ButtonAppBar/>
              <Searchpage />
            </Route>
            <Route path="/">
              <div >
                <ButtonAppBar/>
                <Body></Body>
              </div>
            </Route>
        </Switch>
      </Router>
    )
  }
}



export default App