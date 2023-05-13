import GoogleMapReact from "google-map-react"
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import { LocationOnOutlined } from "@material-ui/icons"
import { Rating } from "@material-ui/lab"

import useStyles, { mapStyles } from '@styles/globals.styles.js'

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {

  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width: 600px)')

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoordinates({
            lat: e.center.lat,
            lng: e.center.lng
          })    
          setBounds({
            ne: e.marginBounds.ne,
            sw: e.marginBounds.sw
          })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {
              !isDesktop ? (
                <LocationOnOutlined color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img
                      className={classes.pointer}
                      src={place.photo ? place.photo.images.large.url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_qYlo4n-xjIB_AfQZjwmDL6F7lnN8O5G3mA&usqp=CAU'}
                      alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )
            }
          </div>
        ))}
            
      </GoogleMapReact>
    </div>
  )
}

export default Map