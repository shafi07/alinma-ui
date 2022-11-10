import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from "yup";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const validationSchema = Yup.object({
    total_amount: Yup.number().required("Enter Category Name"),
    balance_amount: Yup.number().required("Enter Unit (eg: Kg, Litre, etc)"),
    paid_amount: Yup.number().required("Enter Unit (eg: Kg, Litre, etc)"),
  });

export default function BasicModal({open,handleClose,editData={},editHandler}) {
//   const handleOpen = () => setOpen(true);
console.log('////',editData)
//   const handleClose = () => setOpen(false);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        total_amount:editData?editData.total_amount:200,
        balance_amount:editData?editData.balance_amount:'',
        paid_amount:''
      }}
      onSubmit={(values, actions) => {
        editHandler({id:editData.id,...values})
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
        <Dialog open={open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Bill</DialogTitle>
          <DialogContent>
            {Boolean(errors.image) && (
              <Typography color="error" variant="body2" gutterBottom>
                {errors.image}
              </Typography>
            )}
            <TextField
              id="total_amount"
              label="Total Amount"
              name="total_amount"
              type="number"
              fullWidth
              autoFocus
              required
              disabled
              variant="outlined"
              helperText={touched.total_amount ? errors.total_amount : ""}
              error={touched.total_amount && Boolean(errors.total_amount)}
              value={values.total_amount}
              onChange={handleChange("total_amount")}
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
            />
            <TextField
              id="balance_amount"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
              label="Balance Amount"
              name="balance_amount"
              type="number"
              fullWidth
              autoFocus
              disabled
              required
              variant="outlined"
              helperText={touched.balance_amount ? errors.balance_amount : ""}
              error={touched.balance_amount && Boolean(errors.balance_amount)}
              value={values.balance_amount-values.paid_amount}
              onChange={handleChange("balance_amount")}
            />
            <TextField
              id="paid_amount"
              sx = {{
                marginTop: 2,
                marginBottom: 2,
                marginRight:2
              }}
              label="Paid Amount"
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
            />
          </DialogContent>
          {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
          <DialogActions>
            {/* {!loading && ( */}
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            {/* )} */}
            <Button
              onClick={() => handleSubmit()}
              color="primary"
            //   disabled={loading}
            >Submit
              {/* {loading || editLoading ? "Saving ..." : "Submit"} */}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
}
