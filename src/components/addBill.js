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
  {value:'rty',label:'rty'},{value:'qwq',label:'qwq'}
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
  categoryName: Yup.string().required("Enter Category Name"),
  name: Yup.string().required("Enter Unit (eg: Kg, Litre, etc)"),
  sponserName: Yup.string().required("Enter Unit (eg: Kg, Litre, etc)"),
  idNumber: Yup.string().required("Enter Unit (eg: Kg, Litre, etc)"),
  mol: Yup.number().required("Enter Unit (eg: Kg, Litre, etc)"),
  iqama: Yup.number().required("Enter Unit (eg: Kg, Litre, etc)"),
  insurance: Yup.number().required("Enter Unit (eg: Kg, Litre, etc)"),
  other: Yup.string().required("Enter Unit (eg: Kg, Litre, etc)"),
  mobileNumber: Yup.string().required("Enter Unit (eg: Kg, Litre, etc)"),
  paid: Yup.string().required("Enter Unit (eg: Kg, Litre, etc)"),
  total: Yup.number().required("Enter Unit (eg: Kg, Litre, etc)"),
  service: Yup.string().required("Enter Unit (eg: Kg, Litre, etc)"),
  balance:Yup.number()
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open,handleClose,editData={}}) {
  const [loading,setLoading]= React.useState(false)
  // const classes = useStyles();
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };



  return (
    <Formik
    validationSchema={validationSchema}
      initialValues={{
        categoryName:"",
        name:"",
        sponserName: "",
        mol: '',
        service: "",
        other: "",
        iqama: "",
        idNumber: "",
        insurance: '',
        total: "",
        mobileNumber: "",
        paid: "",
        balance: '',
      }}
      onSubmit={(values, actions) => {
        console.log('<<<<',values)
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
              Javasath
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
              id="category"
              label="Category Name"
              name="categoryName"
              type="text"
              fullWidth
              autoFocus
              required
              select={true}
              variant="outlined"
              helperText={touched.categoryName ? errors.categoryName : ""}
              error={touched.categoryName && Boolean(errors.categoryName)}
              value={values.categoryName}
              onChange={handleChange("categoryName")}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
            >
              {subCategories.map(option => (
             <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
            ))}
            </TextField> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="name"
              // className={classes.input}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2
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
              id="sponserName"
              label="Sponser Name"
              name="sponserName"
              type="text"
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.sponserName ? errors.sponserName : ""}
              error={touched.sponserName && Boolean(errors.sponserName)}
              value={values.sponserName}
              onChange={handleChange("sponserName")}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="idNumber"
              // className={classes.input}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2
              }}
              label="Iqama Number"
              name="idNumber"
              type="text"
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.idNumber ? errors.idNumber : ""}
              error={touched.idNumber && Boolean(errors.idNumber)}
              value={values.idNumber}
              onChange={handleChange("idNumber")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="mol"
              // className={classes.input}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
              label="Mol"
              name="mol"
              type="number"
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.mol ? errors.mol : ""}
              error={touched.mol && Boolean(errors.mol)}
              value={values.mol}
              onChange={handleChange("mol")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="iqama"
              label="Iqama Amount"
              name="iqama"
              type="number"
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.iqama ? errors.iqama : ""}
              error={touched.iqama && Boolean(errors.iqama)}
              value={values.iqama}
              onChange={handleChange("iqama")}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2
              }}
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="insurance"
              // className={classes.input}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
              label="Insurance"
              name="insurance"
              type="number"
              fullWidth
              autoFocus
              required
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
              required
              variant="outlined"
              helperText={touched.other ? errors.other : ""}
              error={touched.other && Boolean(errors.other)}
              value={values.other}
              onChange={handleChange("other")}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2
              }}
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="service"
              // className={classes.input}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
              label="Service"
              name="service"
              type="text"
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
                marginLeft:2
              }}
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="total"
              // className={classes.input}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
              label="Total Amount"
              name="total"
              type="number"
              fullWidth
              autoFocus
              required
              variant="outlined" 
              helperText={touched.total ? errors.total : ""}
              error={touched.total && Boolean(errors.total)}
              value={values.total=(Number(values.mol)+ Number(values.iqama) + Number(values.insurance) + Number(values.other) + Number(values.service))}
              onChange={handleChange("total")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="paid"
              label="Paid amount"
              name="paid"
              type="text"
              fullWidth
              autoFocus
              required
              variant="outlined"
              helperText={touched.paid ? errors.paid : ""}
              error={touched.paid && Boolean(errors.paid)}
              value={values.paid}
              onChange={handleChange("paid")}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2
              }}
            /> 
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="balance"
              // className={classes.input}
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
              value={values.balance =(Number(values.total)-Number(values.paid))}
              onChange={handleChange("balance")}
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
