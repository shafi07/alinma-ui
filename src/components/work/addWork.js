import * as React from 'react';
import { 
  Dialog, 
  Button, 
  Slide, 
  Typography, 
  IconButton, 
  DialogActions, 
  DialogContent, 
  Grid, 
  MenuItem, 
  TextField, 
  AppBar, 
  Toolbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from "yup";
import { Formik } from "formik";

const subCategories = [
  {value:'Sijil',label:'Sijil'},
  {value:'Ruksa',label:'Ruksa'},
]

const leftCss = {
  marginTop: 2,
  marginBottom: 2,
  marginRight:2,
}

const workType = [
  {value:'New',label:'New'},
  {value:'Renew',label:'Renew'},
  {value:'Update',label:'Update'},
  {value:'Cancel',label:'Cancel'},
  {value:'Transfer',label:'Transfer'},
  {value:'QR-Code',label:'QR-Code'},
  {value:'Difa Madani',label:'Difa Madani'},
]

const validationSchema = Yup.object({
  sub_category: Yup.string().required("Enter Category Name"),
  name: Yup.string().required("Enter Name"),
  sponser_name: Yup.string().required("Enter Sponser Name"),
  mobilenumber: Yup.string().required("Enter Mobile Number").matches(/^\d{10}$/,'mobile number length should be 10'),
  total_amount: Yup.number().required("Enter Amount"),
  balance:Yup.number(),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open,handleClose,loading,submitHandler,editData=null,editWorkHandler}) {

  return (
    <Formik
    validationSchema={validationSchema}
      initialValues={{
        sub_category:editData ? editData.sub_category : "",
        name:editData ? editData.name : "",
        agent:editData ? editData.agent : "",
        sponser_name:editData ? editData.sponser_name : "",
        id_number:editData ? editData.id_number : "",
        total_amount:editData ? editData.total_amount : "",
        mobilenumber:editData ? editData.mobilenumber : "",
        paid_amount:null,
        balance: editData ? editData.balance :'',
        remarks:editData ? editData.remarks :'',
        agent_amount:editData ? editData.agent_amount :null,
        government_fee:editData ? editData.government_fee :null,
        service:editData ? editData.service :null,
        paid_date:editData ? editData.paid_date :'',
        work_type:editData?.work_type || '',
      }}
      onSubmit={(values, actions) => {
        values.paid_amount = values.paid_amount ? values.paid_amount :0
        if(editData){
          editWorkHandler({...values,id:editData.id,status:editData.status},actions)
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
        onClose={()=>{handleClose();resetForm()}}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {editData ? `WORK-[${editData.createddate}]`:`WORK`}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => handleSubmit()}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent >
          <Grid container rowSpacing={1} spacing={{xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
            <Grid item xs={4} >
            <TextField
              id="sub_category"
              label="Sub Category"
              name="sub_category"
              type="text"
              fullWidth
              autoFocus
              required
              size='small'
              select={true}
              variant="outlined"
              helperText={touched.sub_category ? errors.sub_category : ""}
              error={touched.sub_category && Boolean(errors.sub_category)}
              value={values.sub_category}
              onChange={handleChange("sub_category")}
              sx = {leftCss}
            >
              {subCategories.map(option => (
             <MenuItem sx={{color:'red'}} key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
            ))}
            </TextField> 
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="name"
              sx = {leftCss}
              label="Customer name"
              name="name"
              type="text"
              fullWidth
              autoFocus
              required
              size='small'
              variant="outlined"
              helperText={touched.name ? errors.name : ""}
              error={touched.name && Boolean(errors.name)}
              value={values.name}
              onChange={handleChange("name")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="sponser_name"
              label="Sponser Name"
              name="sponser_name"
              type="text"
              fullWidth
              autoFocus
              required
              size='small'
              variant="outlined"
              helperText={touched.sponser_name ? errors.sponser_name : ""}
              error={touched.sponser_name && Boolean(errors.sponser_name)}
              value={values.sponser_name}
              onChange={handleChange("sponser_name")}
              sx = {leftCss}
            /> 
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="id_number"
              sx = {leftCss}
              label="Number"
              name="id_number"
              type="text"
              fullWidth
              autoFocus
              size='small'
              required ={values.sub_category == 'New Ruksa' ? false :true}
              variant="outlined"
              helperText={touched.id_number ? errors.id_number : ""}
              error={touched.id_number && Boolean(errors.id_number)}
              value={values.id_number}
              onChange={handleChange("id_number")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="mobilenumber"
              label="Mobile Number"
              name="mobilenumber"
              type="text"
              fullWidth
              autoFocus
              required
              size='small'
              variant="outlined"
              helperText={touched.mobilenumber ? errors.mobilenumber : ""}
              error={touched.mobilenumber && Boolean(errors.mobilenumber)}
              value={values.mobilenumber}
              onChange={handleChange("mobilenumber")}
              sx = {leftCss}
            /> 
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="work_type"
              label="Type"
              name="work_type"
              type="text"
              fullWidth
              size='small'
              autoFocus
              required
              select={true}
              variant="outlined"
              helperText={touched.work_type ? errors.work_type : ""}
              error={touched.work_type && Boolean(errors.work_type)}
              value={values.work_type}
              onChange={handleChange("work_type")}
              sx = {leftCss}
            >
              {workType.map(option => (
             <MenuItem sx={{color:'red'}} key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
            ))}
            </TextField> 
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="service"
              label="Service Charge"
              name="service"
              type="text"
              fullWidth
              autoFocus
              required
              size='small'
              variant="outlined"
              helperText={touched.service ? errors.service : ""}
              error={touched.service && Boolean(errors.service)}
              value={values.service}
              onChange={(e)=>{setFieldValue('service',+e.target.value)}}
              sx = {leftCss}
              InputLabelProps={{
                style: { color: '#BC3110' },
              }}
            /> 
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="agent_amount"
              sx = {leftCss}
              label="Agent Amount"
              name="agent_amount"
              type="text"
              fullWidth
              size='small'
              autoFocus
              variant="outlined" 
              helperText={touched.agent_amount ? errors.agent_amount : ""}
              error={touched.agent_amount && Boolean(errors.agent_amount)}
              value={values.agent_amount}
              onChange={(e)=>{setFieldValue('agent_amount',+e.target.value)}}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="government_fee"
              sx = {leftCss}
              label="Government Fee"
              name="government_fee"
              type="text"
              fullWidth
              autoFocus
              size='small'
              variant="outlined" 
              helperText={touched.government_fee ? errors.government_fee : ""}
              error={touched.government_fee&& Boolean(errors.government_fee)}
              value={values.government_fee}
              onChange={(e)=>{setFieldValue('government_fee',+e.target.value)}}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="total_amount"
              sx = {leftCss}
              label="Total Amount"
              name="total_amount"
              type="number"
              fullWidth
              autoFocus
              disabled
              required
              size='small'
              variant="outlined" 
              helperText={touched.total_amount ? errors.total_amount : ""}
              error={touched.total_amount && Boolean(errors.total_amount)}
              value={values.total_amount=(Number(values.agent_amount) + Number(values.service) + Number(values.government_fee))}
              onChange={handleChange("total_amount")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="paid_amount"
              label={editData?`Paid amount->>${editData.paid_amount}`:`Paid amount`}
              name="paid_amount"
              type="text"
              fullWidth
              // disabled = {editData}
              autoFocus
              required
              size='small'
              variant="outlined"
              helperText={touched.paid_amount ? errors.paid_amount : ""}
              error={touched.paid_amount && Boolean(errors.paid_amount)}
              value={values?.paid_amount || ''}
              onChange={(e)=>{setFieldValue('paid_amount',+e.target.value)}}
              sx = {leftCss}
            /> 
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="balance"
              sx = {leftCss}
              label="Balance Amount"
              name="balance"
              type="number"
              fullWidth
              autoFocus
              disabled
              required
              size='small'
              variant="outlined"
              helperText={touched.balance ? errors.balance : ""}
              error={touched.balance && Boolean(errors.balance)}
                  value={values.balance = editData ? (Number(editData.balance_amount) - Number(values.paid_amount)) : (Number(values.total_amount) - Number(values.paid_amount))}
              onChange={handleChange("balance")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="agent"
              sx = {leftCss}
              label="Agent"
              name="agent"
              type="text"
              fullWidth
              autoFocus
              size='small'
              variant="outlined"
              helperText={touched.agent ? errors.agent : ""}
              error={touched.agent && Boolean(errors.agent)}
              value={values.agent}
              onChange={handleChange("agent")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="paid_date"
              sx = {leftCss}
              label="Agent Paid Date"
              name="paid_date"
              type="Text"
              fullWidth
              autoFocus
              size='small'
              variant="outlined"
              helperText={touched.paid_date ? errors.paid_date : ""}
              error={touched.paid_date && Boolean(errors.paid_date)}
              value={values.paid_date}
              onChange={handleChange("paid_date")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="remarks"
              sx = {leftCss}
              label="Remarks"
              name="remarks"
              type="text"
              fullWidth
              autoFocus
              size='small'
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
