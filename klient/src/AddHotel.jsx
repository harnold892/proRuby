import { useState } from "react";
import Axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";

function AddHotel() {
  const [inputs, setInputs] = useState({
    name_hotel: "",
    address_hotel: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.name_hotel !== "" && inputs.address_hotel !== "") {
      try {
        await Axios.post("hotel/create", inputs);
      } catch (err) {
        setError(err.response.data);
      }
      navigate("/hotel");
    } else {
      setError("Nisu sva polja popunjena!");
    }
  };

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
          <Paper elevation={2} sx={{ padding: 5 }}>
            <form>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="name_hotel"
                    id="outlined-basic"
                    fullWidth
                    label="Naziv hotela"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="address_hotel"
                    id="outlined-basic"
                    fullWidth
                    label="Adresa"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>{err && <Alert severity="error">{err}</Alert>}</Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleSubmit} fullWidth>
                    Dodaj
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

export default AddHotel;
