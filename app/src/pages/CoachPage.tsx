import { Stack } from '@mui/material'
import AppHeader from '../components/AppHeader'
import AvailableSlots from '../components/AvailableSlots'
import UpcomingCalls from '../components/UpcomingCalls'
import AddSlotModal from '../components/AddSlotModal';
import { useState } from 'react';
import PastCalls from '../components/PastCalls';
import CustomButton from '../components/Button';

function CoachPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AppHeader />
      <CustomButton onClick={() => setIsModalOpen(true)}>
        Add slot
      </CustomButton>
      <Stack flexDirection={"row"} gap={2}>
        <AvailableSlots />
        <UpcomingCalls />
        <PastCalls />
      </Stack>
      <AddSlotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default CoachPage
