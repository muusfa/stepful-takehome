import { useEffect, useState } from 'react';
import { API_URL } from '../constants/api';
import { Modal, Box, Typography, Stack } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { formatDate } from '../utils/dateUtils';
import CustomButton from './Button';
import CustomCard from './CustomCard';
import { Slot } from '../types/api';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  coach: number | undefined;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SelectSlotModal({ onClose, isOpen, coach }: Props) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const { coachId, studentId } = useAppContext();

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!coach) return;
      const result = await fetch(`${API_URL}/available-slots/${coach}`);
      const availableSlots: Slot[] = await result.json();
      setSlots(availableSlots);
    };

    fetchAvailableSlots();
  }, [coach])

  if (!isOpen) return;

  if (!slots.length) {
    return (
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={style}>
          <Typography>
            No available slots at the moment. Please try again later.
          </Typography>
        </Box>
      </Modal>
    )
  }

  const handleBook = async (id: number, startDate: string) => {
    await fetch(`${API_URL}/book`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ coachId: coachId, startTime: startDate, studentId: studentId, slotId: id }) });
    onClose();
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography>All available slots for this coach. Select one to schedule a call</Typography>
        {slots.map((slot) => (
          <Stack flexDirection={"row"}>
            <CustomCard>
              <Typography>
                Starting on: {formatDate(slot.startTime)}
              </Typography>
              <Typography>
                Duration: {slot.duration}hrs
              </Typography>
              <CustomButton key={slot.id} onClick={() => handleBook(slot.id, slot.startTime)}>
                Book
              </CustomButton>
            </CustomCard>
          </Stack>
        ))}
      </Box>
    </Modal>
  )
}
