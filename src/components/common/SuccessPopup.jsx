import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
  alpha,
  Slide,
  styled
} from '@mui/material';
import { Close as CloseIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SuccessIcon = styled(CheckCircleIcon)(({ theme }) => ({
  fontSize: 80,
  color: theme.palette.success.main,
  marginBottom: theme.spacing(2),
  filter: `drop-shadow(0 4px 8px ${alpha(theme.palette.success.main, 0.5)})`,
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    padding: theme.spacing(2),
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
    overflow: 'visible',
    position: 'relative',
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.grey[700],
    backgroundColor: alpha(theme.palette.grey[100], 0.8),
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  padding: theme.spacing(1.2, 3),
  fontSize: '1rem',
  fontWeight: 600,
  boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.25)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
  },
}));

const SuccessPopup = ({ 
  open, 
  title = "Success!", 
  message, 
  buttonText = "Continue", 
  onClose, 
  onAction 
}) => {
  const theme = useTheme();

  const handleAction = () => {
    if (onAction) onAction();
    if (onClose) onClose();
  };

  return (
    <StyledDialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <CloseButton onClick={onClose} aria-label="close">
        <CloseIcon />
      </CloseButton>
      
      <DialogTitle sx={{ 
        pb: 0, 
        textAlign: 'center', 
        fontWeight: 700, 
        fontSize: '1.6rem',
        color: theme.palette.text.primary,
        pt: 3,
      }}>
        {title}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          pt: 2, 
          pb: 2 
        }}>
          <SuccessIcon />
          
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              color: theme.palette.text.secondary,
              fontSize: '1.1rem',
              maxWidth: '90%',
              mx: 'auto'
            }}
          >
            {message}
          </Typography>
          
          <ActionButton 
            variant="contained" 
            color="primary" 
            onClick={handleAction}
          >
            {buttonText}
          </ActionButton>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default SuccessPopup; 