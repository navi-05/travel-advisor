
export const getPlacesDetails = async(type, sw, ne) => {
  try {
    const response = await fetch(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?bl_latitude=${sw.lat}&tr_latitude=${ne.lat}&bl_longitude=${sw.lng}&tr_longitude=${ne.lng}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_TRAVEL_API_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });
    const { data } = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

// export const getWeatherDetails = async(lat, lng) => {
//   try {
//     const response = await fetch(`https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lng}`, {
//       method: 'GET',
//       headers: {
//         'X-RapidAPI-Key': 'dcbc879a96mshd3f8dbe552e4c45p1465fdjsn1265f315913c',
//         'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
//       }
//     })
//     const result = await response.json()
//     return result
//   } catch (error) {
//     console.log(error)
//   }
// }