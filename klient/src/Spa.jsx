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
import slika from "./img/spa.jpg";
import moment from "moment";
import { AuthContext } from "./authContext";
import { CartContext } from "./cartContext";
import { useContext } from "react";
import plus from "./img/plus.png";
import { Link, useNavigate } from "react-router-dom";
import Popup from "./Popup";
import styles from "./css/picture.css";
function Spa() {
  const { currentUser } = useContext(AuthContext);
  const { addCartSpa } = useContext(CartContext);
  const [sortspa, setSortSpa] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setID] = useState();

  const handleClickOpen = (id) => {
    setID(id);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchDataAdmin = async () => {
      try {
        const res = await Axios.get("spa/admin");
        console.log(res.data);
        setSortSpa(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDataAdmin();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3} key="plus">
          <Link to="/addSpa" style={{ textDecoration: "none" }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="auto"
                image={plus}
                alt="green iguana"
              />
              <CardContent style={{ backgroundColor: "#272727" }}>
                <Typography gutterBottom variant="h6">
                  Dodaj novi spa događaj
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        {sortspa.map((sp) => (
          <Grid item xs={3} key={sp.id}>
            <Card sx={{ maxWidth: 345 }} key={sp.id}>
              <CardMedia
                component="img"
                height="140"
                image={slika}
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
                  onClick={() => {
                    handleClickOpen(sp.ID_SPA);
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
          <Popup open={open} id={id} vrsta="spa" onClose={handleClose} />
        )}
      </Grid>
    </>
  );
}
export default Spa;
