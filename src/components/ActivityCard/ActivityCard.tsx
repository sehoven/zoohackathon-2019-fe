import React from 'react';
import { ActivityCardDiv } from './ActivityCard.styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { LabelValue } from '../../pages/Confirmation/Confirmation.styles';

export interface ActivityCardProps {
   activity: activity
}

const ActivityCard = (props: ActivityCardProps) => {
   const startDate = new Date(props.activity.dateRange.startDate * 1000).toLocaleDateString();
   const endDate = new Date(props.activity.dateRange.endDate * 1000).toLocaleDateString();

   return (
      <ActivityCardDiv>
         <Card>
            <CardHeader title="Activity Details" />
            <CardContent>
               <LabelValue>
                  <label>Latitude</label>
                  <p>{props.activity.location.lat}</p>
               </LabelValue>
               <LabelValue>
                  <label>Longitude</label>
                  <p>{props.activity.location.long}</p>
               </LabelValue>
               <LabelValue>
                  <label>Radius</label>
                  <p>{props.activity.location.radius}km</p>
               </LabelValue>
               <LabelValue>
                  <label>Date</label>
                  <p>{startDate} - {endDate}</p>
               </LabelValue>
            </CardContent>
         </Card>
      </ActivityCardDiv>
   );
}

export default ActivityCard;