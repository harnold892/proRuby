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
import { AuthContext } from "./authContext";
import { useContext } from "react";
import { CartContext } from "./cartContext";
import { Calendar } from "react-multi-date-picker";
import moment from "moment";
import styles from "./css/picture.css";
function ReservationMenu() {
  const { currentUser } = useContext(AuthContext);
  const [values, setValues] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [notif, setNotif] = useState("");
  const { addCartNocenja } = useContext(CartContext);

  useEffect(() => {
    if (typeof values[1] !== "undefined") {
      const fetchData = async () => {
        var start = new Date(values[0]);
        var end = new Date(values[1]);
        start = moment(start).format("YYYY-MM-DD");
        end = moment(end).format("YYYY-MM-DD");

        try {
          const res = await Axios.get(
            "reservation/available/" + start + "/" + end
          );
          console.log(res.data);
          setRooms(res.data);
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

        setRooms(res.data);
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
      setRooms([]);
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
            <Card sx={{ maxWidth: 345 }} key="{n.id}">
              <CardMedia
                component="img"
                height="140"
                image={slika}
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
    </Grid>
  );
}
export default ReservationMenu;
