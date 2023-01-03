import React from "react";
import { Alert, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";
import * as LocalStorageManager from "../utils/localStorageManager";
import showAlert from "../utils/showAlert";


function Login() {
  const navigate = useNavigate();
  const DEMO_DATA = "demo";
  const [loginValue, setLoginValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  return (
    <>
      <Header isLogin />
      <div>Login</div>
        <Alert id="errorMsg" severity="error" style={{display: 'none'}}>''</Alert>
        <form>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    defaultValue={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    onChange={(e) => setPasswordValue(e.target.value)}
                />
            </div>
            <div>
                <Button 
                    type="submit"
                    variant="outlined"
                    onClick={(e) => {
                        e.preventDefault();
                        if (loginValue === DEMO_DATA && passwordValue === '') {
                            console.log("Demo login succeeded");
                            LocalStorageManager.write(DEMO_DATA);
                            navigate("/posts");
                        } else {
                            showAlert('errorMsg', 'Please enter valid credentials - user demo w/o password');
                        }
                    }}
                >Log In</Button>
            </div>
        </form>
      <Footer />
    </>
  );
}

export default Login;
