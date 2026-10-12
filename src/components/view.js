import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(640px, calc(100vw - 32px))',
  maxWidth: 'calc(100% - 32px)',
  bgcolor: 'background.paper',
  borderRadius: 3,
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: '0 24px 48px rgba(14, 18, 24, 0.16)',
  p: 3,
};

const divStyle = {
    display:"flex",
    flexDirection:'column',
    top: '50%',
    left: '50%',
    alignItems:"center",
    justifyContent:'center'
  };

export default function View({open,viewData,handleClose}) {

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" sx={{ mb: 1 }}>
            {viewData?.remarks || "No remarks"}
          </Typography>
          <div style={divStyle} >
               {(viewData.amount_paid_dates).map((row)=>  
                   <Typography id={row.date} sx={{ mt: 1.5, color: 'primary.dark', fontWeight: 600 }}>
                       {`${row.date}---------SR.${row.amount}`}
                   </Typography>
               ) }  
          </div>
        </Box>
      </Modal>
  );
}
