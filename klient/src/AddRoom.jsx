import { useEffect, useState } from "react";
import Axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Alert,
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

function AddSpa() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [checked, setChecked] = useState(false);

  const handleChangeApartman = (event) => {
    setChecked(event.target.checked);
    setInputs((prev) => ({ ...prev, is_apartment: event.target.checked }));
  };
  const handleChangeSelectHotel = (event) => {
    setSelectedHotel(event.target.value);
    setInputs((prev) => ({ ...prev, hotel_room: event.target.value }));
    console.log(inputs);
  };

  const [inputs, setInputs] = useState({
    number_room: "",
    is_apartment: false,
    price_room: "",
    capacity_room: "",
    hotel_room: null,
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      inputs.number_room !== "" &&
      inputs.kapacitet_sport !== "" &&
      inputs.price_room !== ""
    ) {
      try {
        await Axios.post("room/create", inputs);
      } catch (err) {
        setError(err.response.data);
      }
      navigate("/room");
    } else {
      setError("Nisu sva polja popunjena!");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("hotel/admin");
        console.log(res.data);
        setHotels(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  const color = "#FFFFFF";
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
                  <Box sx={{ minWidth: 150 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Izaberite hotel
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedHotel}
                        label="Vrsta sporta"
                        onChange={handleChangeSelectHotel}
                        sx={{
                          color: "white",
                        }}
                      >
                        {hotels.length > 0 &&
                          hotels.map((s) => (
                            <MenuItem value={s.id}>{s.name_hotel}</MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="number_room"
                    id="outlined-basic"
                    fullWidth
                    label="Broj sobe"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="price_room"
                    id="outlined-basic"
                    fullWidth
                    label="Cijena po nocenju"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="capacity_room"
                    id="outlined-basic"
                    fullWidth
                    label="Kapacitet"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeApartman} />}
                    label="Apartman"
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

export default AddSpa;
