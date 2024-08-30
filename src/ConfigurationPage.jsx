import React, { useState } from "react";
import {BrowserRouter as Router ,Routes, Route, json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TemplatePage from "./TemplatePage.jsx";

export default function ConfigurationPage(){
        const[background, setbackground] = useState("");
        const navigate = useNavigate();
        let url = "ws://192.168.56.1:8000/ws/socket-server/"
        const chatSocket = new WebSocket(url);
        
        chatSocket.onmessage = function(e){
                let data = JSON.parse(e.data);
                console.log('Data: ',data);
                if (data.type === 'background-color'){
                        setbackground(data.message);
                }
        }
        


    return(
        <div className="w-screen h-screen flex ">
            <div className="flex flex-auto w-1/2 mix-blend-multiply flex-col space-y-4 px-7">
                    <div className="card w-5/6 h-1/4 bg-gray-300 py-0.5 flex flex-col hover:scale-105 hover:shadow-xl hover:ease-in-out hover:duration-300">
                            <h1>Background Color</h1>
                            <button onClick={()=>{navigate('/')}} className="rounded-full border-2 border-green-300 w-2/12">Blue</button>
                            <button onClick={()=>{chatSocket.send(JSON.stringify({message:"brown"}))}} className="rounded-full border-2 border-green-300 w-2/12">Brown</button>
                            <button className="rounded-full border-2 border-green-300 w-2/12">Gold</button>
                    </div>
                    <div className="card w-5/6 h-1/4 bg-gray-300 py-0.5 flex flex-col hover:scale-105 hover:shadow-xl hover:ease-in-out hover:duration-300">
                            <h1>Name</h1>
                           
                    </div>
                    <div className="card w-5/6 h-1/4 bg-gray-300 py-0.5 flex flex-col hover:scale-105 hover:shadow-xl hover:ease-in-out hover:duration-300">
                            <h1>Font Color</h1>
                    </div>
            </div>
            <div style={{backgroundColor: background === ""? 'pink': background,height:"650px", width:'400px'}} className="flex shadow-2xl shadow-black mix-blend-multiply overflow-y-auto justify-centre mt-2 mr-3">
                       <TemplatePage/> 
            </div>
        </div>       
    );}