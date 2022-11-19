import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
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
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" color='red' >
            {viewData.remarks?viewData.remarks:'test'}
          </Typography>
          <div style={divStyle} >
               {(viewData.amount_paid_dates).map((row)=>  
                   <Typography id={row.date} sx={{ mt: 2,color:'blue' }}>
                       {`${row.date}---------SR.${row.amount}`}
                   </Typography>
               ) }  
          </div>
        </Box>
      </Modal>
  );
}
