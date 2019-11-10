import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { LandingDiv, Activity, Activities } from './Landing.styles';
import { Title, BottomBtn, Message } from '../common.styles';
import { Typography, Button } from '@material-ui/core';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import { getMyEvents } from '../../api';

interface LandingProps { }

const Landing = (props: LandingProps & RouteComponentProps) => {
  const [activities, setActivities] = useState(Array<activity>());

  useEffect(() => {
    getMyEvents().then((res) => {
      console.log(res.data);
      const gatheredActivities = res.data.map((obj: any) => {
        return {
          location: {
            long: obj.loc.coordinates[0],
            lat: obj.loc.coordinates[1],
            radius: obj.radius
          },
          dateRange: {
            startDate: new Date(obj.start).getTime()/1000,
            endDate: new Date(obj.end).getTime()/1000
          }
        }
      });
      setActivities(gatheredActivities);
    });
  }, []);

  return (
    <LandingDiv>
      <Title><Typography variant="h4">Hi, there.</Typography></Title>
      {activities.length ? 
        <>
          <Message>
            <Typography variant="body1">Here are your operations:</Typography>
          </Message>
          <Activities>
            {activities.map((activity, idx) => {
              return <Activity key={idx}><ActivityCard activity={activity}/></Activity>
            })}
          </Activities>
        </>
      : <Message><Typography variant="body1">You currently do not have any scheduled operations.</Typography></Message>
      }
      <BottomBtn width={180}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            size="large"
            onClick={() => {props.history.push('/search')}}
          >
            Create Operation
         </Button>
        </BottomBtn>
    </LandingDiv>
  );
};

export default withRouter(Landing);