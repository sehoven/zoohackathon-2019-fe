import React, { useEffect, useState } from 'react';
import {
   Card, CardHeader, Typography, CardContent, Button,
   ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ConfirmationDiv, LabelValue, Message, Contacts, BackBtn, Event } from './Confirmation.styles';
import { Title, BottomBtn } from '../common.styles';

export interface ConfirmationProps {
   event: event
};

export interface Contacts {
   eventId: number,
   email: string
};

const Confirmation = (props: ConfirmationProps) => {
   const startDate = new Date(props.event.dateRange.startDate * 1000).toLocaleDateString();
   const endDate = new Date(props.event.dateRange.endDate * 1000).toLocaleDateString();

   const [contacts, setContacts] = useState(Array<Contacts>());

   useEffect(() => {
      // do api call
      setContacts([
         {
            eventId: 12345,
            email: "12345@hidden.com"
         },
         {
            eventId: 12345,
            email: "12345@hidden.com"
         },
         {
            eventId: 12345,
            email: "12345@hidden.com"
         },
         {
            eventId: 12345,
            email: "12345@hidden.com"
         }
      ]);
   }, []);

   return (
      <ConfirmationDiv>
         <Title>
            <Typography variant="h4">Let's confirm your event registration.</Typography>
         </Title>
         <Event>
            <Card>
               <CardHeader title="Event Details" />
               <CardContent>
                  <LabelValue>
                     <label>Latitude</label>
                     <p>{props.event.location.lat}</p>
                  </LabelValue>
                  <LabelValue>
                     <label>Longitude</label>
                     <p>{props.event.location.long}</p>
                  </LabelValue>
                  <LabelValue>
                     <label>Radius</label>
                     <p>{props.event.location.radius}km</p>
                  </LabelValue>
                  <LabelValue>
                     <label>Date</label>
                     <p>{startDate} - {endDate}</p>
                  </LabelValue>
               </CardContent>
            </Card>
         </Event>
         <Message>
            {contacts.length ? 
               <><Typography variant="subtitle2">There are events that are occuring at the same location and time as yours.</Typography><Typography variant="body2">You may want to contact the organizer(s) to make sure your events won't intrude on each other.</Typography></> 
               : <><Typography variant="subtitle2">There are no overlapping events with your event!</Typography><Typography variant="body2">You won't have to worry about other organizations interferring with your event.</Typography></>}
         </Message>
         {contacts.length ?
            <Contacts>
               <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Other organizer contact information:</ExpansionPanelSummary>
                  {contacts.map((contact) =>
                     <ExpansionPanelDetails key={contact.eventId}>
                        <LabelValue>
                           <label>Event {contact.eventId}</label>
                           <p>{contact.email}</p>
                        </LabelValue>
                     </ExpansionPanelDetails>
                  )}
               </ExpansionPanel>
            </Contacts>
         : null}
         <BackBtn><Button fullWidth color="default" variant="text" size="large">Back</Button></BackBtn>
         <BottomBtn><Button fullWidth color="primary" variant="contained" size="large">Confirm</Button></BottomBtn>
      </ConfirmationDiv>
   );
}

export default Confirmation;