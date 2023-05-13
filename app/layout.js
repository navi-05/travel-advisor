import '@styles/globals.styles.js'

export const metadata = {
  title: 'Travel Advisor',
  description: 'One stop solution',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        {children}
        <script src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`}></script>
      </body>
    </html>
  )
}
