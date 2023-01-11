import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import * as Yup from "yup";
import { Formik } from "formik";
import {DialogActions,DialogContent,Grid,InputLabel,MenuItem,Select,TextField} from "@mui/material";
// import {makeStyles} from "@mui/styles";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const subCategories = [
  {value:'Work Visa',label:'Work Visa'},
  {value:'Visit Visa',label:'Visit Visa'},
  {value:'Visa Chamber',label:'Visa Chamber'},
  {value:'Wakala',label:'Wakala'},
]

const cssArray=['Visa Chamber','Wakala']

const validationSchema = Yup.object({
  sub_category: Yup.string().required("Enter Category Name"),
  name: Yup.string().required("Enter Name"),
  id_number: Yup.string().required("Enter ID Number").length(10,'Iqama number length should be 10'),
  mobileNumber: Yup.string().required("Enter Mobile Number").matches(/^\d{10}$/,'mobile number length should be 10'),
  // paid_amount: Yup.number().required("Enter Amount"),
  visa_number: Yup.string().when("sub_category",{is:"Wakala",then:Yup.string().required("Enter Visa Number")}),
  balance:Yup.number(),
});

const leftCss = {
  marginTop: 2,
  marginBottom: 2,
  marginRight:2,
}

const rightCss = {
  marginTop: 2,
  marginBottom: 2,
  marginLeft:2,
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open,handleClose,loading,submitHandler}) {

  return (
    <Formik
    validationSchema={validationSchema}
      initialValues={{
        sub_category:"",
        name:"",
        sponser_name: "",
        id_number: "",
        total_amount: "",
        mobileNumber: "",
        paid_amount: null,
        balance: '',
        remarks:'',
        agent:'',
        agent_amount:null,
        service:null,
        paid_date:null,
        visa_number:'',
        chamber_amount:null
      }}
      onSubmit={(values, actions) => {
        values.paid_amount = values.paid_amount ? values.paid_amount :0
        submitHandler(values)
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
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Visa
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
              sx = {{...leftCss,input: { color: 'red' }}}
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
              sx = {rightCss}
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
              sx = {leftCss}
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
              label={['Wakala','Work Visa'].includes(values.sub_category) ?'ID Number':'Iqama Number'}
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
            {values.sub_category == "Wakala" && <Grid item xs={6} >
            <TextField
              id="visa_number"
              sx = {leftCss}
              label="Visa Number"
              name="visa_number"
              type="text"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.visa_number ? errors.visa_number : ""}
              error={touched.visa_number && Boolean(errors.visa_number)}
              value={values.visa_number}
              onChange={handleChange("visa_number")}
            />
            </Grid>}
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
              sx = {values.sub_category == "Wakala" ? rightCss : leftCss}
            /> 
            </Grid>
            {values.sub_category != "Visa Chamber" &&<Grid item xs={6} >
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
              sx = {values.sub_category == "Wakala" ? leftCss : rightCss}
            /> 
            </Grid>}
            {cssArray.includes(values.sub_category) && <Grid item xs={6} >
            <TextField
              id="chamber_amount"
              sx = {rightCss}
              label="Chamber Amount"
              name="chamber_amount"
              type="text"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.chamber_amount ? errors.chamber_amount : ""}
              error={touched.chamber_amount && Boolean(errors.chamber_amount)}
              value={values.chamber_amount}
              onChange={handleChange("chamber_amount")}
            />
            </Grid>}
            <Grid item xs={6} >
            <TextField
              id="service"
              sx = {leftCss }
              label="Service Charge"
              name="service"
              InputLabelProps={{
                style: { color: '#BC3110' },
              }}
              type="number"
              fullWidth
              autoFocus
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
              sx = {rightCss}
              label="Total Amount"
              name="total_amount"
              type="number"
              fullWidth
              autoFocus
              required
              variant="outlined" 
              helperText={touched.total_amount ? errors.total_amount : ""}
              error={touched.total_amount && Boolean(errors.total_amount)}
              value={values.total_amount=(Number(values.agent_amount)+Number(values.service)+Number(values.chamber_amount))}
              onChange={handleChange("total_amount")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="paid_amount"
              label="Paid amount"
              name="paid_amount"
              type="number"
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.paid_amount ? errors.paid_amount : ""}
              error={touched.paid_amount && Boolean(errors.paid_amount)}
              value={values.paid_amount}
              onChange={handleChange("paid_amount")}
              sx = {leftCss }
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="balance"
              sx = {rightCss}
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
            {values.sub_category != "Visa Chamber" && <><Grid item xs={6}>
                <TextField
                  id="agent"
                  sx={leftCss}
                  label="Agent Name"
                  name="agent"
                  type="text"
                  fullWidth
                  autoFocus
                  variant="outlined"
                  helperText={touched.agent ? errors.agent : ""}
                  error={touched.agent && Boolean(errors.agent)}
                  value={values.agent}
                  onChange={handleChange("agent")} />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                    id="paid_date"
                    sx={rightCss}
                    label="Agent Paid Date"
                    name="paid_date"
                    type="Text"
                    fullWidth
                    autoFocus
                    variant="outlined"
                    helperText={touched.paid_date ? errors.paid_date : ""}
                    error={touched.paid_date && Boolean(errors.paid_date)}
                    value={values.paid_date}
                    onChange={handleChange("paid_date")} />
                </Grid></>}
            <Grid item xs={6} >
            <TextField
              id="remarks"
              sx = {leftCss }
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
