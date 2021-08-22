import "./style/Footer.css";
import logo from "../../images/pebblepad-logo.png";

const Footer = () => {
    return (
        <div className="footer">
            Made with ❤️ by <img className="footer__image" src={logo} alt="Pebblepad logo" /> PebblePad!
        </div>
    );
    
}

export default Footer;
