import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { API_URL } from '../constants/api';
import { Modal } from '@mui/material';
import { DateTimeField } from '@mui/x-date-pickers';
import { useAppContext } from '../context/AppContext';
import CustomButton from './Button';

type Props = {
  onClose: () => void;
  isOpen: boolean;
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

export default function AddSlotModal({ onClose, isOpen }: Props) {
  const [date, setDate] = useState<Date | null>(null);
  const { coachId } = useAppContext();

  const handleSave = async () => {
    await fetch(`${API_URL}/create-slot`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ coachId: coachId, startTime: date }) });
    onClose();
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography>When should this slot begin?</Typography>
        <DateTimeField onChange={(newValue) => setDate(newValue)} />
        <CustomButton onClick={handleSave}>
          Save
        </CustomButton>
      </Box>
    </Modal>
  )
}
