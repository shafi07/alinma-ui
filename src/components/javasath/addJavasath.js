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
  {value:'New Iqama',label:'New Iqama'},
  {value:'Renew',label:'Renew'},
  {value:'Visa Change',label:'Visa Change'},
  {value:'Visit Visa',label:'Visit Visa'},
  {value:'Re Entry',label:'Re Entry'},
  {value:'Print',label:'Print'},
  {value:'Driving Licence',label:'Driving Licence'},
  {value:'Vehicle Registration Renew',label:'Vehicle Registration Renew'},
  {value:'Visa Cancel',label:'Visa Cancel'},
  {value:'Sponser Change',label:'Sponser Change'},
  {value:'Profession Change',label:'Profession Change'},
]

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

const cssArray=['Sponser Change','Profession Change']

const validationSchema = Yup.object({
  sub_category: Yup.string().required("Select Category "),
  name: Yup.string().required("Enter Name"),
  id_number: Yup.string().required("Enter ID Number").length(10,'Iqama number length should be 10'),
  mobileNumber: Yup.string().required("Enter Mobile Number").matches(/^\d{10}$/,'mobile number length should be 10'),
  total_amount: Yup.number(),
  balance:Yup.number(),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open,handleClose,editData={},submitHandler,loading}) {

  return (
    <Formik
    validationSchema={validationSchema}
      initialValues={{
        sub_category:"",
        name:"",
        sponser_name: "",
        mol: null,
        service: null,
        other: null,
        iqama: null,
        id_number: "",
        insurance: null,
        total_amount: "",
        mobileNumber: "",
        paid_amount: null,
        balance: '',
        remarks:'',
        agent_amount:null,
        paid_date:'',
        agent:'',
        professionName:'',
        newSponser:''
      }}
      onSubmit={(values, actions) => {
        values.paid_amount = values.paid_amount ? values.paid_amount :0
        submitHandler(values,actions)
      }}
    >
    {({
      handleSubmit,
      errors,
      setFieldValue,
      resetForm,
      handleChange,
      touched,
      values,
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
              onClick={()=>{handleClose();resetForm()}}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Javasath
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
              label="Category Name"
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
              sx = {leftCss}
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
              label="Sponser's Name"
              name="sponser_name"
              type="text"
              fullWidth
              autoFocus
              required
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
              // className={classes.input}
              sx = {rightCss}
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
              sx = {leftCss}
            />
            </Grid> 
            {values.sub_category == "Profession Change" && <Grid item xs={6} >
            <TextField
              id="professionName"
              sx = {rightCss}
              label="Profession Name"
              name="professionName"
              type="text"
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.professionName ? errors.professionName : ""}
              error={touched.professionName && Boolean(errors.professionName)}
              value={values.professionName}
              onChange={handleChange("professionName")}
            />
            </Grid>}
            {values.sub_category == "Sponser Change" && <Grid item xs={6} >
            <TextField
              id="newSponser"
              sx = {rightCss}
              label="New Sponser Name"
              name="newSponser"
              type="text"
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.newSponser ? errors.newSponser : ""}
              error={touched.newSponser && Boolean(errors.newSponser)}
              value={values.newSponser}
              onChange={handleChange("newSponser")}
            />
            </Grid>}
            <Grid item xs={6} >
            <TextField
              id="iqama"
              label="Iqama Amount"
              name="iqama"
              type="number"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.iqama ? errors.iqama : ""}
              error={touched.iqama && Boolean(errors.iqama)}
              value={values.iqama}
              onChange={handleChange("iqama")}
              sx = {cssArray.includes(values.sub_category) ? leftCss : rightCss }
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="insurance"
              sx = {cssArray.includes(values.sub_category) ? rightCss : leftCss }
              label="Insurance"
              name="insurance"
              type="number"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.insurance ? errors.insurance : ""}
              error={touched.insurance && Boolean(errors.insurance)}
              value={values.insurance}
              onChange={handleChange("insurance")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="other"
              label="Other"
              name="other"
              type="number"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.other ? errors.other : ""}
              error={touched.other && Boolean(errors.other)}
              value={values.other}
              onChange={handleChange("other")}
              sx = {cssArray.includes(values.sub_category) ? leftCss : rightCss }
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="mol"
              sx = {cssArray.includes(values.sub_category) ? rightCss : leftCss }
              label="Mol Amount"
              name="mol"
              type="number"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.mol ? errors.mol : ""}
              error={touched.mol && Boolean(errors.mol)}
              value={values.mol}
              onChange={handleChange("mol")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="agent_amount"
              sx = {cssArray.includes(values.sub_category) ? leftCss : rightCss }
              label="Agent Amount"
              name="agent_amount"
              type="number"
              fullWidth
              autoFocus
              variant="outlined" 
              helperText={touched.agent_amount ? errors.agent_amount : ""}
              error={touched.agent_amount && Boolean(errors.agent_amount)}
              value={values.agent_amount}
              onChange={handleChange("agent_amount")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="service"
              sx = {cssArray.includes(values.sub_category) ? rightCss : leftCss }
              InputLabelProps={{
                style: { color: '#BC3110' },
              }}
              label="Service Charge"
              name="service"
              type="text"
              fullWidth
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
              sx = {cssArray.includes(values.sub_category) ? leftCss : rightCss }
              label="Total Amount"
              name="total_amount"
              type="number"
              fullWidth
              autoFocus
              required
              variant="outlined" 
              helperText={touched.total_amount ? errors.total_amount : ""}
              error={touched.total_amount && Boolean(errors.total_amount)}
              value={values.total_amount=(Number(values.mol)+ Number(values.iqama) + Number(values.insurance) + Number(values.other) + Number(values.service) + Number(values.agent_amount))}
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
              sx = {cssArray.includes(values.sub_category) ? rightCss : leftCss }
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="balance"
              sx = {cssArray.includes(values.sub_category) ? leftCss : rightCss }
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
              sx = {cssArray.includes(values.sub_category) ? rightCss : leftCss }
              label="Agent"
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
              sx = {cssArray.includes(values.sub_category) ? leftCss : rightCss }
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
              sx = {cssArray.includes(values.sub_category) ? rightCss : leftCss }
              label="Remarks"
              name="remarks"
              type="text"
              fullWidth
              autoFocus
              required
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
              variant='outlined'
            >
              {/* {loading || editLoading ? "Saving ..." : "Submit"} */} Submit
            </Button>
          </DialogActions>
      </Dialog>
      )}
    </Formik>
  );
}
