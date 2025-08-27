import Link from "next/link";
import Image from "next/image";


const Navbar=()=>{
    return (
        <nav className="navbar">
            <Link href="/">
                <Image className={"home-icon"} src="/homeIcon.png" alt="Home" width={75} height={75} />
            </Link>
            <Link href="/SettingsPage">
                <Image className={"settings-icon"} src="/settingsIcon.png" alt="Home" width={75} height={75} />
            </Link>
            {/*<Link href="/profile">Profile</Link>*/}
        </nav>
    )

}
export default Navbar;