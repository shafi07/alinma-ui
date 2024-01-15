import { useState,useEffect,useRef,forwardRef } from 'react';
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
  {value:'Visit Visa Renew',label:'Visit Visa Renew'},
  {value:'Re Entry',label:'Re Entry'},
  {value:'Print',label:'Print'},
  {value:'Driving Licence',label:'Driving Licence'},
  {value:'Vehicle Registration Renew',label:'Vehicle Registration Renew'},
  {value:'Final Exit',label:'Final Exit'},
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

const validationSchema = Yup.object({
  sub_category: Yup.string().required("Select Category "),
  name: Yup.string().required("Enter Name"),
  id_number: Yup.string().required("Enter ID Number").length(10,'Iqama number length should be 10'),
  mobileNumber: Yup.string().required("Enter Mobile Number").matches(/^\d{10}$/,'mobile number length should be 10'),
  total_amount: Yup.number(),
  balance:Yup.number(),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open,handleClose,submitHandler,loading,editData=null,editJavazathHandler}) {
  const [refresh,setRefresh] = useState(false);
  const formikRef = useRef();
  const resetFormik =()=>{
    formikRef.current?.resetForm()
  }
  useEffect(() => {
  
  },[refresh]);

  return (
    <Formik
    innerRef={formikRef}
    validationSchema={validationSchema}
      initialValues={{
        sub_category: editData ? editData.sub_category : "",
        name: editData ? editData.name :"",
        sponser_name: editData ? editData.sponser_name : "",
        mol: editData ? editData.mol : '',
        service: editData ? editData.service : '',
        other: editData ? editData.other : '',
        iqama: editData ? editData.iqama : '',
        id_number: editData ? editData.id_number : "",
        insurance: editData ? editData.insurance : '',
        total_amount: editData ? editData.total_amount : "",
        mobileNumber: editData ? editData.mobilenumber : "",
        paid_amount: editData ? editData.paid_amount : null,
        balance: editData ? editData.balance : '',
        remarks: editData ? editData.remarks :'',
        agent_amount: editData ? editData.agent_amount : '',
        paid_date: editData ? editData.paid_date :'',
        agent:editData ? editData.agent :'',
        professionName: editData ? editData.professionname :'',
        newSponser: editData ? editData.newsponser :'',
        due: editData?.due ||'',
        absheer_amount: editData?.absheer_amount || '',
        qiwa_amount: editData?.qiwa_amount || '',
        government_fee: editData?.government_fee || '',
        new_passport_number: editData?.new_passport_number || '',
        expiry_date:editData?.expiry_date || '',
      }}
      onSubmit={(values, actions) => {
        values.paid_amount = values?.paid_amount ||0
        if(editData){
          editJavazathHandler({...values,id:editData.id},actions)
        }else{
         submitHandler(values,actions) 
        }
        
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
      initialValues
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
          <Grid container rowSpacing={1} spacing={{xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
            <Grid item xs={4} >
            <TextField
              id="sub_category"
              label="Category Name"
              name="sub_category"
              type="text"
              fullWidth
              size='small'
              autoFocus
              required
              select={true}
              variant="outlined"
              helperText={touched.sub_category ? errors.sub_category : ""}
              error={touched.sub_category && Boolean(errors.sub_category)}
              value={values.sub_category}
              onChange={(e)=>{resetFormik();setFieldValue('sub_category',e.target.value)}}
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
              label="Sponser's Name"
              name="sponser_name"
              type="text"
              size='small'
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
            {values.sub_category == "New Iqama" && <Grid item xs={4} >
            <TextField
              id="boarder_number"
              sx = {leftCss}
              label="Boarder Number"
              name="boarder_number"
              type="text"
              size='small'
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.boarder_number ? errors.boarder_number : ""}
              error={touched.boarder_number && Boolean(errors.boarder_number)}
              value={values.boarder_number}
              onChange={handleChange("boarder_number")}
            />
            </Grid>}
            <Grid item xs={4} >
            <TextField
              id="id_number"
              sx = {leftCss}
              label="Iqama Number"
              name="id_number"
              type="text"
              size='small'
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
            <Grid item xs={4} >
            <TextField
              id="mobileNumber"
              label="Mobile Number"
              name="mobileNumber"
              type="text"
              size='small'
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
            {values.sub_category == "Profession Change" && <Grid item xs={4} >
            <TextField
              id="professionName"
              sx = {leftCss}
              label="Profession Name"
              name="professionName"
              type="text"
              size='small'
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
            {values.sub_category == "Sponser Change" && <Grid item xs={4} >
            <TextField
              id="newSponser"
              sx = {leftCss}
              label="New Sponser Name"
              name="newSponser"
              type="text"
              size='small'
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
            {!["Driving Licence","Vehicle Registration Renew"].includes(values.sub_category) &&<Grid item xs={4} >
            <TextField
              id="iqama"
              label="Iqama Amount"
              name="iqama"
              type="number"
              size='small'
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.iqama ? errors.iqama : ""}
              error={touched.iqama && Boolean(errors.iqama)}
              value={values.iqama}
              onChange={handleChange("iqama")}
              sx = {leftCss}
            /> 
            </Grid>}
            {["New Iqama","Renew","Visit Visa Renew"].includes(values.sub_category) &&<Grid item xs={4} >
            <TextField
              id="insurance"
              label="Insurance"
              name="insurance"
              type="number"
              size='small'
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.insurance ? errors.insurance : ""}
              error={touched.insurance && Boolean(errors.insurance)}
              value={values.insurance}
              onChange={handleChange("insurance")}
              sx = {leftCss}
            />
            </Grid>}
            <Grid item xs={4} >
            <TextField
              id="other"
              label="Other"
              name="other"
              type="number"
              fullWidth
              size='small'
              autoFocus
              variant="outlined"
              helperText={touched.other ? errors.other : ""}
              error={touched.other && Boolean(errors.other)}
              value={values.other}
              onChange={handleChange("other")}
              sx = {leftCss}
              
            /> 
            </Grid>
            {["New Iqama","Renew","Visit Visa Renew"].includes(values.sub_category) &&<Grid item xs={4} >
            <TextField
              id="mol"
              sx = {leftCss}
              label="Mol Amount"
              name="mol"
              type="number"
              size='small'
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.mol ? errors.mol : ""}
              error={touched.mol && Boolean(errors.mol)}
              value={values.mol}
              onChange={handleChange("mol")}
            />
            </Grid>}
            <Grid item xs={4} >
            <TextField
              id="agent_amount"
              label="Agent Amount"
              name="agent_amount"
              type="number"
              size='small'
              fullWidth
              autoFocus
              variant="outlined" 
              helperText={touched.agent_amount ? errors.agent_amount : ""}
              error={touched.agent_amount && Boolean(errors.agent_amount)}
              value={values.agent_amount}
              onChange={handleChange("agent_amount")}
              sx = {leftCss}
            />
            </Grid>
            {!["Print","Driving Licence","Vehicle Registration Renew","Visit Visa Renew"].includes(values.sub_category) &&<Grid item xs={4} > 
            <TextField
              id="absheer_amount"
              label="Absheer Amount"
              name="absheer_amount"
              type="number"
              size='small'
              fullWidth
              autoFocus
              variant="outlined" 
              helperText={touched.absheer_amount ? errors.absheer_amount : ""}
              error={touched.absheer_amount && Boolean(errors.absheer_amount)}
              value={values.absheer_amount}
              onChange={handleChange("absheer_amount")}
              sx = {leftCss}
            />
            </Grid>}
            {["New Iqama","Renew","Sponser Change","Profession Change"].includes(values.sub_category) &&<Grid item xs={4} >
            <TextField
              id="qiwa_amount"
              label="Qiwa Amount"
              name="qiwa_amount"
              type="number"
              size='small'
              fullWidth
              autoFocus
              variant="outlined" 
              helperText={touched.qiwa_amount ? errors.qiwa_amount : ""}
              error={touched.qiwa_amount && Boolean(errors.qiwa_amount)}
              value={values.qiwa_amount}
              onChange={handleChange("qiwa_amount")}
              sx = {leftCss}
            />
            </Grid>}
            {["Driving Licence","Vehicle Registration Renew"].includes(values.sub_category) &&<Grid item xs={4} >
            <TextField
              id="government_fee"
              sx = {leftCss }
              label="Government Fee"
              name="government_fee"
              type="number"
              size='small'
              fullWidth
              variant="outlined" 
              helperText={touched.government_fee ? errors.government_fee : ""}
              error={touched.government_fee && Boolean(errors.government_fee)}
              value={values.government_fee}
              onChange={handleChange("government_fee")}
            />
            </Grid>}
            <Grid item xs={4} >
            <TextField
              id="service"
              // sx = {cssArray.includes(values.sub_category) ? rightCss : leftCss }
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
              value={values.service}
              onChange={handleChange("service")}
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
              autoFocus
              required
              variant="outlined" 
              helperText={touched.total_amount ? errors.total_amount : ""}
              error={touched.total_amount && Boolean(errors.total_amount)}
              value={values.total_amount=(Number(values.mol)+ Number(values.iqama) + Number(values.insurance) + Number(values.other) + Number(values.service) + Number(values.agent_amount)+Number(values.absheer_amount)+Number(values.qiwa_amount)+Number(values.government_fee))}
              onChange={handleChange("total_amount")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="paid_amount"
              label="Paid amount"
              name="paid_amount"
              type="number"
              disabled={editData}
              size='small'
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.paid_amount ? errors.paid_amount : ""}
              error={touched.paid_amount && Boolean(errors.paid_amount)}
              value={values.paid_amount}
              onChange={handleChange("paid_amount")}
              sx = {leftCss}
            /> 
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="balance"
              label="Balance Amount"
              name="balance"
              type="number"
              size='small'
              fullWidth
              autoFocus
              disabled
              required
              variant="outlined"
              helperText={touched.balance ? errors.balance : ""}
              error={touched.balance && Boolean(errors.balance)}
              value={values.balance =(Number(values.total_amount)-Number(values.paid_amount))}
              onChange={handleChange("balance")}
              sx = {leftCss}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="agent"
              sx = {leftCss}
              label="Agent"
              name="agent"
              type="text"
              size='small'
              fullWidth
              autoFocus
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
              // sx = {cssArray.includes(values.sub_category) ? leftCss : rightCss }
              label="Agent Paid Date"
              name="paid_date"
              size='small'
              type="Text"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.paid_date ? errors.paid_date : ""}
              error={touched.paid_date && Boolean(errors.paid_date)}
              value={values.paid_date}
              onChange={handleChange("paid_date")}
              sx = {leftCss}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="remarks"
              // sx = {cssArray.includes(values.sub_category) ? rightCss : leftCss }
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
            {!["Visa Change","Sponser Change"].includes(values.sub_category) &&<Grid item xs={4} >
            <TextField
              id="due"
              // sx = {cssArray.includes(values.sub_category) ? leftCss : rightCss }
              label="Due in months"
              name="due"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.due ? errors.due : ""}
              error={touched.due && Boolean(errors.due)}
              value={values.due}
              onChange={handleChange("due")}
              sx = {leftCss}
            />
            </Grid>}
            { values.sub_category == 'Visa Change' && <><Grid item xs={4}>
                <TextField
                  id="expiry_date"
                  // sx = {cssArray.includes(values.sub_category) ? leftCss : rightCss }
                  label="Passport Expiry Date"
                  name="expiry_date"
                  size='small'
                  type="Text"
                  fullWidth
                  autoFocus
                  variant="outlined"
                  helperText={touched.expiry_date ? errors.expiry_date : ""}
                  error={touched.expiry_date && Boolean(errors.expiry_date)}
                  value={values.expiry_date}
                  onChange={handleChange("expiry_date")}
                  sx={leftCss} />
              </Grid><Grid item xs={4}>
                  <TextField
                    id="new_passport_number"
                    // sx = {cssArray.includes(values.sub_category) ? leftCss : rightCss }
                    label="New Passport Number"
                    name="new_passport_number"
                    size='small'
                    type="Text"
                    fullWidth
                    autoFocus
                    variant="outlined"
                    helperText={touched.new_passport_number ? errors.new_passport_number : ""}
                    error={touched.new_passport_number && Boolean(errors.new_passport_number)}
                    value={values.new_passport_number}
                    onChange={handleChange("new_passport_number")}
                    sx={leftCss} />
                </Grid></>}
          </Grid>
          </DialogContent>
          <DialogActions>
            {/* {!loading && ( */}
              <Button onClick={()=>{resetForm();handleClose()}} color="primary">
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
