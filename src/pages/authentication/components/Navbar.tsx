import Logo from "@/assets/images/axis-logo.jpeg"
const Navbar = () => {
    return (
        <div className="shadow-xl flex justify-start py-5 w-full  ">
            <img className=" pl-10 w-36 h-8 " src={Logo} alt="logo" />
        </div>
    )
}

export default Navbar
