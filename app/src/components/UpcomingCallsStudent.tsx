import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants/api';
import { useAppContext } from '../context/AppContext';
import { formatDate } from '../utils/dateUtils';
import CustomCard from './CustomCard';
import { Call } from '../types/api';

export default function UpcomingCalls() {
  const [upcomingCalls, setUpcomingCalls] = useState<Call[]>([]);
  const { studentId } = useAppContext();

  useEffect(() => {
    const fetchUpcomingCalls = async () => {
      const result = await fetch(`${API_URL}/upcoming-calls-student/${studentId}`);
      const calls: Call[] = await result.json();
      setUpcomingCalls(calls);
    };

    fetchUpcomingCalls();
  }, [studentId])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography>
        See your upcoming calls below
      </Typography>
      {upcomingCalls.map((upcomingCall) => (
        <CustomCard>
          <Typography>
            Starting on: {formatDate(upcomingCall.startTime)}
          </Typography>
          <Typography>
            With coach: {upcomingCall.coach.email}
          </Typography>
          <Typography>
            Coach phone number: {upcomingCall.coach.phoneNumber}
          </Typography>
        </CustomCard>
      ))}
    </Box>
  )
}
