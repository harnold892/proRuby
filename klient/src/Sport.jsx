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
import slika from "./img/sport.png";
import moment from "moment";
import { AuthContext } from "./authContext";
import { CartContext } from "./cartContext";
import { useContext } from "react";
import plus from "./img/plus.png";
import { Link, useNavigate } from "react-router-dom";
import Popup from "./Popup";
import styles from "./css/picture.css";
function Sport() {
  const [sortsports, setSortSports] = useState([]);

  const [open, setOpen] = useState(false);
  const [id, setID] = useState();

  const handleClickOpen = (id) => {
    setID(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchDataAdmin = async () => {
      try {
        const res = await Axios.get("sport/admin");

        setSortSports(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDataAdmin();
  }, []);
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} key="plus">
        <Link to="/addSport" style={{ textDecoration: "none" }}>
          <Card sx={{ maxWidth: 345 }} key={"add"}>
            <CardMedia
              component="img"
              height="auto"
              image={plus}
              alt="green iguana"
            />
            <CardContent style={{ backgroundColor: "#272727" }}>
              <Typography gutterBottom variant="h6">
                Dodaj novi sportski dogadjaj
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>

      {sortsports.map((sport) => (
        <Grid item xs={3} key={sport.id}>
          <Card sx={{ maxWidth: 345 }} key={sport.id}>
            <CardMedia
              component="img"
              height="140"
              image={slika}
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
                onClick={() => {
                  handleClickOpen(sport.ID_SPORT);
                }}
                variant="contained"
                style={{ width: "100%" }}
              >
                Pregledaj istoriju
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      {open && (
        <Popup open={open} id={id} vrsta="sport" onClose={handleClose} />
      )}
    </Grid>
  );
}
export default Sport;
