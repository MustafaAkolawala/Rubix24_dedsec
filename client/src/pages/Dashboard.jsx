import React, { useEffect, useState } from 'react'
import WaterRequest from '../components/WaterRequest'

function Dashboard() {

  const [waterRequests, setWaterRequests] = useState([])

  const getWaterRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/request");
      const jsonData = await response.json();
      setWaterRequests(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWaterRequests();
  }, [])

  const ngo_id = "abcd1234"
  const ngo_name = "NGO1"

  const handleClick = (req_id) => {
    setWaterRequests(prevWaterRequests => {
      return prevWaterRequests.map(waterRequest => {
        if (waterRequest.req_id === req_id) {
          return { ...waterRequest, campaign: 'held' };
        }
        return waterRequest;
      });
    });
  }

  return (
    <div className='Dashboard'>
      <h1>Dashboard</h1>

      {/* <p>
        ngo id: {ngo_id}
      </p>

      <p>ngo name: {ngo_name}</p> */}

      <h1>water requests</h1>

      <div className=''>
        {waterRequests.map((waterRequest) => {

          return (
            <WaterRequest
              key={waterRequest.req_id}
              location={waterRequest.location}
              userCount={waterRequest.n_people}
              username={waterRequest.username}
              status={waterRequest.status}
              campaign={waterRequest.campaign}
              onclick={waterRequest}
            />
          )
        })}
        <WaterRequest
          location='1234 Main St'
          userCount='5'
          userName='John Doe'
          status='Pending'
          campaign='held'
          onclick={handleClick}
        />
        <WaterRequest
          location='1234 Main St'
          userCount='5'
          userName='John Doe'
          status='Pending'
          campaign='left'
          onclick={handleClick}
        />
        <WaterRequest
          location='1234 Main St'
          userCount='5'
          userName='John Doe'
          status='Pending'
          campaign='held'
          onclick={handleClick}
        />
      </div>

    </div>
  )
}

export default Dashboard