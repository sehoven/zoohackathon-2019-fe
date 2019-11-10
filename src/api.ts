import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const getConfig = () => {
   return {
      headers: {
         Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM3YmIxZmM2YTFhMDA0ZDA1NmRmZTYiLCJpYXQiOjE1NzMzNzA2NTV9.tSLYNJTnjF4Pdw4m7_IRfUHhoxjPEYCKMqm_VYTOCYI'
       }
   }
}

export const getEvents = async (activity: activity) => {
   const data = {
      start: new Date(activity.dateRange.startDate * 1000),
      end: new Date(activity.dateRange.endDate * 1000),
      radius: activity.location.radius,
      lat: activity.location.lat,
      long: activity.location.long
   };
   return await axios.get(`${BASE_URL}/events`, { params: data, ...getConfig()});
}

export const getMyEvents = async () => {
   const data = {
      createdBy: "5dc7bb1fc6a1a004d056dfe6"
   };
   return await axios.get(`${BASE_URL}/myEvents`, { params: data, ...getConfig()});
}

export const postEvent = async (activity: activity) => {
   const data = {
      start: new Date(activity.dateRange.startDate * 1000),
      end: new Date(activity.dateRange.endDate * 1000),
      radius: activity.location.radius,
      lat: activity.location.lat,
      long: activity.location.long
   };

   console.log(data);
   return await axios.post(`${BASE_URL}/event`, data, getConfig());
}