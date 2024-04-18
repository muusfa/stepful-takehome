import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants/api';
import SelectSlotModal from './SelectSlotModal';
import { useAppContext } from '../context/AppContext';
import CustomCard from './CustomCard';
import { Coach } from '../types/api';

export default function CoachSelect() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [coach, setCoach] = useState<number | undefined>();
  const { setCoachId } = useAppContext();

  useEffect(() => {
    const fetchAllCoaches = async () => {
      const result = await fetch(`${API_URL}/all-coaches`);
      const coaches: Coach[] = await result.json();
      setCoaches(coaches);
    };

    fetchAllCoaches();
  }, [])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Typography>
          Select a coach below to see their available slots
        </Typography>
        {coaches.map((coach) => (
          <CustomCard key={coach.id} onClick={() => {
            setIsOpen(true);
            setCoach(coach.id);
            setCoachId(coach.id);
          }}>
            <Typography>
              Email: {coach.email}
            </Typography>
          </CustomCard>
        ))}
      </Box>
      <SelectSlotModal coach={coach} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
