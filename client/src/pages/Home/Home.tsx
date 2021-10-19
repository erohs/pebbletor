import React from "react";
import DeleteIcon from "../../components/Icons/DeleteIcon";
import { Link } from "react-router-dom";
import { IHomeState } from "./interfaces/IHomeState";
import { IHill } from "../../components/Hill/interfaces/IHill";
import { deleteHill, fetchHills } from "../../api";
import "./style/Home.css";

class Home extends React.Component<{}, IHomeState> {
    state = {
        hills: []
    };

    componentDidMount() {
        fetchHills()
            .then(res => this.setState({ hills: [...this.state.hills, ...res.data] }));
    }

    deleteHill = (id: string) => {
        deleteHill(id)
            .then(() => {
                const hills = this.state.hills.filter((hill: IHill) => hill._id !== id);
                this.setState({ hills: hills });
            });
    }

    render() {
        return (
            <div className="home">
                <h1 className="home__title">Showing all hill charts</h1>
                {this.state.hills.map((hill: IHill, index: number) => (
                    <div key={index} className="card hill-card">
                        <Link to={`/hill/${hill._id}`} className="hill-card__link">
                            <h1>{hill.name}</h1>
                        </Link>
                        <p className="hill-card__author">by {hill.author}</p>
                        <p className="hill-card__description">{hill.description}</p>
                        <div className="hill-card__data">
                            <div className="hill-card__dates">
                                <p className="hill-card__date">Created {new Date(hill.createdAt).toUTCString()}</p>
                                {hill.updatedAt && <p className="hill-card__date">Last updated {new Date(hill.updatedAt).toUTCString()}</p>}
                            </div>
                            <button onClick={() => this.deleteHill(hill._id)} className="hill-card__delete">
                                <DeleteIcon />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Home;
