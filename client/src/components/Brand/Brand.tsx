import logo from "../../images/Logo.png";
import "./style/Brand.css";

const Brand = () => {
    return (
        <div className="brand">
            <img className="brand__logo" src={logo} alt="PebbleTor logo" />
            <p className="brand__text">PebbleTor</p>
        </div>
    );
}

export default Brand;
