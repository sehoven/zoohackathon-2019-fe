import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { LandingDiv, Activity, Activities } from './Landing.styles';
import { Title, BottomBtn, Message } from '../common.styles';
import { Typography, Button } from '@material-ui/core';
import ActivityCard from '../../components/ActivityCard/ActivityCard';

interface LandingProps { }

const Landing = (props: LandingProps & RouteComponentProps) => {
  const [activities, setActivities] = useState(Array<activity>());

  useEffect(() => {
    // Do api call
    setActivities([
      {
        location: {
          long: -16.400251,
          lat: 19.942287,
          radius: 1000
        },
        dateRange: {
          startDate: 1572643422,
          endDate: 1574285022
        }
      },
      {
        location: {
          long: -16.400251,
          lat: 19.942287,
          radius: 1000
        },
        dateRange: {
          startDate: 1572643422,
          endDate: 1574285022
        }
      },
      {
        location: {
          long: -16.400251,
          lat: 19.942287,
          radius: 1000
        },
        dateRange: {
          startDate: 1572643422,
          endDate: 1574285022
        }
      }
    ]);
  }, []);

  return (
    <LandingDiv>
      <Title><Typography variant="h4">Hi, there.</Typography></Title>
      {activities.length ? 
        <>
          <Message>
            <Typography variant="body1">Here are your activities</Typography>
          </Message>
          <Activities>
            {activities.map((activity, idx) => {
              return <Activity key={idx}><ActivityCard activity={activity}/></Activity>
            })}
          </Activities>
        </>
      : <Typography variant="body1">You currently do not have any scheduled activities</Typography>
      }
      <BottomBtn width={180}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            size="large"
            onClick={() => {props.history.push('/search')}}
          >
            Create Activity
         </Button>
        </BottomBtn>
    </LandingDiv>
  );
};

export default withRouter(Landing);