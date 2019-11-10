import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter, useParams } from 'react-router-dom';
import {
   Typography, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ConfirmationDiv, LabelValue, Contacts, BackBtn, Activity } from './Confirmation.styles';
import { Title, BottomBtn, Message } from '../common.styles';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import { postEvent, getEvents } from '../../api';

export interface ConfirmationProps {
};

export interface Contacts {
   activityId: number,
   email: string
};

const Confirmation = (props: ConfirmationProps & RouteComponentProps) => {
   const [contacts, setContacts] = useState(Array<Contacts>());
   const { long, lat, radius, start, end } = useParams();
   const activity: activity = {
      location: {
         // @ts-ignore
         lat: parseFloat(lat),
         // @ts-ignore
         long: parseFloat(long),
         // @ts-ignore
         radius: parseFloat(radius)
      },
      dateRange: {
         // @ts-ignore
         startDate: parseFloat(start),
         // @ts-ignore
         endDate: parseFloat(end)
      }
   }

   useEffect(() => {
      getEvents(activity).then(res => {
         const gatheredContacts = res.data.map((obj: any) => {
            return {
               activityId: obj._id.slice(obj._id.length - 6, obj._id.length),
               email: `${obj._id.slice(obj._id.length - 6, obj._id.length)}@ngo.hub`
            };
         })
         setContacts(gatheredContacts);
      });
   }, []);

   return (
      <ConfirmationDiv>
         <Title>
            <Typography variant="h4">Let's confirm your operation registration</Typography>
         </Title>
         <Activity>
            <ActivityCard activity={activity} />
         </Activity>
         <Message>
            {contacts.length ? 
               <><Typography variant="subtitle2">There are operations that are occurring at the same location and time as yours.</Typography><Typography variant="body2">You may want to contact the organizers to make sure your operations won't intrude on each other.</Typography></> 
               : <><Typography variant="subtitle2">No overlapping operations found.</Typography><Typography variant="body2">You won't have to worry about other organizations interferring with your operation.</Typography></>}
         </Message>
         {contacts.length > 0 ?
            <Contacts>
               <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Other organizer contact information:</ExpansionPanelSummary>
                  {contacts.map((contact) =>
                     <ExpansionPanelDetails key={contact.activityId}>
                        <LabelValue>
                           <label>Operation {contact.activityId}</label>
                           <p>{contact.email}</p>
                        </LabelValue>
                     </ExpansionPanelDetails>
                  )}
               </ExpansionPanel>
            </Contacts>
         : null}
         <BackBtn>
            <Button fullWidth color="default" variant="text" size="large">Back</Button>
         </BackBtn>
         <BottomBtn>
            <Button fullWidth color="primary" variant="contained" size="large" 
               onClick={() => {
                  props.history.push('/celebration');
                  postEvent(activity);
               }}
            >
               Confirm
            </Button>
         </BottomBtn>
      </ConfirmationDiv>
   );
}

export default withRouter(Confirmation);