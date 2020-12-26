import React, {Component} from 'react'
import ButtonAppBar from './Appbar'
import Body from './Body'
class App extends React.Component{
  render(){
    return(
      <div >
        <ButtonAppBar/>
        <Body></Body>
      </div>
    )
  }
}

export default App