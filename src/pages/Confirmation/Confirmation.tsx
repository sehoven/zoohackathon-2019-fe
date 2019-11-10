import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
   Typography, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ConfirmationDiv, LabelValue, Contacts, BackBtn, Activity } from './Confirmation.styles';
import { Title, BottomBtn, Message } from '../common.styles';
import ActivityCard from '../../components/ActivityCard/ActivityCard';

export interface ConfirmationProps {
   activity: activity
};

export interface Contacts {
   activityId: number,
   email: string
};

const Confirmation = (props: ConfirmationProps & RouteComponentProps) => {
   const [contacts, setContacts] = useState(Array<Contacts>());

   useEffect(() => {
      // do api call
      setContacts([
         {
            activityId: 12345,
            email: "12345@ngounderground.com"
         },
         {
            activityId: 62343,
            email: "62343@ngounderground.com"
         },
         {
            activityId: 47253,
            email: "47253@ngounderground.com"
         },
         {
            activityId: 74573,
            email: "74573@ngounderground.com"
         }
      ]);
   }, []);

   return (
      <ConfirmationDiv>
         <Title>
            <Typography variant="h4">Let's confirm your activity registration</Typography>
         </Title>
         <Activity>
            <ActivityCard activity={props.activity} />
         </Activity>
         <Message>
            {contacts.length ? 
               <><Typography variant="subtitle2">There are activity that are occuring at the same location and time as yours.</Typography><Typography variant="body2">You may want to contact the organizer(s) to make sure your activity won't intrude on each other.</Typography></> 
               : <><Typography variant="subtitle2">There are no overlapping activity with your activity!</Typography><Typography variant="body2">You won't have to worry about other organizations interferring with your activity.</Typography></>}
         </Message>
         {contacts.length ?
            <Contacts>
               <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Other organizer contact information:</ExpansionPanelSummary>
                  {contacts.map((contact) =>
                     <ExpansionPanelDetails key={contact.activityId}>
                        <LabelValue>
                           <label>Activity {contact.activityId}</label>
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
            <Button fullWidth color="primary" variant="contained" size="large" onClick={() => {props.history.push('/celebration')}}>
               Confirm
            </Button>
         </BottomBtn>
      </ConfirmationDiv>
   );
}

export default withRouter(Confirmation);