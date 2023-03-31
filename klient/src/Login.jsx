import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Alert,
  Typography,
} from "@mui/material";
import { AuthContext } from "./authContext";

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login, currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
    } catch (err) {
      setError(err.response.data);
    }
  };
  useEffect(() => {
    if (currentUser?.user.isadmin === true) {
      navigate("/");
    }
    if (currentUser?.user.isadmin === false) {
      navigate("/reservation");
    }
  }, [currentUser]);
  return (
    <>
      <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper
            elevation={2}
            sx={{ padding: 5 }}
            style={{
              backgroundColor: "#272727",
            }}
          >
            <form>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="username"
                    id="outlined-basic"
                    fullWidth
                    label="Username"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="password"
                    type="password"
                    id="outlined-basic"
                    fullWidth
                    label="Password"
                    variant="outlined"
                  />
                </Grid>

                <Grid item>{err && <Alert severity="error">{err}</Alert>}</Grid>
                <Grid item>
                  <Typography>
                    {" "}
                    Ako nemate account kliknite{" "}
                    <Link to="/register"> Ovdje</Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleSubmit} fullWidth>
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}
export default App;
