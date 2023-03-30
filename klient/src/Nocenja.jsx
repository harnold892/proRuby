import {
  Card,
  Grid,
  Typography,
  CardMedia,
  CardContent,
  Button,
  CardActions,
  Alert,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Paper,
} from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import slika from "./img/soba.jpg";
import Popup from "./Popup";
import { AuthContext } from "./authContext";
import { useContext } from "react";
import { CartContext } from "./cartContext";
import { Calendar } from "react-multi-date-picker";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import styles from "./css/picture.css";
function Nocenja() {
  const { currentUser } = useContext(AuthContext);
  const [values, setValues] = useState([]);
  const [sortnoc, setSortNoc] = useState([]);
  const [fullnoc, setFullNoc] = useState([]);
  const [notif, setNotif] = useState("");
  const { addCartNocenja } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [id, setID] = useState();
  const [idSelect, setIdSelect] = useState("");
  const [kapacitetSelect, setKapacitetSelect] = useState("");
  const [cijenaSelect, setCijenaSelect] = useState("");
  const [smjestajSelect, setSmjestajSelect] = useState("");
  const handleChangeSelectBroj = (event) => {
    setIdSelect(event.target.value);
    setSortNoc(
      fullnoc.filter(
        (soba) =>
          soba.id === event.target.value &&
          (kapacitetSelect !== ""
            ? kapacitetSelect === soba.capacity_room
            : true) &&
          (smjestajSelect !== "" ? smjestajSelect === soba.is_apartment : true)
      )
    );
  };
  const handleChangeSelectSmjestaj = (event) => {
    setSmjestajSelect(event.target.value);
    setSortNoc(
      fullnoc.filter(
        (soba) =>
          soba.is_apartment === event.target.value &&
          (idSelect !== "" ? idSelect === soba.id : true) &&
          (kapacitetSelect !== ""
            ? kapacitetSelect === soba.capacity_room
            : true)
      )
    );
  };
  const handleClickReset = () => {
    setIdSelect("");
    setCijenaSelect("");
    setKapacitetSelect("");
    setSmjestajSelect("");
    setSortNoc(fullnoc);
  };
  const handleChangeSelectCijene = (event) => {
    setCijenaSelect(event.target.value);
    if (event.target.value === 1) {
      setFullNoc([...fullnoc].sort((a, b) => a.price_room - b.price_room));
      setSortNoc([...sortnoc].sort((a, b) => a.price_room - b.price_room));
    } else {
      setFullNoc([...fullnoc].sort((a, b) => b.price_room - a.price_room));
      setSortNoc([...sortnoc].sort((a, b) => b.price_room - a.price_room));
    }
  };
  const handleChangeSelectKapacitet = (event) => {
    setKapacitetSelect(event.target.value);
    setSortNoc(
      fullnoc.filter(
        (soba) =>
          soba.capacity_room === event.target.value &&
          (idSelect !== "" ? idSelect === soba.id : true) &&
          (smjestajSelect !== "" ? smjestajSelect === soba.is_apartment : true)
      )
    );
  };

  const handleClickOpen = (id) => {
    setID(id);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    if (typeof values[1] !== "undefined") {
      const fetchData = async () => {
        var start = new Date(values[0]);
        var end = new Date(values[1]);
        start = moment(start).format("YYYY-MM-DD");
        end = moment(end).format("YYYY-MM-DD");

        try {
          const res = await Axios.get("/nocenje/" + start + "/" + end);
          setFullNoc(res.data);
          setSortNoc(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [values[1]]);
  useEffect(() => {
    const fetchDataAdmin = async () => {
      try {
        const res = await Axios.get("room/admin");

        setSortNoc(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser.user.isadmin === true) {
      fetchDataAdmin();
    }
  }, []);
  useEffect(() => {
    if (typeof values[0] !== "undefined") {
      setSortNoc([]);
    }
  }, [values[0]]);
  return (
    <Grid container spacing={2} rowSpacing={4} sx={{ overflow: "auto" }}>
      {notif === 1 && (
        <Grid item xs={12}>
          <Alert severity="success">Rezervacija je dodata na račun!</Alert>
        </Grid>
      )}

      {currentUser.user.isadmin === false && (
        <>
          <Grid item xs={12}>
            <Typography variant="h2" textAlign="center">
              Izaberite datum dolaska i odlaska
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ display: "flex", alignItems: "center" }}
            justifyContent="center"
          >
            <Calendar
              value={values}
              onChange={setValues}
              minDate={new Date()}
              range
              rangeHover
            />
          </Grid>

          <Grid
            item
            xs={12}
            style={{ display: "flex", alignItems: "center" }}
            justifyContent="center"
          >
            <Paper
              elevation={2}
              sx={{ padding: 5 }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: "#272727",
              }}
            >
              {typeof values[1] !== "undefined" && (
                <>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Broj sobe
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={idSelect}
                        label="Broj sobe"
                        onChange={handleChangeSelectBroj}
                        sx={{
                          color: "white",
                        }}
                      >
                        {fullnoc.length > 0 ? (
                          fullnoc.map((n) => (
                            <MenuItem value={n.id}>{n.id}</MenuItem>
                          ))
                        ) : (
                          <MenuItem value={0}>
                            Nema slobodnih soba u tom periodu
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ minWidth: 160 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Kapacitet sobe
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={kapacitetSelect}
                        label="Kapacitet sobe"
                        onChange={handleChangeSelectKapacitet}
                        sx={{
                          color: "white",
                        }}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ minWidth: 160 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Sortiranje cijena
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cijenaSelect}
                        label="Sortiranje cijena"
                        onChange={handleChangeSelectCijene}
                        sx={{
                          color: "white",
                        }}
                      >
                        <MenuItem value={1}>Od najvece do najmanje</MenuItem>
                        <MenuItem value={2}>Od najmanje do najvece</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ minWidth: 160 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Vrsta smještaja
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={smjestajSelect}
                        label="Vrsta smještaja"
                        onChange={handleChangeSelectSmjestaj}
                        sx={{
                          color: "white",
                        }}
                      >
                        <MenuItem value={1}>Apartman</MenuItem>
                        <MenuItem value={0}>Soba</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {(smjestajSelect !== "" ||
                    cijenaSelect !== "" ||
                    kapacitetSelect !== "" ||
                    idSelect !== "") && (
                    <Button variant="contained" onClick={handleClickReset}>
                      Resetuj sort
                    </Button>
                  )}
                </>
              )}
            </Paper>
          </Grid>
        </>
      )}

      {sortnoc.length > 0 &&
        sortnoc.map((n) => (
          <Grid item xs={3} key={n.id}>
            <Card sx={{ maxWidth: 345 }} key="{n.id}">
              <CardMedia
                component="img"
                height="140"
                image={slika}
                alt="green iguana"
              />
              <CardContent style={{ backgroundColor: "#272727" }}>
                <Typography textAlign="center" variant="h4">
                  {n.id}
                </Typography>
                {n.is_apartment === true ? (
                  <Typography variant="h6" color="text.secondary">
                    Apartman
                  </Typography>
                ) : (
                  <Typography variant="h6" color="text.secondary">
                    Soba
                  </Typography>
                )}

                <Typography variant="h6" color="text.secondary">
                  Cijena={n.price_room}KM
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kapacitet:{n.capacity_room}
                </Typography>
              </CardContent>
              {currentUser.user.isadmin === true ? (
                <CardActions style={{ backgroundColor: "#272727" }}>
                  <Button
                    onClick={() => {
                      handleClickOpen(n.id);
                    }}
                    variant="contained"
                    style={{ width: "100%" }}
                  >
                    Pregledaj istoriju
                  </Button>
                </CardActions>
              ) : (
                <CardActions style={{ backgroundColor: "#272727" }}>
                  <Button
                    variant="contained"
                    style={{ width: "100%" }}
                    onClick={() => {
                      addCartNocenja({
                        id: n.id,
                        is_apartment: n.is_apartment,
                        capacity_room: n.capacity_room,
                        price_room: n.price_room,
                        DATUM_DOLASKA: new Date(values[0]),
                        DATUM_ODLASKA: new Date(values[1]),
                      });
                      setValues([]);
                      setNotif(1);
                      setSortNoc([]);
                    }}
                  >
                    dodaj u korpu
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      {open && (
        <Popup open={open} id={id} vrsta="nocenje" onClose={handleClose} />
      )}
    </Grid>
  );
}
export default Nocenja;
