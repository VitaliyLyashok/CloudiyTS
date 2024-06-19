import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, FC } from "react";
import axios from "axios";
import APIRoutes from "utils/APIRoutes";
import HTTPservice from "utils/HTTPService";

const Copyright: FC = () => {
  return (
    <Typography
      variant="body2"
      color="text.primary"
      align="center"
      sx={{ mt: 5 }}
    >
      {"Copyright © "}
      <a color="inherit">Cloudiy</a> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const theme = createTheme();

const SignUp: FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    emailAddress: "",
    password: "",
  });

  const [errorText, setErrorText] = useState({
    errorNameText: "",
    errorEmailText: "",
    errorPasswordText: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  async function getTokenAsync(e: React.FormEvent) {
    e.preventDefault();
    let isValidName = new RegExp(/^[A-Za-z]\w{3,15}$/g).test(user.name);
    let isValidEmail = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
    ).test(user.emailAddress);
    let isValidPassword = new RegExp(/^[A-Za-z0-9]\w{6,}$/g).test(
      user.password
    );

    setErrorText({
      errorNameText: !isValidName
        ? "Name must contains at least 4 characters"
        : "",
      errorEmailText: !isValidEmail ? "Invalid email address" : "",
      errorPasswordText: !isValidPassword
        ? "Password must contains at least 6 characters"
        : "",
    });
    if (isValidName && isValidEmail && isValidPassword) {
      await HTTPservice.post(APIRoutes.SignUp, user).then((res) => {
        res.status === 200 && navigate("/");
      }).catch(() => {
        setErrorText((prev) => ({
          errorNameText: "Something went wrong, please try again.",
          errorEmailText: "Something went wrong, please try again.",
          errorPasswordText: "Something went wrong, please try again.",
        }));
      });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={getTokenAsync}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  value={user.name}
                  onChange={handleChange}
                  error={Boolean(errorText?.errorNameText)}
                  helperText={errorText?.errorNameText}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  autoComplete="off"
                  fullWidth
                  name="emailAddress"
                  id="email"
                  label="Email Address"
                  value={user.emailAddress}
                  onChange={handleChange}
                  error={Boolean(errorText?.errorEmailText)}
                  helperText={errorText?.errorEmailText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={handleChange}
                  error={Boolean(errorText?.errorPasswordText)}
                  helperText={errorText?.errorPasswordText}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="right">
              <Grid item>
                <Link to="/">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
