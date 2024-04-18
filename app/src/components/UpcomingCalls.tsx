import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants/api';
import { useAppContext } from '../context/AppContext';
import { formatDate } from '../utils/dateUtils';
import CustomCard from './CustomCard';
import { Stack } from '@mui/material';
import { Call } from '../types/api';

export default function UpcomingCalls() {
  const [upcomingCalls, setUpcomingCalls] = useState<Call[]>([]);
  const { coachId } = useAppContext();

  useEffect(() => {
    const fetchUpcomingCalls = async () => {
      const result = await fetch(`${API_URL}/upcoming-calls/${coachId}`);
      const calls: Call[] = await result.json();
      setUpcomingCalls(calls);
    };

    fetchUpcomingCalls();
  }, [coachId])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography>
        See your upcoming calls below
      </Typography>
      <Stack gap={1}>
        {upcomingCalls.map((upcomingCall) => (
          <Box key={upcomingCall.id}>
            <CustomCard>
              <Typography>
                Starting on: {formatDate(upcomingCall.startTime)}
              </Typography>
              <Typography>
                With student: {upcomingCall.student.email}
              </Typography>
              <Typography>
                Student phone number: {upcomingCall.student.phoneNumber}
              </Typography>
            </CustomCard>
          </Box>
        ))}
      </Stack >
    </Box>
  )
}
