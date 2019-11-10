import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Typography, Button, Dialog, DialogActions, Switch } from '@material-ui/core';
import { CelebrationDiv, CelebrationMessage, DialogContent, HomeBtn } from './Celebration.styles';
import { Title, BottomBtn } from '../common.styles';

export interface CelebrationProps {
   activity: activity
};

const Celebration = (props: CelebrationProps & RouteComponentProps) => {
   const [dialogOpen, setDialogOpen] = useState(false);
   const [dialogMessage, setDialogMessage] = useState("");
   const [isChecked, setIsChecked] = useState(false);

   const handleChange = (e: any, checked: boolean) => {
      setIsChecked(checked);
      if (checked) {
         setDialogMessage("Great! You will receive alerts to your phone when an overlapping activity is registered.");
         setDialogOpen(true);
      }
   }

   return (
      <CelebrationDiv>
         <Title>
            <Typography variant="h4">Your activity has been successfully registered!</Typography>
         </Title>
         <CelebrationMessage>
            <Switch
               checked={isChecked}
               onChange={handleChange}
               value={"receive-alerts-checked"}
               color="primary"
               inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Typography variant="subtitle1">Receive alerts when a new activity is registered that overlaps with your activity?</Typography>
         </CelebrationMessage>
         
         <BottomBtn width={160}>
            <Button
               fullWidth
               color="primary"
               variant="contained"
               size="large"
               onClick={() => {props.history.push('/')}}
            >
               Take me home
            </Button>
         </BottomBtn>
         <Dialog
            open={dialogOpen}
         >
            <DialogContent>
               <Typography variant="body1">{dialogMessage}</Typography>
               <DialogActions>
                  <Button color="primary" autoFocus onClick={() => {setDialogOpen(false)}}>
                     Got it
                  </Button>
               </DialogActions>
            </DialogContent>
         </Dialog>
      </CelebrationDiv>
   );
};

export default withRouter(Celebration);