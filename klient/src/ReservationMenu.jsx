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
import picRoom from "./img/soba.jpg";
import picSport from "./img/sport.png";
import picSpa from "./img/spa.jpg";
import { AuthContext } from "./authContext";
import { useContext } from "react";
import { CartContext } from "./cartContext";
import { Calendar } from "react-multi-date-picker";
import moment from "moment";
import styles from "./css/picture.css";
import Spa from "./Spa";
function ReservationMenu() {
  const { currentUser } = useContext(AuthContext);
  const [values, setValues] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [sports, setSports] = useState([]);
  const [spas, setSpas] = useState([]);
  const [notif, setNotif] = useState("");
  const { addCartNocenja, addCartSport, addCartSpa } = useContext(CartContext);

  const fetchDataRoom = async () => {
    var start = new Date(values[0]);
    var end = new Date(values[1]);
    start = moment(start).format("YYYY-MM-DD");
    end = moment(end).format("YYYY-MM-DD");

    try {
      const res = await Axios.get("reservation/available/" + start + "/" + end);
      console.log(res.data);
      setRooms(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchDataSport = async (hotel_id) => {
    var start = new Date(values[0]);
    var end = new Date(values[1]);
    start = moment(start).format("YYYY-MM-DD");
    end = moment(end).format("YYYY-MM-DD");

    try {
      const res = await Axios.get(
        "reservation/sport/" + start + "/" + end + "/" + hotel_id
      );
      console.log(res.data);
      setSports(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (typeof values[1] !== "undefined") {
      fetchDataRoom();
    }
  }, [values[1]]);

  useEffect(() => {
    if (typeof values[0] !== "undefined") {
      setRooms([]);
      setSpas([]);
      setSports([]);
    }
  }, [values[0]]);
  return (
    <Grid container spacing={2} rowSpacing={4} sx={{ overflow: "auto" }}>
      {notif === 1 && (
        <Grid item xs={12}>
          <Alert severity="success">Rezervacija je dodata na račun!</Alert>
        </Grid>
      )}

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
      </>

      {rooms.length > 0 &&
        rooms.map((n) => (
          <Grid item xs={3} key={n.id}>
            <Card sx={{ maxWidth: 345 }} key={n.id}>
              <CardMedia
                component="img"
                height="140"
                image={picRoom}
                alt="green iguana"
              />
              <CardContent style={{ backgroundColor: "#272727" }}>
                <Typography textAlign="center" variant="h4">
                  {n.number_room}
                </Typography>
                <Typography textAlign="center" variant="h4">
                  {n.name_hotel}
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
                  {n.hotel_name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Cijena={n.price_room}KM
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kapacitet:{n.capacity_room}
                </Typography>
              </CardContent>
              <CardActions style={{ backgroundColor: "#272727" }}>
                <Button
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={() => {
                    addCartNocenja({
                      id: n.id,
                      number_room: n.number_room,
                      name_hotel: n.name_hotel,
                      is_apartment: n.is_apartment,
                      capacity_room: n.capacity_room,
                      price_room: n.price_room,
                      check_in_date: new Date(values[0]),
                      check_out_date: new Date(values[1]),
                    });
                    fetchDataSport(n.hotel_id);
                    setValues([]);
                    setNotif(1);
                    setRooms([]);
                  }}
                >
                  dodaj u korpu
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      {sports.length > 0 &&
        sports.map((sport) => (
          <Grid item xs={3} key={sport.id}>
            <Card sx={{ maxWidth: 345 }} key={sport.id}>
              <CardMedia
                component="img"
                height="140"
                image={picSport}
                alt="green iguana"
              />
              <CardContent style={{ backgroundColor: "#272727" }}>
                <Typography textAlign="center" variant="h4">
                  {sport.name_sport}
                </Typography>
                <Typography variant="h6">{sport.name_hotel}</Typography>
                <Typography variant="h6" color="text.secondary">
                  Kapacitet={sport.capacity_sport}
                </Typography>
                <Typography vvariant="h6" color="text.secondary">
                  Cijena={sport.price_sport}KM po osobi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Opis:{sport.description_sport}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {moment(sport.starting_date_sport).format("DD/MM/YYYY")} -{" "}
                  {moment(sport.ending_date_sport).format("DD/MM/YYYY")}
                </Typography>
              </CardContent>

              <CardActions style={{ backgroundColor: "#272727" }}>
                <Button
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={() => {
                    addCartSport({
                      id: sport.id,
                      name_sport: sport.name_sport,
                      capacity_sport: sport.capacity_sport,
                      price_sport: sport.price_sport,
                      starting_date_sport: sport.starting_date_sport,
                      ending_date_sport: sport.ending_date_sport,
                    });
                    setValues([]);
                    setNotif(1);
                  }}
                >
                  dodaj u korpu
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      {spas.length > 0 &&
        spas.map((sp) => (
          <Grid item xs={3} key={sp.id}>
            <Card sx={{ maxWidth: 345 }} key={sp.id}>
              <CardMedia
                component="img"
                height="140"
                image={picSpa}
                alt="green iguana"
              />
              <CardContent style={{ backgroundColor: "#272727" }}>
                <Typography textAlign="center" variant="h4">
                  {sp.name_spa}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {sp.name_hotel}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Cijena={sp.price_spa}KM po osobi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Opis:{sp.description_spa}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {moment(sp.starting_date_spa).format("DD/MM/YYYY")} -{" "}
                  {moment(sp.ending_date_spa).format("DD/MM/YYYY")}
                </Typography>
              </CardContent>

              <CardActions style={{ backgroundColor: "#272727" }}>
                <Button
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={() => {
                    addCartSport({
                      id: sp.id,
                      name_spa: sp.name_spa,
                      price_spa: sp.price_sport,
                      starting_date_spa: sp.starting_date_spa,
                      ending_date_spa: sp.ending_date_spa,
                    });
                    setValues([]);
                    setNotif(1);
                  }}
                >
                  dodaj u korpu
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
export default ReservationMenu;
