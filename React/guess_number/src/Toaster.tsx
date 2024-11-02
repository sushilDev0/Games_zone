import React, { useState, useEffect} from 'react'
import './App.css';


interface ToasterProps {
    message: string;
    duration:number;
}


 const Toaster :React.FC <ToasterProps> = ({message,duration}) =>{
   
    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {
       if(message){
        setVisible(true)
        const timer = setTimeout(() => {
            setVisible(true)
        }, duration);
        return ()=> clearTimeout(timer);
       }
    }, [message, duration])

    if(!visible) return null;

    return (
           <div className="toaster">
            {message}
           </div> 
    )
}

export default Toaster