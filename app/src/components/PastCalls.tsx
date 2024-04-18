import { useEffect, useState } from 'react';
import { API_URL } from '../constants/api';
import { useAppContext } from '../context/AppContext';
import { Box, Stack, Typography } from '@mui/material';
import FeedbackModal from './FeedbackModal';
import { formatDate } from '../utils/dateUtils';
import CustomButton from './Button';
import CustomCard from './CustomCard';
import { Call } from '../types/api';

export default function PastCalls() {
  const [pastCalls, setPastCalls] = useState<Call[]>([]);
  const [callId, setCallId] = useState<number>();
  const { coachId } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPastCalls = async () => {
      const result = await fetch(`${API_URL}/past-calls/${coachId}`);
      const availableSlots: Call[] = await result.json();
      setPastCalls(availableSlots);
    };

    fetchPastCalls();
  }, [coachId])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Typography>
          See your past calls below
        </Typography>
        {pastCalls.map((pastCall) => (
          <CustomCard>
            <Typography>
              Took place on: {formatDate(pastCall.startTime)}
            </Typography>
            <Typography>
              With student: {pastCall.student.email}
            </Typography>
            {!pastCall.feedback ? (
              <CustomButton onClick={() => {
                setIsOpen(true);
                setCallId(pastCall.id)
              }}>
                Click here to provide feedback
              </CustomButton>
            ) : (
              <Stack>
                <Typography>
                  Rating: {pastCall.feedback.rating}
                </Typography>
                <Typography>
                  Notes: {pastCall.feedback.notes}
                </Typography>
              </Stack>
            )}
          </CustomCard>
        ))}
      </Box>
      <FeedbackModal isOpen={isOpen} onClose={() => setIsOpen(false)} callId={callId} />
    </>
  )
}
