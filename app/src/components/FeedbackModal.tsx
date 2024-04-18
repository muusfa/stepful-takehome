import { useState } from 'react';
import { API_URL } from '../constants/api';
import { Typography, Box, Modal, Rating, TextField } from '@mui/material';
import CustomButton from './Button';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  callId: number | undefined;
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

export default function FeedbackModal({ onClose, isOpen, callId }: Props) {
  const [notes, setNotes] = useState("")
  const [rating, setRating] = useState<number | null>(null);
  const handleSave = async () => {
    await fetch(`${API_URL}/feedback`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ callId: callId, notes: notes, rating: rating }) });
    onClose();
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography>Rate the call between 1-5</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue);
          }}
        />
        <Typography>
          Any additional notes?
        </Typography>
        <TextField onChange={(e) => setNotes(e.target.value)} />
        <CustomButton onClick={handleSave}>
          Save
        </CustomButton>
      </Box>
    </Modal>
  )
}
