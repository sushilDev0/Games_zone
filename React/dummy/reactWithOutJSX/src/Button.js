import React from 'react';


const Button = () =>{

    const handleClick = ()=>{
        alert('Button click')
    }
  
    return React.createElement('button',
        {onClick:handleClick},
        'Click me !'
    );

}
export default Button;