import { useEffect, useState } from "react";
import Axios from "axios";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";
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
function AddSport() {
  const [startingDate, setStartingDate] = useState(dayjs(new Date()));
  const [endingDate, setEndingDate] = useState(dayjs(new Date()));
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [inputs, setInputs] = useState({
    name_sport: "",
    capacity_sport: "",
    price_sport: "",
    description_sport: "",
    hotel_sport: null,
    starting_date_sport: null,
    ending_date_sport: null,
  });
  const handleChangePocetak = (newValue1) => {
    setStartingDate(newValue1);
  };
  useEffect(() => {
    setInputs((prev) => ({ ...prev, starting_date_sport: startingDate }));
  }, [startingDate]);
  const handleChangeZavrsetak = (newValue) => {
    setEndingDate(newValue);
  };
  const handleChangeSelectHotel = (event) => {
    setSelectedHotel(event.target.value);
    setInputs((prev) => ({ ...prev, hotel_sport: event.target.value }));
    console.log(inputs);
  };
  useEffect(() => {
    setInputs((prev) => ({ ...prev, ending_date_sport: endingDate }));
  }, [endingDate]);

  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      inputs.name_sport !== "" &&
      inputs.capacity_sport !== "" &&
      inputs.price_sport !== ""
    ) {
      try {
        await Axios.post("sport/create", inputs);
      } catch (err) {
        setError(err.response.data);
      }
      navigate("/sportske-aktivnosti");
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
                        label="Izaberite hotel"
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
                    name="name_sport"
                    id="outlined-basic"
                    fullWidth
                    label="Vrsta sporta"
                    variant="outlined"
                  />
                </Grid>

                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="capacity_sport"
                    id="outlined-basic"
                    fullWidth
                    label="Kapacitet"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="price_sport"
                    id="outlined-basic"
                    fullWidth
                    label="Cijena"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    onChange={handleChange}
                    name="description_sport"
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
                      value={startingDate}
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
                      minDate={startingDate}
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

export default AddSport;
