import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Formik} from "formik";
import {DialogActions,DialogContent,Grid,TextField} from "@mui/material";
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

const leftCss = {
  marginTop: 2,
  marginBottom: 2,
  marginRight:2,
}

export default function FullScreenDialog({open,handleClose,loading,submitHandler,editData=null,editCustomerHandler}) {

  return (
    <Formik
      initialValues={{
        name:editData?.name || "",
        mobileNumber: editData?.mobilenumber || "",
        id_number: editData?.id_number || "",
        qiwa: editData?.qiwa || "",
        absheer: editData?.absheer || "",
        absheer_mobileNumber: editData?.absheer_mobilenumber || "",
        dob: editData?.dob || "",
        expiry_date: editData?.expiry_date || "",
        email: editData?.email || "",
        pwd: editData?.pwd || "",
        mudad: editData?.mudad || "",
        sijil: editData?.sijil || "",
        gosi: editData?.gosi || "",
        mudeer: editData?.mudeer || "",
        mumeez_pwd: editData?.mumeez_pwd || "",
        salama: editData?.salama || "",
        post: editData?.post || "",
        baladi: editData?.baladi || "",
        tameeni: editData?.tameeni || "",
        musanad: editData?.musanad || "",
        remarks: editData?.remarks || ""
      }}
      onSubmit={(values, actions) => {
        if (editData) {
          editCustomerHandler({ ...values, id: editData.id }, actions)
        } else {
          submitHandler(values, actions)
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
              Customer
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
              label="Customer Name"
              name="name"
              type="text"
              fullWidth
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
              id="mobileNumber"
              sx = {leftCss}
              label="Mobile Number"
              name="mobileNumber"
              type="text"
              fullWidth
              size='small'
              variant="outlined"
              helperText={touched.mobileNumber ? errors.mobileNumber : ""}
              error={touched.mobileNumber && Boolean(errors.mobileNumber)}
              value={values.mobileNumber}
              onChange={handleChange("mobileNumber")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="id_number"
              sx = {leftCss}
              label="ID Number"
              name="id_number"
              type="text"
              fullWidth
              size='small'
              variant="outlined"
              helperText={touched.id_number ? errors.id_number : ""}
              error={touched.id_number && Boolean(errors.id_number)}
              value={values.id_number}
              onChange={handleChange("id_number")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="qiwa"
              sx = {leftCss}
              label="Qiwa"
              name="qiwa"
              type="text"
              fullWidth
              size='small'
              variant="outlined"
              helperText={touched.qiwa ? errors.qiwa : ""}
              error={touched.qiwa && Boolean(errors.qiwa)}
              value={values.qiwa}
              onChange={handleChange("qiwa")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="absheer"
              sx = {leftCss}
              label="Absheer"
              name="absheer"
              type="text"
              fullWidth
              size='small'
              variant="outlined"
              helperText={touched.absheer ? errors.absheer : ""}
              error={touched.absheer && Boolean(errors.absheer)}
              value={values.absheer}
              onChange={handleChange("absheer")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="absheer_mobileNumber"
              sx = {leftCss}
              label="Absheer Mobile Number"
              name="absheer_mobileNumber"
              type="text"
              fullWidth
              size='small'
              variant="outlined"
              helperText={touched.absheer_mobileNumber ? errors.absheer_mobileNumber : ""}
              error={touched.absheer_mobileNumber && Boolean(errors.absheer_mobileNumber)}
              value={values.absheer_mobileNumber}
              onChange={handleChange("absheer_mobileNumber")}
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
              variant="outlined"
              helperText={touched.dob ? errors.dob : ""}
              error={touched.dob && Boolean(errors.dob)}
              value={values.dob}
              onChange={handleChange("dob")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="expiry_date"
              sx = {leftCss}
              label="Passport Expiry Date"
              name="expiry_date"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.expiry_date ? errors.expiry_date : ""}
              error={touched.expiry_date && Boolean(errors.expiry_date)}
              value={values.expiry_date}
              onChange={handleChange("expiry_date")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="email"
              sx = {leftCss}
              label="Passport Expiry Date"
              name="email"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              value={values.email}
              onChange={handleChange("email")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="pwd"
              sx = {leftCss}
              label="Password"
              name="pwd"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.pwd ? errors.pwd : ""}
              error={touched.pwd && Boolean(errors.pwd)}
              value={values.pwd}
              onChange={handleChange("pwd")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="mudad"
              sx = {leftCss}
              label="Mudad"
              name="mudad"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.mudad ? errors.mudad : ""}
              error={touched.mudad && Boolean(errors.mudad)}
              value={values.mudad}
              onChange={handleChange("mudad")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="sijil"
              sx = {leftCss}
              label="Sijil"
              name="sijil"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.sijil ? errors.sijil : ""}
              error={touched.sijil && Boolean(errors.sijil)}
              value={values.sijil}
              onChange={handleChange("sijil")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="gosi"
              sx = {leftCss}
              label="Gosi"
              name="gosi"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.gosi ? errors.gosi : ""}
              error={touched.gosi && Boolean(errors.gosi)}
              value={values.gosi}
              onChange={handleChange("gosi")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="mudeer"
              sx = {leftCss}
              label="Mudeer"
              name="mudeer"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.mudeer ? errors.mudeer : ""}
              error={touched.mudeer && Boolean(errors.mudeer)}
              value={values.mudeer}
              onChange={handleChange("mudeer")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="mumeez_pwd"
              sx = {leftCss}
              label="Mumeez Password"
              name="mumeez_pwd"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.mumeez_pwd ? errors.mumeez_pwd : ""}
              error={touched.mumeez_pwd && Boolean(errors.mumeez_pwd)}
              value={values.mumeez_pwd}
              onChange={handleChange("mumeez_pwd")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="salama"
              sx = {leftCss}
              label="Salama"
              name="salama"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.salama ? errors.salama : ""}
              error={touched.salama && Boolean(errors.salama)}
              value={values.salama}
              onChange={handleChange("salama")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="post"
              sx = {leftCss}
              label="Post"
              name="post"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.post ? errors.post : ""}
              error={touched.post && Boolean(errors.post)}
              value={values.post}
              onChange={handleChange("post")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="baladi"
              sx = {leftCss}
              label="Baladi"
              name="baladi"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.baladi ? errors.baladi : ""}
              error={touched.baladi && Boolean(errors.baladi)}
              value={values.baladi}
              onChange={handleChange("baladi")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="tameeni"
              sx = {leftCss}
              label="Tameeni"
              name="tameeni"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.tameeni ? errors.tameeni : ""}
              error={touched.tameeni && Boolean(errors.tameeni)}
              value={values.tameeni}
              onChange={handleChange("tameeni")}
            />
            </Grid>
            <Grid item xs={4} >
            <TextField
              id="musanad"
              sx = {leftCss}
              label="Musanad"
              name="musanad"
              type="text"
              size='small'
              fullWidth
              variant="outlined"
              helperText={touched.musanad ? errors.musanad : ""}
              error={touched.musanad && Boolean(errors.musanad)}
              value={values.musanad}
              onChange={handleChange("musanad")}
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
