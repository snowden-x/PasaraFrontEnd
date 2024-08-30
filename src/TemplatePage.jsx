import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {substract_icon,plus_icon,jollofRice_icon, menu_icon} from './Store.jsx'

export default function TemplatePage(){


const[index_ , setIndex_] = useState(0)
const [currentFoodItemsinDispay, setcurrentFoodItemsInDisplay ]= useState(['']);
const [HorizontalScrollMenuArray, setHorizontalScrollMenuArray] = useState(['']);

  function HorizontalScrollMenu({props}){
      return(
        props.map((menu_item,index)=>(
            <h1 style={{backgroundColor: index_ === index ? 'lightgreen' : 'pink'}} onClick={()=>{setIndex_(index)}} key={index} className='rounded-md text-center min-w-28 mr-2.5 border-black border-solid p-2 border-1 text-nowrap'>{menu_item}</h1>
        ))
      )
}

function CreateFoodsItemsDisplay({array_holding_food_items}){

  // Creates an Array for all state elements
  const [counts, setCounts] = useState(
    array_holding_food_items.map(() => 0)
  );


  // Function to handle increment
  const incrementCount = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
  };

  // Function to handle decrement
  const decrementCount = (index) => {
    const newCounts = [...counts];
    if (newCounts[index] > 0) {
      newCounts[index] -= 1;
      setCounts(newCounts);
    }
  };

  return(
    array_holding_food_items.map((food_item,index)=>(
      <div style={{height:'90px',width:'97%'}} key={index} className='mt-10 flex bg-slate-100 border-solid border-2'>
        <div className='flex-3'>
          <h1 className='ml-3 text-lg font-bold'>{food_item.Food}</h1>
          <h1 className='ml-1 text-sm italic'>Starting from Ghc 6.0</h1>
        </div>
        <div className='ml-3 p-1 flex flex-1 flex-col justify-between items-center'>
            <img src={plus_icon} style={{height:'25px',width:'25px'}}  onClick={()=>{incrementCount(index)}}></img>
            <h1>{counts[index]}</h1>
            <img src={substract_icon} style={{height:'25px', width:'25px'}} onClick={()=>{decrementCount(index)}}></img>
        </div>
        <div className=' flex-2 '>
          <img src={jollofRice_icon} style={{height:'100px', width:'100px', zIndex:'1'}} className='rounded-full justify-end flex -translate-y-5 translate-x-4'></img>
        </div>
      </div>
        
    ))
  )
}


const sendPostRequest = async () => {
  try {
      // Make the POST request
      const result = await axios.post('http://192.168.56.1:8000/backend1/send_food_items/', index_, {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      // Process the response
      console.log(result.data);
      setcurrentFoodItemsInDisplay(result.data)
  } catch (error) {
      console.error('There was an error!', error);
  }
};

useEffect(() => {
    sendPostRequest();
  }, [index_]); 


useEffect(() => {
  console.log('use me')
  axios.get('http://192.168.56.1:8000/backend1/send_food_items/')
    .then(response => {
      // Handle successful response
      console.log(response.data)
      console.log('Frog');
      setHorizontalScrollMenuArray(response.data);
    })
    .catch(err => {
      // Handle Error
      console.log('Failure')
      console.log(err);
    });
}, []);

  return(
      <div className = "w-full h-full p-0.5">
        {/**The main div contains three other sub-divisions that hold the title section, the 
         * horizontal scroll menu and the food displays respectively.*/}
        <div style={{zIndex:'2'}} className='shadow-lg shadow-pink-400 sticky top-0 bg-white p-1'>
          <div className='border-solid'>
              {/**Title Div */}
                <img src={menu_icon} style={{height:'35px', width:'35px'}}></img>
                <h1 className='font-black text-3xl'>Bell's Kitchen</h1>
                <h1 className='italic'>We serve your delicious home dishes here!</h1>
            </div>
            <div className='flex overflow-x-auto w-full'>
              {/**Horizontal Scroll Bar */}
              {HorizontalScrollMenuArray.length > 0 ? (
                <HorizontalScrollMenu props={HorizontalScrollMenuArray} />
                  ) : (
                      <p>Fetching Menu, please wait</p>
                      )}
            </div>
        </div>
          <div className='items-center  flex flex-col pr-1.5 m-1 mt-8'>
              {/**Food Options*/}
              <CreateFoodsItemsDisplay array_holding_food_items={currentFoodItemsinDispay}/>
          </div>
      </div>
  )
}