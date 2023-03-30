import { Card, Grid, Typography, CardMedia, CardContent } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import slika from "./img/Night_hotel.jpg";
import moment from "moment";
import { AuthContext } from "./authContext";
import { useContext } from "react";
import plus from "./img/plus.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./css/picture.css";
function Hotel() {
  const { currentUser } = useContext(AuthContext);
  const [hoteli, setHoteli] = useState([]);

  useEffect(() => {
    const fetchDataAdmin = async () => {
      try {
        const res = await Axios.get("hotel/admin");
        console.log(res.data);
        setHoteli(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDataAdmin();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        {currentUser.user.isadmin === true && (
          <Grid item xs={3} key="plus">
            <Link to="/addHotel" style={{ textDecoration: "none" }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="auto"
                  image={plus}
                  alt="green iguana"
                />
                <CardContent style={{ backgroundColor: "#272727" }}>
                  <Typography gutterBottom variant="h6">
                    Dodaj novi hotel
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        )}
        {hoteli.map((sp) => (
          <Grid item xs={3} key="{sp.ID_SPA}">
            <Card sx={{ maxWidth: 345 }} key={sp.ID_SPA}>
              <CardMedia
                component="img"
                height="140"
                image={slika}
                alt="green iguana"
              />
              <CardContent style={{ backgroundColor: "#272727" }}>
                <Typography textAlign="center" variant="h4">
                  {sp.name_hotel}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Adresa: {sp.address_hotel}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
export default Hotel;
