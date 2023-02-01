import { useState,useEffect,useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Dialog, Stack, DialogActions, DialogContent, DialogTitle, TextField, Radio } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from "yup";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function BasicModal({open,handleClose,editData={},editHandler,loading}) {
const[agent,setAgent]=useState(false)
// console.log('////',editData)

const validationSchema = !agent ? 
Yup.object({
  paid_amount: !agent ? Yup.number().required("Enter Amount") : null,
}):
Yup.object({
  agent_amount: agent ? Yup.number().required("Enter Amount") : null,
});

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        total_amount:editData?editData.total_amount:'',
        balance_amount:editData?editData.balance_amount:'',
        paid_amount:'',
        agent_amount:editData ? editData.agent_amount:'',
        paid_date:editData ? editData.paid_date:'',
        agent:editData ? editData.agent:'',
      }}
      onSubmit={(values, actions) => {
        if(agent){
          let{ total_amount, balance_amount, paid_amount, ...newObj} = values
          editHandler({id:editData.id,...newObj})
        }else{
          let{ agent_amount, paid_date, agent, ...newObj2} = values
          editHandler({id:editData.id,...newObj2})
        }
        
      }}
    >
      {({
        handleSubmit,
        errors,
        setFieldValue,
        handleChange,
        touched,
        values,
      }) => (
        <Dialog 
        open={open} 
        aria-labelledby="form-dialog-title" 
        onClose={handleClose}
        onKeyUp={(e)=>{
          if(e.key === 'Enter'){
            handleSubmit();
            handleClose();
          }
        }}
         >
          <Stack direction="row" alignItems="center" justifyContent="space-evenly" >
          <DialogTitle id="form-dialog-title">{ agent ?'Update Agent' : 'Update Bill'}</DialogTitle>
          <Radio
          onClick={()=>setAgent(!agent)}
          checked={agent === true}
          />
          </Stack>
          <DialogContent>
            {Boolean(errors.image) && (
              <Typography color="error" variant="body2" gutterBottom>
                {errors.image}
              </Typography>
            )}
            {!agent ? <><TextField
              id="total_amount"
              label="Total Amount"
              name="total_amount"
              type="number"
              fullWidth
              required
              disabled
              variant="outlined"
              helperText={touched.total_amount ? errors.total_amount : ""}
              error={touched.total_amount && Boolean(errors.total_amount)}
              value={values.total_amount}
              onChange={handleChange("total_amount")}
              sx={{
                marginTop: 2,
                marginBottom: 2,
                marginRight: 2
              }} /><TextField
                id="balance_amount"
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  marginRight: 2
                }}
                label="Balance Amount"
                name="balance_amount"
                type="number"
                fullWidth
                autoFocus
                disabled
                required
                variant="outlined"
                helperText={touched.balance_amount ? errors.balance_amount : ""}
                error={touched.balance_amount && Boolean(errors.balance_amount)}
                value={values.balance_amount - values.paid_amount}
                onChange={handleChange("balance_amount")} />
                <TextField
                id="paid_amount"
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  marginRight: 2
                }}
                label="Paid Amount"
                name="paid_amount"
                type="number"
                fullWidth
                autoFocus
                required
                variant="outlined"
                helperText={touched.paid_amount ? errors.paid_amount : ""}
                error={touched.paid_amount && Boolean(errors.paid_amount)}
                value={values.paid_amount}
                onChange={handleChange("paid_amount")} /></>
                :
                <>
                <TextField
                  id="paid_date"
                  sx={{
                    marginTop: 2,
                    marginBottom: 2,
                    marginRight: 2
                  }}
                  label="Agent Paid Date"
                  name="paid_date"
                  type="text"
                  fullWidth
                  required
                  variant="outlined"
                  helperText={touched.paid_date ? errors.paid_date : ""}
                  error={touched.balance_amount && Boolean(errors.paid_date)}
                  value={values.paid_date}
                  onChange={handleChange("paid_date")} />
                  <TextField
                  id="agent"
                  sx={{
                    marginTop: 2,
                    marginBottom: 2,
                    marginRight: 2
                  }}
                  label="Agent Name"
                  name="agent"
                  type="text"
                  fullWidth
                  required
                  variant="outlined"
                  helperText={touched.agent ? errors.agent : ""}
                  error={touched.agent && Boolean(errors.agent)}
                  value={values.agent}
                  onChange={handleChange("agent")} /> 
                <TextField
                id="agent_amount"
                label="Agent Amount"
                name="agent_amount"
                type="number"
                fullWidth
                required
                variant="outlined"
                helperText={touched.agent_amount ? errors.agent_amount : ""}
                error={touched.agent_amount && Boolean(errors.agent_amount)}
                value={values.agent_amount}
                onChange={handleChange("agent_amount")}
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  marginRight: 2
                }} />
                  </>
                }
          </DialogContent>
          {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
          <DialogActions>
            {/* {!loading && ( */}
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            {/* )} */}
            <Button
              onClick={() => handleSubmit()}
              color="primary"
              variant="contained"
              disabled={loading}
              type="submit"
            >Submit
              {/* {loading || editLoading ? "Saving ..." : "Submit"} */}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
}
