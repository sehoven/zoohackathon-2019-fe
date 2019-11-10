import React, { useState } from 'react';
import { Typography, Button, Dialog, DialogActions } from '@material-ui/core';
import { CelebrationDiv, Message, DialogContent, HomeBtn } from './Celebration.styles';
import { Title, BottomBtn } from '../common.styles';

export interface CelebrationProps {
   event: event
};

const Celebration = (props: CelebrationProps) => {
   const [dialogOpen, setDialogOpen] = useState(false);
   const [dialogMessage, setDialogMessage] = useState("");

   return (
      <CelebrationDiv>
         <Title>
            <Typography variant="h4">Your event has been successfully registered!</Typography>
         </Title>
         <Message>
            <Typography variant="subtitle1">Would you like to be alerted when a new event is submitted that overlaps with your event?</Typography>
         </Message>
         <BottomBtn>
            <Button
               fullWidth
               color="primary"
               variant="contained"
               size="large"
               onClick={() => {
                  setDialogMessage("Great! You will receive alerts to your phone when an overlapping event is registered.");
                  setDialogOpen(true)
               }}
            >
               Yes
            </Button>
         </BottomBtn>
         <HomeBtn>
            <Button
               fullWidth
               color="default"
               variant="contained"
               size="large"
               onClick={() => {
               }}
            >
               Home
            </Button>
         </HomeBtn>
         <Dialog
            open={dialogOpen}
         >
            <DialogContent>
               <Typography variant="body1">{dialogMessage}</Typography>
               <DialogActions>
                  <Button onClick={() => {}} color="primary" autoFocus>
                     Got it
                  </Button>
               </DialogActions>
            </DialogContent>
         </Dialog>
      </CelebrationDiv>
   );
};

export default Celebration;