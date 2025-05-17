import VantaBackground from "./components/VantaBackground"



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
<VantaBackground/>
        {children}
      </body>
    </html>
  )
}

