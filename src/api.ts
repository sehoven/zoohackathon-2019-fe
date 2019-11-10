import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const getConfig = () => {
   return {
      headers: {
         Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM4MzExNjY5OTg4ZTBjMzVmOGNkYjIiLCJpYXQiOjE1NzM0MDA4NTUsImV4cCI6MTU3MzU3MzY1NX0._cuUY-JEG4nf5WbnOv4BO_QoIkK-mj-sboa6kb4SJbo'
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
      createdBy: "5dc8311669988e0c35f8cdb2"
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