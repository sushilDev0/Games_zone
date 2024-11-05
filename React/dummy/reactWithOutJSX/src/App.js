import React from 'react'
import Button from './Button'
import Greeting from './Greeting'


const App = () =>{
  
  return React.createElement('div', {className:'app'},
    React.createElement(Greeting),
    React.createElement(Button)
  )
}

export default App
