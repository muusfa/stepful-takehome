import { Box, useTheme } from '@mui/material';

type CustomCardProps = {
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomCard = ({ children, onClick }: CustomCardProps) => {
  const theme = useTheme();
  // Define custom styles using makeStyles
  const cardStyle = {
    backgroundColor: theme.palette.background.paper,
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  };


  const cardContentStyle = {
    textAlign: 'center',
  }

  return (
    <Box sx={cardStyle} onClick={onClick}>
      <Box sx={cardContentStyle}>
        {children}
      </Box>
    </Box>
  );
};

export default CustomCard;
