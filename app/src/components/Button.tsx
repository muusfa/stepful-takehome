import { Button, useTheme } from '@mui/material';


export type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
}

const CustomButton = ({ onClick, children }: ButtonProps) => {
  const theme = useTheme();

  const style = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: '10px',
    padding: '10px 20px',
    borderRadius: '5px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  };
  return (
    <Button
      sx={style}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;