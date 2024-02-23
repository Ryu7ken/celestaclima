import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactTyped } from 'react-typed';
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsThermometer, BsWind, BsGithub } from 'react-icons/bs';
import { IoMdCloudy, IoMdRainy, IoMdSnow, IoMdSunny, IoMdThunderstorm, IoMdSearch } from 'react-icons/io';
import { WiCloudy } from "react-icons/wi";
import { BiTachometer } from "react-icons/bi";
import { MdOutlineWaterDrop } from "react-icons/md";
import bg from '../assets/weather.png';

function Weather() {

  const [data, setData] = useState(null);
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [inputValue, setInputValue] = useState('');


//API call to fetch data
useEffect(() => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=7c5e66807775dae4f5ccc996fb45aadd`;

  axios.get(url).then(res => {
    setData(res.data);
  }).catch((err) => {
    setErrorMsg(err); //Catch error
  });
}, [location]);


//Timer to show error message
useEffect(() => {
  const timer = setTimeout(() => {
    setErrorMsg('')
  }, 1000);
  return () => clearTimeout(timer);
}, [errorMsg]);


  //Function for Search input
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };


  //Funcion for Search button
  const handleSubmit = (e) => {
     if (inputValue !== '') {
      setLocation(inputValue);
     }

    //Make input empty after Search
     const input = document.querySelector('input');
     input.value = '';

     e.preventDefault();
  };


  //Set icons according to weather conditions
  let icon;

  switch (data?.weather[0]?.main) {
    case 'Clouds':
      icon = <IoMdCloudy className='text-gray-500' />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill className='text-gray-500' />;
      break;
    case 'Rain':
      icon = <IoMdRainy className='text-[#31cafb]' />;
      break;
    case 'Clear':
      icon = <IoMdSunny className='text-yellow-500' />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#31cafb]' />;
      break;
    case 'Snow':
      icon = <IoMdSnow className='text-[#31cafb]' />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm className='text-gray-500' />;
      break;
    default:
      icon = null;
  }

  //Date object
  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



  return (
    <div className="bg-cover bg-center bg-no-repeat w-full h-full text-center">
      <img src={bg} alt='/' className='object-cover absolute h-full w-full opacity-70'/>
      
      {/* Container for the whole App */}
      <div name="container" className='relative flex flex-col'>

        {/* Header */}
        <div className='flex justify-between p-4'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>CelestaClima.</h1>

          {/* Github Redirecting Link */}
          <a href='https://github.com/Ryu7ken?tab=repositories'><BsGithub className='mx-3 text-2xl sm:text-3xl md:text-4xl animate-pulse'/></a>
        </div>

        {/* Search bar functionality */}
        <div className='mt-10 mb-5 md:mt-1 md:mb-2 h-12 w-full bg-slate-400 bg-opacity-35 max-w-[350px] sm:h-14 sm:max-w-[450px] m-auto rounded-full'>

          <div className='flex justify-between items-center h-full p-1 sm:p-2'>

            <input type='text' placeholder='Search by city' 
            onChange={(e) => handleInput(e)}
            
            className='flex-1 h-full bg-transparent text-lg pl-6 text-black rounded-3xl placeholder:text-black outline-none'/>

            <button onClick={(e) => handleSubmit(e)}
            className='w-14 sm:w-16 h-10 sm:h-11 flex justify-center items-center rounded-full bg-slate-400 hover:border-2 hover:border-gray-400 hover:bg-transparent'>
              <IoMdSearch className='text-2xl sm:text-3xl'/>
            </button>

          </div>
        </div>

        {/* Show only when nothing is searched */}
        {data?.name === undefined &&
          <div className='my-16'>
            <ReactTyped className="p-4 font-semibold text-lg sm:text-2xl md:text-4xl" strings={[' By Abdul Baquiur Rahman']} typeSpeed={50}/>
          </div>
        }

        {/* if data is empty then the contents won't be shown */}
        {data?.name !== undefined &&

          <div>
            {/* Error message content defining */}
            <div className='flex justify-center items-center'>
              {errorMsg && <div className='w-full max-w-[90vw] sm:max-w-[450px] bg-white font-semibold py-2 rounded-md absolute capitalize'>
              {`${errorMsg.response.data.message}`}
              </div>}
            </div>

            {/* Container for weather info */}
            <div className='bg-gray-400 bg-opacity-50 py-1 w-8/12 sm:w-6/12 md:w-4/12 m-auto rounded-2xl'>

              {/* City name & Country */}
              {data?.name ? <h2 className='my-1 text-3xl md:text-4xl font-bold'>{data?.name}, {data?.sys?.country}</h2> : null}
              
              {/* System current Date, Month & Year */}
              {data?.name !== undefined &&
                <h1 className='text-lg md:text-xl'>{date.getUTCDate()} {months[date.getUTCMonth()]}, {date.getUTCFullYear()}</h1>}

              {/* Temperatue with Minimum & Maximum, and Weather description */}
              <div className='justify-center '>
                <div className='flex justify-center space-x-4'>
                  <div className='text-5xl mt-5 md:text-6xl md:mt-3'>{icon}</div>
                  {data?.main ? <h1 className='font-bold mt-6 md:mt-4 mb-2 text-4xl md:text-5xl'>{data?.main?.temp.toFixed()}°C</h1> : null}
                </div>
                {data?.main ? <h1 className='font-semibold text-lg mb-2 md:text-2xl'>{data?.main?.temp_min.toFixed()} / {data?.main?.temp_max.toFixed()}°C</h1> : null}
                {data?.weather ? <h2 className='font-semibold capitalize text-xl md:text-2xl'>{data?.weather[0]?.description}</h2> : null}
              </div>

            </div>
          </div>
        }

        {/* if data is empty then the contents won't be shown */}
        {data?.name !== undefined &&
        
        // Container for the weather details
        <div name="bottom" className='mt-5 bg-gray-400 bg-opacity-50 w-11/12 sm:w-9/12 md:w-7/12 m-auto justify-evenly rounded-2xl'>
          
          {/* Feels Like */}
          <div className='flex justify-evenly my-2'>
            <div className='text-lg sm:text-xl md:text-2xl py-1'>
              <div className='flex justify-center my-1'>
              <BsThermometer className='text-2xl md:text-3xl'/>
              </div>
              <p className='text-sm md:text-base'>Feels Like</p>
              <p className='font-semibold text-base md:text-xl'>{data?.main?.feels_like.toFixed()}°C</p>
            </div>

            {/* Humidity */}
            <div className='text-lg sm:text-xl md:text-2xl py-1'>
              <div className='flex justify-center'>
              <MdOutlineWaterDrop className='text-3xl  md:text-4xl'/>
              </div>
              <p className='text-sm md:text-base'>Humidity</p>
              <p className='font-semibold text-base md:text-xl'>{data?.main?.humidity}%</p>
            </div>

            {/* Wind Speed */}
            <div className='text-lg sm:text-xl md:text-2xl py-1'>
              <div className='flex justify-center my-1'>
              <BsWind className='text-xl  md:text-2xl'/>
              </div>
              <p className='text-sm md:text-base'>Wind Speed</p>
              <p className='font-semibold text-base md:text-xl'>{data?.wind?.speed.toFixed()} m/s</p>
            </div>
          </div>

          {/* Visibility */}
          <div className='flex justify-evenly my-2'>
            <div className='text-lg sm:text-xl md:text-2xl py-1'>
              <div className='flex justify-center my-1 md:mt-2 md:mb-1'>
              <BsEye className='text-2xl md:text-4xl'/>
              </div>
              <p className='text-sm md:text-base'>Visibility</p>
              <p className='font-semibold text-base md:text-xl'>{data?.visibility/1000} Km</p>
            </div>

            {/* Pressure */}
            <div className='text-lg sm:text-xl md:text-2xl py-1'>
              <div className='flex justify-center'>
              <BiTachometer className='text-3xl md:text-4xl md:mb-1 md:mt-2'/>
              </div>
              <p className='text-sm md:text-base'>Pressure</p>
              <p className='font-semibold text-base md:text-xl'>{data?.main?.pressure} hPa</p>
            </div>

            {/* Cloud cover */}
            <div className='text-lg sm:text-xl md:text-2xl py-1'>
              <div className='flex justify-center'>
              <WiCloudy className='text-3xl md:text-5xl '/>
              </div>
              <p className='text-sm md:text md:text-base'>Cloud cover</p>
              <p className='font-semibold text-base md:text-xl'>{data?.clouds?.all}%</p>
            </div>
          </div>

        </div>
      }

      </div>
    </div>
  );
}

export default Weather;