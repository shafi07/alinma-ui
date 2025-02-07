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
  {value:'Zakath',label:'Zakath'},
  {value:'Zareeba',label:'Zareeba'},
]

const cssArray=['Visa Chamber','Wakala']

const validationSchema = Yup.object({
  sub_category: Yup.string().required("Enter Category Name"),
  name: Yup.string().required("Enter Name"),
  mobilenumber: Yup.string().required("Enter Mobile Number").matches(/^\d{10}$/,'mobile number length should be 10'),
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

export default function FullScreenDialog({
  open,
  handleClose,
  loading = false,
  submitHandler,
  editData,
  editVisaHandler
}) {

console.log('------111',editData)

  return (
    <Formik
    validationSchema={validationSchema}
      initialValues={{
        sub_category: editData ? editData.sub_category : "",
        name: editData ? editData.name : "",
        sponser_name: editData ? editData.sponser_name : "",
        id_number: editData ? editData.id_number : "",
        total_amount: editData ? editData.total_amount : "",
        mobilenumber: editData ? editData.mobilenumber : "",
        paid_amount: null,
        balance_amount: editData ? editData.balance_amount : '',
        remarks: editData ? editData.remarks : '',
        zareeba_date: editData ? editData.zareeba_date : '',
        purchase_amount: editData ? editData.purchase_amount : null,
        service: editData ? editData.service : null,
      }}
      onSubmit={(values, actions) => {
        values.paid_amount = values.paid_amount ? values.paid_amount :0
        if (editData){
        editVisaHandler({...values,
          id:editData.id,
          status:editData.status,
          payment_method:editData.payment_method},actions)
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
               {editData ? `Zakath-[${editData.createddate}]`:`Zakath`}
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
            <Grid item xs={4} >
            <TextField
              id="mobilenumber"
              label="Mobile Number"
              name="mobilenumber"
              type="text"
              fullWidth
              autoFocus
              size='small'
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
              id="purchase_amount"
              label="Purchase Amount"
              name="purchase_amount"
              type="text"
              fullWidth
              autoFocus
              size='small'
              variant="outlined"
              helperText={touched.purchase_amount ? errors.purchase_amount : ""}
              error={touched.purchase_amount && Boolean(errors.purchase_amount)}
              value={values?.purchase_amount || ""}
              onChange={(e)=>{setFieldValue('purchase_amount',+e.target.value)}}
              sx = {leftCss}
            /> 
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="sales_amount"
              sx = {leftCss}
              label="Sales Amount"
              name="sales_amount"
              type="text"
              fullWidth
              autoFocus
              size='small'
              variant="outlined"
              helperText={touched.sales_amount ? errors.sales_amount : ""}
              error={touched.sales_amount && Boolean(errors.sales_amount)}
              value={values.sales_amount}
              onChange={(e)=>{setFieldValue('sales_amount',+e.target.value)}}
            />
            </Grid>
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
              value={values.total_amount=(Number(values.service))}
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
            <Grid item xs={4}>
                <TextField
                  id="zareeba_date"
                  sx={leftCss}
                  label="Zareeba Date"
                  name="zareeba_date"
                  type="text"
                  fullWidth
                  autoFocus
                  size='small'
                  variant="outlined"
                  helperText={touched.zareeba_date ? errors.zareeba_date : ""}
                  error={touched.zareeba_date && Boolean(errors.zareeba_date)}
                  value={values.zareeba_date}
                  onChange={handleChange("zareeba_date")} />
              </Grid>
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
              // onClick={() => console.log('submit')}
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
