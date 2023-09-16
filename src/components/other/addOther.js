import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import * as Yup from "yup";
import { Formik } from "formik";
import {DialogActions,DialogContent,Grid,MenuItem,TextField} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const subCategories = [
  {value:'Baladiya Card',label:'Baladiya Card'},
  {value:'Renew Pasport',label:'Renew Pasport'},
  {value:'Vaccine',label:'Vaccine'},
  {value:'Salary Transfer',label:'Salary Transfer'},
  {value:'Qiwa',label:'Qiwa'},
  {value:'Certificate',label:'Certificate'},
]

const validationSchema = Yup.object({
  sub_category: Yup.string().required("Enter Category Name"),
  name: Yup.string().required("Enter Name"),
  id_number: Yup.string().required("Enter ID Number").length(10,'Iqama number length should be 10'),
  mobileNumber: Yup.string().required("Enter Mobile Number").matches(/^\d{10}$/,'mobile number length should be 10'),
  total_amount: Yup.number().required("Enter Amount"),
  balance:Yup.number(),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open,handleClose,loading,submitHandler,editData=null,editOtherHandler}) {

  return (
    <Formik
    validationSchema={validationSchema}
      initialValues={{
        sub_category:editData ? editData.sub_category : "",
        name: editData ? editData.name : "",
        sponser_name:editData ? editData.sponser_name :  "",
        id_number:editData ? editData.id_number :  "",
        total_amount:editData ? editData.total_amount :  "",
        mobileNumber:editData ? editData.mobilenumber :  "",
        paid_amount:editData ? editData.paid_amount :  null,
        balance:editData ? editData.balance :  '',
        remarks:editData ? editData.remarks : '',
        agent:editData ? editData.agent : '',
        agent_amount:editData ? editData.agent_amount : null,
        service:editData ? editData.service : null,
        paid_date:editData ? editData.paid_date : ''
      }}
      onSubmit={(values, actions) => {
        values.paid_amount = values.paid_amount ? values.paid_amount :0
        if(editData){
          editOtherHandler({...values,id:editData.id},actions)
        }else{
          submitHandler(values,actions)
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
      resetForm
      }) => (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>{handleClose();resetForm()}}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              OTHER
            </Typography>
            <Button autoFocus color="inherit" onClick={() => handleSubmit()}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent >
          <Grid container >
            <Grid item xs={6} >
            <TextField
              id="sub_category"
              label="Sub Category"
              name="sub_category"
              type="text"
              fullWidth
              autoFocus
              required
              select={true}
              variant="outlined"
              helperText={touched.sub_category ? errors.sub_category : ""}
              error={touched.sub_category && Boolean(errors.sub_category)}
              value={values.sub_category}
              onChange={handleChange("sub_category")}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2,
                input: { color: 'red' }
              }}
            >
              {subCategories.map(option => (
             <MenuItem sx={{color:'red'}} key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
            ))}
            </TextField> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="name"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2,
              }}
              label="Customer name"
              name="name"
              type="text"
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.name ? errors.name : ""}
              error={touched.name && Boolean(errors.name)}
              value={values.name}
              onChange={handleChange("name")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="sponser_name"
              label="Sponser Name"
              name="sponser_name"
              type="text"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.sponser_name ? errors.sponser_name : ""}
              error={touched.sponser_name && Boolean(errors.sponser_name)}
              value={values.sponser_name}
              onChange={handleChange("sponser_name")}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="id_number"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2,
              }}
              label="Iqama Number"
              name="id_number"
              type="text"
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.id_number ? errors.id_number : ""}
              error={touched.id_number && Boolean(errors.id_number)}
              value={values.id_number}
              onChange={handleChange("id_number")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="mobileNumber"
              label="Mobile Number"
              name="mobileNumber"
              type="text"
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.mobileNumber ? errors.mobileNumber : ""}
              error={touched.mobileNumber && Boolean(errors.mobileNumber)}
              value={values.mobileNumber}
              onChange={handleChange("mobileNumber")}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="agent_amount"
              label="Agent amount"
              name="agent_amount"
              type="number"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.agent_amount ? errors.agent_amount : ""}
              error={touched.agent_amount && Boolean(errors.agent_amount)}
              value={values.agent_amount}
              onChange={handleChange("agent_amount")}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2,
              }}
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="service"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
              InputLabelProps={{
                style: { color: '#BC3110' },
              }}
              label="Service Charge"
              name="service"
              type="number"
              fullWidth
              autoFocus
              required
              variant="outlined" 
              helperText={touched.service ? errors.service : ""}
              error={touched.service && Boolean(errors.service)}
              value={values.service}
              onChange={handleChange("service")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="total_amount"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2,
              }}
              label="Total Amount"
              name="total_amount"
              type="number"
              fullWidth
              autoFocus
              required
              variant="outlined" 
              helperText={touched.total_amount ? errors.total_amount : ""}
              error={touched.total_amount && Boolean(errors.total_amount)}
              value={values.total_amount=(Number(values.agent_amount)+Number(values.service))}
              onChange={handleChange("total_amount")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="paid_amount"
              label={editData?`Paid amount-${editData.paid_amount}`:`Paid amount`}
              name="paid_amount"
              type="number"
              disabled = {editData}
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.paid_amount ? errors.paid_amount : ""}
              error={touched.paid_amount && Boolean(errors.paid_amount)}
              value={values.paid_amount}
              onChange={handleChange("paid_amount")}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="balance"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2,
              }}
              label="Balance Amount"
              name="balance"
              type="number"
              fullWidth
              autoFocus
              disabled
              required
              variant="outlined"
              helperText={touched.balance ? errors.balance : ""}
              error={touched.balance && Boolean(errors.balance)}
              value={values.balance =(Number(values.total_amount)-Number(values.paid_amount))}
              onChange={handleChange("balance")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="agent"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
              label="Agent Name"
              name="agent"
              type="text"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.agent ? errors.agent : ""}
              error={touched.agent && Boolean(errors.agent)}
              value={values.agent}
              onChange={handleChange("agent")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="paid_date"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2,
              }}
              label="Agent Paid Date"
              name="paid_date"
              type="Text"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.paid_date ? errors.paid_date : ""}
              error={touched.paid_date && Boolean(errors.paid_date)}
              value={values.paid_date}
              onChange={handleChange("paid_date")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="remarks"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
              label="Remarks"
              name="remarks"
              type="text"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.remarks ? errors.remarks : ""}
              error={touched.remarks && Boolean(errors.remarks)}
              value={values.remarks}
              onChange={handleChange("remarks")}
            />
            </Grid>
          </Grid>
          </DialogContent>
          <DialogActions>
            {/* {!loading && ( */}
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            {/* )} */}
            <Button
              onClick={() => handleSubmit()}
              color="primary"
              disabled={loading}
            >
              {/* {loading || editLoading ? "Saving ..." : "Submit"} */} Submit
            </Button>
          </DialogActions>
      </Dialog>
      )}
    </Formik>
  );
}
