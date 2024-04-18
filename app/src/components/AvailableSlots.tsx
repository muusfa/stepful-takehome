import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants/api';
import { formatDate } from '../utils/dateUtils';
import CustomCard from './CustomCard';
import { Slot } from '../types/api';

export default function AvailableSlots() {
  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      const result = await fetch(`${API_URL}/available-slots/${1}`);
      const availableSlots: Slot[] = await result.json();
      setSlots(availableSlots);
    };

    fetchAvailableSlots();
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography>
        See your available slots below
      </Typography>
      {slots.map((slot) => (
        <CustomCard>
          <Typography>
            Starting on: {formatDate(slot.startTime)}
          </Typography>
          <Typography>
            Duration: {slot.duration}hrs
          </Typography>
        </CustomCard>
      ))}
    </Box>
  )
}
