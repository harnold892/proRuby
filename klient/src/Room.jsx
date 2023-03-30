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
import plus from "./img/plus.png";
import { Link, useNavigate } from "react-router-dom";
import Popup from "./Popup";
import styles from "./css/picture.css";
function Spa() {
  const [rooms, setRooms] = useState([]);
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
        const res = await Axios.get("room/admin");
        console.log(res.data);
        setRooms(res.data);
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
          <Link to="/addRoom" style={{ textDecoration: "none" }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="auto"
                image={plus}
                alt="green iguana"
              />
              <CardContent style={{ backgroundColor: "#272727" }}>
                <Typography gutterBottom variant="h6">
                  Dodaj novu sobu
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        {rooms.map((sp) => (
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
                  {sp.number_room}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {sp.name_hotel}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Kapacitet={sp.capacity_room}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Cijena={sp.price_room}KM po osobi
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
