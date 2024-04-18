import { Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../components/Button';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Stack alignItems={"center"} width="100%">
        <Stack>
          <Typography>
            Select a role to get started
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={2}>
          <CustomButton onClick={() => navigate('/coach')}>
            Coach
          </CustomButton>
          <CustomButton onClick={() => navigate('/student')}>
            Student
          </CustomButton>
        </Stack>
      </Stack>


    </>
  )
}

export default LandingPage
