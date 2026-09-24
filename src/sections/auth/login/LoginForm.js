import * as Yup from 'yup';
import { useState } from 'react';
import { Formik, Form } from 'formik';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Button, Checkbox, FormControlLabel, Link } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function LoginForm({ loginHandler, loading }) {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    userName: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <Formik
      initialValues={{
        userName: '',
        password: '',
        remember: true,
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => loginHandler(values)}
    >
      {({ handleChange, values, errors, touched }) => (
        <Form>
          <Stack spacing={3}>
            <TextField
              name="userName"
              label="Email address"
              value={values.userName}
              onChange={handleChange}
              error={Boolean(touched.userName && errors.userName)}
              helperText={touched.userName && errors.userName}
            />
            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox name="remember" checked={values.remember} onChange={handleChange} />}
              label="Remember me"
            />
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <Button fullWidth size="large" type="submit" variant="contained" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
