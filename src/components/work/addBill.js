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
  {value:'add',label:'Add'},
  {value:'new',label:'New'}
]

// const useStyles = makeStyles({
//   grid: {
//     height: 140,
//   },
//   input: {
//     marginTop: 15,
//     marginBottom: 15,
//   },
// });

const validationSchema = Yup.object({
  sub_category: Yup.string().required("Enter Category Name"),
  name: Yup.string().required("Enter Unit (eg: Kg, Litre, etc)"),
  sponser_name: Yup.string().required("Enter Unit (eg: Kg, Litre, etc)"),
  id_number: Yup.string().required("Enter Unit (eg: Kg, Litre, etc)"),
  mobileNumber: Yup.string().required("Enter Unit (eg: Kg, Litre, etc)"),
  paid_amount: Yup.number().required("Enter Unit (eg: Kg, Litre, etc)"),
  total_amount: Yup.number().required("Enter Unit (eg: Kg, Litre, etc)"),
  balance:Yup.number(),
  remarks: Yup.string().optional(),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open,handleClose,editData={},submitHandler}) {
  const [loading,setLoading]= React.useState(false)
  // const classes = useStyles();
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const submitHandler = async (data)=>{
  //   console.log('>>>>>>???',data)
  // }


  return (
    <Formik
    validationSchema={validationSchema}
      initialValues={{
        sub_category:"",
        name:"",
        dob:"",
        sponser_name: "",
        id_number: "",
        total_amount: "",
        mobileNumber: "",
        paid_amount: "",
        balance: '',
        remarks:''
      }}
      onSubmit={(values, actions) => {
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
              INSURANCE
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent >
          <Grid container >
            <Grid item xs={6} >
            <TextField
              id="sub_category"
              label="Add/New"
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
              required
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
              id="dob"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
              label="DOB"
              name="dob"
              type="text"
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.dob ? errors.dob : ""}
              error={touched.dob && Boolean(errors.dob)}
              value={values.dob}
              onChange={handleChange("dob")}
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
                marginLeft:2,
              }}
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="total_amount"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
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
              value={values.total_amount}
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
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2,
              }}
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="balance"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
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
              id="remarks"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2,
              }}
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
            >
              {/* {loading || editLoading ? "Saving ..." : "Submit"} */} Submit
            </Button>
          </DialogActions>
      </Dialog>
      )}
    </Formik>
  );
}
