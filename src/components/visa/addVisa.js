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
  {value:'Work Visa',label:'Work Visa'},
  {value:'Visit Visa',label:'Visit Visa'},
  {value:'Visit Chamber',label:'Visit Chamber'},
  {value:'Wakala',label:'Wakala'},
  {value:'Visa Chamber',label:'Visa Chamber'},
  {value:'Mofa',label:'Mofa'},
]

const cssArray=['Visa Chamber','Wakala']

const validationSchema = Yup.object({
  sub_category: Yup.string().required("Enter Category Name"),
  name: Yup.string().required("Enter Name"),
  id_number: Yup.string().required("Enter ID Number").length(10,'Iqama number length should be 10'),
  mobileNumber: Yup.string().required("Enter Mobile Number").matches(/^\d{10}$/,'mobile number length should be 10'),
  visa_number: Yup.string().when("sub_category",{is:"Wakala",then:Yup.string().required("Enter Visa Number")}),
  balance:Yup.number(),
});

const leftCss = {
  marginTop: 2,
  marginBottom: 2,
  marginRight:2,
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open,handleClose,loading,submitHandler,editData,editVisaHandler}) {

console.log('------',editData)

  return (
    <Formik
    validationSchema={validationSchema}
      initialValues={{
        sub_category: editData ? editData.sub_category : "",
        name: editData ? editData.name : "",
        sponser_name: editData ? editData.sponser_name : "",
        id_number: editData ? editData.id_number : "",
        total_amount: editData ? editData.total_amount : "",
        mobileNumber: editData ? editData.mobilenumber : "",
        paid_amount: null,
        balance_amount: editData ? editData.balance_amount : '',
        remarks: editData ? editData.remarks : '',
        agent: editData ? editData.agent : '',
        agent_amount: editData ? editData.agent_amount : null,
        service: editData ? editData.service : null,
        paid_date: editData ? editData.paid_date : null,
        visa_number: editData ? editData.visa_number : '',
        chamber_amount: editData ? editData.chamber_amount : null,
        government_fee: editData ? editData.government_fee : null,
        application_number: editData?.application_number || '',
        travels:editData?.travels || ''
      }}
      onSubmit={(values, actions) => {
        values.paid_amount = values.paid_amount ? values.paid_amount :0
        if (editData){
        editVisaHandler({...values,id:editData.id},actions)
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
      resetForm,
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
               {editData ? `Visa-[${editData.createddate}]`:`Visa`}
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
              size='small'
              required
              select={true}
              variant="outlined"
              helperText={touched.sub_category ? errors.sub_category : ""}
              error={touched.sub_category && Boolean(errors.sub_category)}
              value={values.sub_category}
              onChange={(e)=>{resetForm();setFieldValue('sub_category',e.target.value)}}
              sx = {{...leftCss,input: { color: 'red' }}}
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
              size='small'
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
              fullWidth
              autoFocus
              size='small'
              variant="outlined"
              helperText={touched.sponser_name ? errors.sponser_name : ""}
              error={touched.sponser_name && Boolean(errors.sponser_name)}
              value={values.sponser_name}
              onChange={handleChange("sponser_name")}
              sx = {leftCss}
            /> 
            </Grid>
            {values.sub_category == "Wakala" && <Grid item xs={4} >
            <TextField
              id="travels"
              label="Travels Name"
              name="travels"
              type="text"
              fullWidth
              autoFocus
              size='small'
              variant="outlined"
              helperText={touched.travels ? errors.travels : ""}
              error={touched.travels && Boolean(errors.travels)}
              value={values.travels}
              onChange={handleChange("travels")}
              sx = {leftCss}
            /> 
            </Grid>}  
            <Grid item xs={4} >
            <TextField
              id="id_number"
              sx = {leftCss}
              label={['Wakala','Work Visa'].includes(values.sub_category) ?'ID Number':'Iqama Number'}
              name="id_number"
              type="text"
              fullWidth
              autoFocus
              size='small'
              required
              variant="outlined"
              helperText={touched.id_number ? errors.id_number : ""}
              error={touched.id_number && Boolean(errors.id_number)}
              value={values.id_number}
              onChange={handleChange("id_number")}
            />
            </Grid>
            {values.sub_category == "Wakala" && <Grid item xs={4} >
            <TextField
              id="visa_number"
              sx = {leftCss}
              label="Visa Number"
              name="visa_number"
              type="text"
              fullWidth
              autoFocus
              size='small'
              variant="outlined"
              helperText={touched.visa_number ? errors.visa_number : ""}
              error={touched.visa_number && Boolean(errors.visa_number)}
              value={values.visa_number}
              onChange={handleChange("visa_number")}
            />
            </Grid>}
            <Grid item xs={4} >
            <TextField
              id="mobileNumber"
              label="Mobile Number"
              name="mobileNumber"
              type="text"
              fullWidth
              autoFocus
              size='small'
              required
              variant="outlined"
              helperText={touched.mobileNumber ? errors.mobileNumber : ""}
              error={touched.mobileNumber && Boolean(errors.mobileNumber)}
              value={values.mobileNumber}
              onChange={handleChange("mobileNumber")}
              sx = {leftCss}
            /> 
            </Grid>
            {values.sub_category != "Visa Chamber" &&<Grid item xs={4} >
            <TextField
              id="agent_amount"
              label="Agent amount"
              name="agent_amount"
              type="text"
              fullWidth
              autoFocus
              size='small'
              variant="outlined"
              helperText={touched.agent_amount ? errors.agent_amount : ""}
              error={touched.agent_amount && Boolean(errors.agent_amount)}
              value={values?.agent_amount || ""}
              onChange={(e)=>{setFieldValue('agent_amount',+e.target.value)}}
              sx = {leftCss}
            /> 
            </Grid>}
            {cssArray.includes(values.sub_category) && <Grid item xs={4} >
            <TextField
              id="chamber_amount"
              sx = {leftCss}
              label="Chamber Amount"
              name="chamber_amount"
              type="text"
              fullWidth
              autoFocus
              size='small'
              variant="outlined"
              helperText={touched.chamber_amount ? errors.chamber_amount : ""}
              error={touched.chamber_amount && Boolean(errors.chamber_amount)}
              value={values.chamber_amount}
              onChange={(e)=>{setFieldValue('chamber_amount',+e.target.value)}}
            />
            </Grid>}
            <Grid item xs={4} >
            <TextField
              id="service"
              sx = {leftCss }
              label="Service Charge"
              name="service"
              InputLabelProps={{
                style: { color: '#BC3110' },
              }}
              type="text"
              fullWidth
              autoFocus
              size='small'
              variant="outlined" 
              helperText={touched.service ? errors.service : ""}
              error={touched.service && Boolean(errors.service)}
              value={values.service}
              onChange={(e)=>{setFieldValue('service',+e.target.value)}}
            />
            </Grid>
            {["Work Visa","Wakala"].includes(values.sub_category) && <Grid item xs={4} >
            <TextField
              id="government_fee"
              sx = {leftCss }
              label={values.sub_category == "Wakala"?"Injas Fee":"Government Fee"}
              name="government_fee"
              type="text"
              fullWidth
              size='small'
              variant="outlined" 
              helperText={touched.government_fee ? errors.government_fee : ""}
              error={touched.government_fee && Boolean(errors.government_fee)}
              value={values.government_fee}
              onChange={(e)=>{setFieldValue('government_fee',+e.target.value)}}
            />
            </Grid>}
            <Grid item xs={4} >
            <TextField
              id="total_amount"
              sx = {leftCss}
              label="Total Amount"
              name="total_amount"
              type="number"
              fullWidth
              autoFocus
              size='small'
              required
              variant="outlined" 
              helperText={touched.total_amount ? errors.total_amount : ""}
              error={touched.total_amount && Boolean(errors.total_amount)}
              value={values.total_amount=(Number(values.agent_amount)+Number(values.service)+Number(values.chamber_amount)+Number(values.government_fee))}
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
              autoFocus
              size='small'
              // disabled = {editData}
              required
              variant="outlined"
              helperText={touched.paid_amount ? errors.paid_amount : ""}
              error={touched.paid_amount && Boolean(errors.paid_amount)}
              value={values?.paid_amount || ''}
              onChange={(e)=>{setFieldValue('paid_amount',+e.target.value)}}
              sx = {leftCss }
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
              size='small'
              disabled
              required
              variant="outlined"
              helperText={touched.balance ? errors.balance : ""}
              error={touched.balance && Boolean(errors.balance)}
              value={values.balance = editData?(Number(editData.balance_amount)-Number(values.paid_amount)):(Number(values.total_amount)-Number(values.paid_amount))}
              onChange={handleChange("balance")}
            />
            </Grid>
            {values.sub_category != "Visa Chamber" && <><Grid item xs={4}>
                <TextField
                  id="agent"
                  sx={leftCss}
                  label="Agent Name"
                  name="agent"
                  type="text"
                  fullWidth
                  autoFocus
                  size='small'
                  variant="outlined"
                  helperText={touched.agent ? errors.agent : ""}
                  error={touched.agent && Boolean(errors.agent)}
                  value={values.agent}
                  onChange={handleChange("agent")} />
              </Grid>
              <Grid item xs={4}>
                  <TextField
                    id="paid_date"
                    sx={leftCss}
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
                    onChange={handleChange("paid_date")} />
                </Grid></>}
            {values.sub_category == "Visit Chamber" && <Grid item xs={4} >
            <TextField
              id="application_number"
              sx = {leftCss }
              label="Appplication Number"
              name="application_number"
              type="text"
              fullWidth
              autoFocus
              size='small'
              variant="outlined"
              helperText={touched.application_number ? errors.application_number : ""}
              error={touched.application_number && Boolean(errors.application_number)}
              value={values.application_number}
              onChange={handleChange("application_number")}
            />
            </Grid>}
            <Grid item xs={4} >
            <TextField
              id="remarks"
              sx = {leftCss }
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
