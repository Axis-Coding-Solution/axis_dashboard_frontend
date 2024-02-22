import LoginPage from "@/pages/authentication/login"
// import Video from "@/assets/images/bgbg.webp"

const BlankLayout = () => {
  return (
    <div
      style={{
        // backgroundImage: `url(${Video})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
      }}
    >
      <div 
      >
       {/* <video autoPlay loop  style={{ width: "100%", height: "100%" }} >
        <source src={Video}   type="video/mp4" />
       </video> */}
        {/* BlankLayout */}
        {/* <Navbar />  */}
        <LoginPage />
      </div>
    </div>
  )
}

export default BlankLayout
