import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {GiCancel} from 'react-icons/gi'
function Main() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected,setSelected]=useState([]);
 
  const fetchData = () => {
    fetch('https://storage.googleapis.com/programiz-static/hiring/software/job-listing-page-challenge/data.json')
      .then(response => response.json())
      .then(data => {
        
        setJobs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };
 

const handleClick = (e) => {
  if(selected.includes(e.target.textContent)){
    setSelected([...selected])
  }
else{

  setSelected([...selected, e.target.textContent]);
}
fetch('https://storage.googleapis.com/programiz-static/hiring/software/job-listing-page-challenge/data.json')
      .then(response => response.json())
      .then(data => {
        setJobs(data)
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
}
useEffect(() => {
  fetchData();
}, []);

const Clear=()=>{
  setSelected([]);
}
const removeItem = (item) => {
    const updatedSelected = selected.filter((selectedItem) => selectedItem !== item);
    setSelected(updatedSelected);
}

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        {loading ? (
          
          <p className='text-center text-blue-500 text-4xl'><svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
 
  </svg>
  loading...
  </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 ">
                  <div className="w-9/12 mx-auto  rounded-lg shadow-lg p-6 flex flex-row col-span-12  justify-between ">
                    <div className='flex flex-row'>{selected&&selected.map((data,index)=>(<div key={index} className='flex  bg-green-100 p-2 rounded-xl mx-2  flex-row gap-3 items-center'>{data} <GiCancel  onClick={() => removeItem(data)} className='cursor-pointer text-red-400 hover:text-red-600'/></div>))}</div>
                    
                    <div className='items-center'><button onClick={Clear}className='bg-red-300 p-2 rounded-md'>Clear</button></div>
                    </div>
                  
            {jobs.filter(job => selected.length === 0 || selected.some(keyword => job.keywords.includes(keyword)))
              .map(job => (
              <div key={job.position} className="w-9/12 mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col col-span-12 justify-between">
               
<div className="flex items-center mb-4 justify-between">
<div className='flex items-center mb-4 justify-around'>
  <img src={job.company_logo} alt="Company Logo" className="w-12 h-12 rounded-full" />
  <div className="ml-3">
    <h3 className="text-lg font-semibold">{job.position}</h3>
    <p className="text-gray-500">{job.company}</p>
    <div className="flex flex-wrap">
      <p className=''>{formatDistanceToNow(job.posted_on) + '.'}</p>
      <p className='px-3'>{job.location}</p>
      <p className='px-2'>{job.timing}</p>
    </div>
  </div>
</div>
<div className="mt-auto flex flex-wrap gap-2">
  {job.keywords.map((keyword, index) => (
    <span
      key={index}
      onClick={handleClick}
      
      className={`px-2 py-1 text-gray-7 00 rounded-full text-sm hover:bg-purple-300 cursor-pointer bg-purple-200 text-purple-800'}`}
    >
      {keyword}
    </span>
  ))}
</div>
</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;