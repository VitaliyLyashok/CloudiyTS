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
import { ChangeEvent, FC, FormEvent, useState } from "react";
import axios from "axios";
import APIRoutes from "utils/APIRoutes";
import Helper from "utils/cookieHelper";
import HTTPservice from "utils/HTTPService";

const Copyright: FC = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 7, mb: 4 }}
    >
      {"Copyright © "}
      <a
        color="inherit"
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
      >
        Cloudiy
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const theme = createTheme();

const SignIn: FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    emailAddress: "",
    password: "",
  });

  const [errorText, setErrorText] = useState({
    errorEmailText: "",
    errorPasswordText: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const getTokenAsync = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValidEmail = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
    ).test(user.emailAddress);
    let isValidPassword = new RegExp(/^[A-Za-z0-9]\w{6,}$/g).test(
      user.password
    );

    setErrorText({
      errorEmailText: !isValidEmail ? "Invalid email address" : "",
      errorPasswordText: !isValidPassword
        ? "Password must contains at least 6 characters"
        : "",
    });

    if (isValidEmail && isValidPassword) {
      await HTTPservice.post(APIRoutes.SignIn, user).then((res) => {
        if(res.status === 200) {
          sessionStorage.setItem("access_token", res.data.access_token);
          sessionStorage.setItem("userId", res.data.user.id);
          sessionStorage.setItem("currentFolderId", res.data.user.rootFolderId);
          navigate("/Home");
        }
      }).catch(() => {
        setErrorText({
          errorEmailText: "Something went wrong, please try again",
          errorPasswordText: "Something went wrong, please try again"
        })
      })
    }
  };

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={getTokenAsync} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="emailAddress"
              autoComplete="email"
              value={user.emailAddress}
              onChange={handleChange}
              error={Boolean(errorText?.errorEmailText)}
              helperText={errorText?.errorEmailText}
              autoFocus
            />
            <TextField
              margin="normal"
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
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, boxShadow: "none" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/SignUp">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
