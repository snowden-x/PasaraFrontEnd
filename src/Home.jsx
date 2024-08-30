import React from "react";
import {BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import  logo from './images/logo.png'

export default function Home(){
        const navigate = useNavigate();
    return(
        <div  className="w-screen h-screen flex bg-gradient-to-r from-rose-200 to-yellow-200 flex-col">
             <div className= "w-9/12 flex self-center " style={{height:'15%'}}>
                <img src={logo}></img>
             </div>
             <div style={{flexDirection:"column", display:'flex'}}>
                <button border border-2 onClick={()=>{navigate('/Configure')}}> Click ME</button>
                <button border border-2 onClick={()=>{navigate('/Template')}}> Mobile View</button>
             </div>
             
             
        </div>       

    );}