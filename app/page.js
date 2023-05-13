'use client'
import { useEffect, useState } from "react"
import { CssBaseline, Grid } from "@material-ui/core"

import Header from "@components/Header"
import List from "@components/List"
import Map from "@components/Map"
import { getPlacesDetails, getWeatherDetails } from "@utils"

const Home = () => {
  
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})

  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('All')

  const [weatherData, setWeatherData] = useState([])

  // To get the user's location
  useEffect(() => {
    // Built in browser geo-location api
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
      setCoordinates({
        lat: latitude, 
        lng: longitude
      })
    })
  }, [])

  useEffect(() => {
    const filteredPlaces1 = places.filter((place) => place.rating > rating )
    setFilteredPlaces(filteredPlaces1)
  }, [rating])

  useEffect(() => {
    if(bounds.sw && bounds.ne) {
      setIsLoading(true)
      // getWeatherDetails(coordinates.lat, coordinates.lng)
      //   .then((data) => setWeatherData(data))
      getPlacesDetails(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0)) 
          setFilteredPlaces([])
          setIsLoading(false)
        })
    }
  }, [type, bounds])


  return (
    <>
        <CssBaseline />
        <Header setCoordinates={setCoordinates} />
        <Grid container spacing={3} style={{ width: '100%' }}>
            <Grid item xs={12} md={4}>
                <List 
                  places={filteredPlaces.length ? filteredPlaces : places} 
                  childClicked={childClicked}
                  isLoading={isLoading}
                  type={type}
                  setType={setType}
                  rating={rating}
                  setRating={setRating}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map
                  setCoordinates={setCoordinates}
                  setBounds={setBounds}
                  coordinates={coordinates}
                  places={filteredPlaces.length ? filteredPlaces : places}
                  setChildClicked={setChildClicked}
                />
            </Grid>
        </Grid>
    </>
  )
}

export default Home 