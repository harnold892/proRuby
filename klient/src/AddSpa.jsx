import { useEffect, useState } from "react";
import Axios from "axios";
import dayjs, { Dayjs } from "dayjs";

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
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function AddSpa() {
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endingDate, setEndingDate] = useState(dayjs(new Date()));
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const handleChangePocetak = (newValue1) => {
    setStartDate(newValue1);
  };
  useEffect(() => {
    setInputs((prev) => ({ ...prev, starting_date_spa: startDate }));
  }, [startDate]);
  const handleChangeZavrsetak = (newValue) => {
    setEndingDate(newValue);
  };
  const handleChangeSelectHotel = (event) => {
    setSelectedHotel(event.target.value);
    setInputs((prev) => ({ ...prev, hotel_spa: event.target.value }));
    console.log(inputs);
  };
  useEffect(() => {
    setInputs((prev) => ({ ...prev, ending_date_spa: endingDate }));
  }, [endingDate]);
  const [inputs, setInputs] = useState({
    name_spa: "",
    price_spa: "",
    description_spa: "",
    hotel_spa: null,
    starting_date_spa: null,
    ending_date_spa: null,
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      inputs.vrsta_sport !== "" &&
      inputs.kapacitet_sport !== "" &&
      inputs.cijena_sport !== ""
    ) {
      try {
        await Axios.post("spa/create", inputs);
      } catch (err) {
        setError(err.response.data);
      }
      navigate("/spa-aktivnosti");
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
                    name="name_spa"
                    id="outlined-basic"
                    fullWidth
                    label="Naziv spa aktivnosti"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="price_spa"
                    id="outlined-basic"
                    fullWidth
                    label="Cijena"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    onChange={handleChange}
                    name="description_spa"
                    id="outlined-basic"
                    fullWidth
                    multiline
                    rows={6}
                    label="Opis"
                    variant="outlined"
                  />
                </Grid>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid item>
                    <DesktopDatePicker
                      label="Datum početka aktivnosti"
                      inputFormat="DD/MM/YYYY"
                      name="datum_pocetka"
                      minDate={new Date()}
                      value={startDate}
                      onChange={handleChangePocetak}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            sx={{
                              svg: { color },
                              input: { color },
                              label: { color },
                            }}
                          />
                        );
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <DesktopDatePicker
                      label="Datum završetka aktivnosti"
                      inputFormat="DD/MM/YYYY"
                      name="datum_zavrsetka"
                      minDate={startDate}
                      value={endingDate}
                      onChange={handleChangeZavrsetak}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            sx={{
                              svg: { color },
                              input: { color },
                              label: { color },
                            }}
                          />
                        );
                      }}
                    />
                  </Grid>
                </LocalizationProvider>
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
