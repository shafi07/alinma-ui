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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open,handleClose,loading,submitHandler}) {

  return (
    <Formik
      initialValues={{
        telephone:null,
        electricity:null,
        stationary:null,
        salary:null,
        other:null,
        remarks:"",
      }}
      onSubmit={(values, actions) => {
        let total_amount = (Number(values.electricity)+Number(values.telephone)+Number(values.salary)+Number(values.stationary)+Number(values.other))
        submitHandler({total_amount,...values},actions)
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
              EXPENSE
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
              id="electricity"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2,
              }}
              label="Electricity Amount"
              name="electricity"
              type="number"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.electricity ? errors.electricity : ""}
              error={touched.electricity && Boolean(errors.electricity)}
              value={values.electricity}
              onChange={handleChange("electricity")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="telephone"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2,
              }}
              label="Telephone Amount"
              name="telephone"
              type="number"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.telephone ? errors.telephone : ""}
              error={touched.telephone && Boolean(errors.telephone)}
              value={values.telephone}
              onChange={handleChange("telephone")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="salary"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2,
              }}
              label="Salary Amount"
              name="salary"
              type="number"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.salary ? errors.salary : ""}
              error={touched.salary && Boolean(errors.salary)}
              value={values.salary}
              onChange={handleChange("salary")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="stationary"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginLeft:2,
              }}
              label="Stationary Amount"
              name="stationary"
              type="number"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.stationary ? errors.stationary : ""}
              error={touched.stationary && Boolean(errors.stationary)}
              value={values.stationary}
              onChange={handleChange("stationary")}
            />
            </Grid>
            <Grid item xs={6} >
            <TextField
              id="other"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2,
              }}
              label="Other Amount"
              name="other"
              type="number"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.other ? errors.other : ""}
              error={touched.other && Boolean(errors.other)}
              value={values.other}
              onChange={handleChange("other")}
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
              variant="outlined"
              helperText={touched.remarks ? errors.remarks : ""}
              error={touched.remarks && Boolean(errors.remarks)}
              value={values.remarks}
              onChange={handleChange("remarks")}
            />
            </Grid>
            {/* <Grid item xs={6} >
            <TextField
              id="total_amount"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2,
              }}
              label="Total Amount"
              name="total_amount"
              type="number"
              fullWidth
              autoFocus
              variant="outlined"
              helperText={touched.total_amount ? errors.total_amount : ""}
              error={touched.total_amount && Boolean(errors.total_amount)}
              value={values.total_amount=(Number(values.electricity)+Number(values.telephone)+Number(values.salary)+Number(values.stationary)+Number(values.other))}
              onChange={handleChange("total_amount")}
            />
            </Grid> */}
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
