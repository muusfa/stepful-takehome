import { Stack } from '@mui/material'
import AppHeader from '../components/AppHeader'
import CoachSelect from '../components/CoachSelect'
import UpcomingCalls from '../components/UpcomingCallsStudent'

function StudentPage() {

  return (
    <>
      <AppHeader />
      <Stack flexDirection={"row"}>
        <CoachSelect />
        <UpcomingCalls />
      </Stack>
    </>
  )
}

export default StudentPage
