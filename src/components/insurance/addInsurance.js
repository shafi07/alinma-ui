import * as React from 'react';
import {
  Slide,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  TextField
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from "yup";
import { Formik } from "formik";

const subCategories = [
  {value:'add',label:'Add'},
  {value:'new',label:'New'}
]

const leftCss = {
  marginTop: 2,
  marginBottom: 2,
  marginRight:2,
}

const validationSchema = Yup.object({
  name: Yup.string().required("Enter Name)"),
  sponser_name: Yup.string().required("Enter Sponser Name"),
  id_number: Yup.string().required("Enter ID Number").length(10,'Iqama number length should be 10'),
  mobilenumber: Yup.string().required("Enter Mobile Number").matches(/^\d{10}$/,'mobile number length should be 10'),
  total_amount: Yup.number().required("Enter Amount"),
  balance:Yup.number(),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open,
  handleClose,
  loading = false,
  submitHandler,
  editData = null,
  editInsuranceHandler
}) {

  return (
    <Formik
    validationSchema={validationSchema}
      initialValues={{
        sub_category: editData ? editData.sub_category :"",
        name:editData ? editData.name :"",
        dob:editData ? editData.dob :"",
        sponser_name:editData ? editData.sponser_name : "",
        id_number:editData ? editData.id_number : "",
        total_amount:editData ? editData.total_amount : "",
        mobilenumber:editData ? editData.mobilenumber : "",
        paid_amount:null,
        balance:editData ? editData.balance : '',
        remarks:editData ? editData.remarks :'',
        agent_amount:editData ? editData.agent_amount :null,
        service:editData ? editData.service :null,
        paid_date:editData ? editData.paid_date:'',
        agent:editData ? editData.agent :'',
        company:editData ? editData.company :'',
        cr_number:editData ? editData.cr_number : "",
      }}
      onSubmit={(values, actions) => {
        values.paid_amount = values.paid_amount ? values.paid_amount :0
        values.agent_amount = values.agent_amount ? values.agent_amount : 0
        if(editData){
          editInsuranceHandler({...values,id:editData.id,status:editData.status},actions)
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
              {editData ? `INSURANCE-[${editData.createddate}]`:`INSURANCE`}
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
              id="name"
              sx = {leftCss}
              label="Customer name"
              name="name"
              type="text"
              size='small'
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
            <Grid item xs={4} >
            <TextField
              id="sponser_name"
              label="Sponser Name"
              name="sponser_name"
              type="text"
              size='small'
              fullWidth
              required
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
              label="Iqama Number"
              name="id_number"
              type="text"
              size='small'
              fullWidth
              required
              variant="outlined"
              helperText={touched.id_number ? errors.id_number : ""}
              error={touched.id_number && Boolean(errors.id_number)}
              value={values.id_number}
              onChange={handleChange("id_number")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="cr_number"
              sx = {leftCss}
              label="CR Number"
              name="cr_number"
              type="text"
              size='small'
              fullWidth
              required
              variant="outlined"
              helperText={touched.cr_number ? errors.cr_number  : ""}
              error={touched.cr_number  && Boolean(errors.cr_number )}
              value={values.cr_number }
              onChange={handleChange("cr_number")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="dob"
              sx = {leftCss}
              label="DOB"
              name="dob"
              type="text"
              size='small'
              fullWidth
              required
              variant="outlined"
              helperText={touched.dob ? errors.dob : ""}
              error={touched.dob && Boolean(errors.dob)}
              value={values.dob}
              onChange={handleChange("dob")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="company"
              sx = {leftCss}
              label="Company Name"
              name="company"
              type="text"
              size='small'
              fullWidth
              required
              variant="outlined"
              helperText={touched.company ? errors.company : ""}
              error={touched.company && Boolean(errors.company)}
              value={values.company}
              onChange={handleChange("company")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="sub_category"
              label="Add/New"
              name="sub_category"
              type="text"
              size='small'
              fullWidth
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
            <Grid item xs={4} >
            <TextField
              id="mobilenumber"
              label="Mobile Number"
              name="mobilenumber"
              type="text"
              size='small'
              fullWidth
              required
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
              id="agent_amount"
              label="Agent Amount"
              name="agent_amount"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.agent_amount ? errors.agent_amount : ""}
              error={touched.agent_amount && Boolean(errors.agent_amount)}
              value={values?.agent_amount || ''}
              onChange={(e)=>{setFieldValue('agent_amount',+e.target.value)}}
              sx = {leftCss}
            /> 
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="service"
              sx = {leftCss}
              InputLabelProps={{
                style: { color: '#BC3110' },
              }}
              label="Service Charge"
              name="service"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.service ? errors.service : ""}
              error={touched.service && Boolean(errors.service)}
              value={values?.service || ''}
              onChange={(e)=>{setFieldValue('service',+e.target.value)}}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="total_amount"
              sx = {leftCss}
              label="Total Amount"
              name="total_amount"
              type="number"
              size='small'
              fullWidth
              required
              disabled
              variant="outlined" 
              helperText={touched.total_amount ? errors.total_amount : ""}
              error={touched.total_amount && Boolean(errors.total_amount)}
              value={values.total_amount = Number(values.service)+Number(values.agent_amount)}
              onChange={handleChange("total_amount")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="paid_amount"
              label={editData?`Paid amount->>${editData.paid_amount}`:`Paid amount`}
              name="paid_amount"
              type="text"
              size='small'
              fullWidth
              required
              // disabled={editData}
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
              size='small'
              fullWidth
              disabled
              required
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
              label="Agent Name"
              name="agent"
              type="text"
              size='small'
              fullWidth
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
              size='small'
              fullWidth
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
              size='small'
              fullWidth
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
