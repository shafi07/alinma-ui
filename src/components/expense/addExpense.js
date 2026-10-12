import * as Yup from "yup";
import { Formik } from "formik";
import {Grid,InputLabel,MenuItem,Select,TextField} from "@mui/material";
import RecordForm, { FormSection } from '../form/RecordForm';

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
      <RecordForm
        open={open}
        title="Expense"
        onClose={handleClose}
        onSubmit={() => handleSubmit()}
        loading={loading}
      >
          <FormSection title="Expenses">
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
          </FormSection>
      </RecordForm>
      )}
    </Formik>
  );
}
