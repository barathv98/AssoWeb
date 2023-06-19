import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import useGeneral from '../../../useGeneral';

interface SnackbarProps {
    text: string;
}
const SimpleSnackbar: React.FC<SnackbarProps> = ({ text }) => {
  const { showSnackbar, setShowSnackbar } = useGeneral();
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  React.useEffect(() => {
    setInterval(() => {
        setShowSnackbar(false);
    }, 4000);
  }, [showSnackbar, setShowSnackbar]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
        message={text}
        action={<></>}
      />
    </div>
  );
};

export default SimpleSnackbar;
