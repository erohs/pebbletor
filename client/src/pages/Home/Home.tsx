import React from "react";
import DeleteIcon from "../../components/Icons/DeleteIcon";
import EditIcon from "../../components/Icons/EditIcon";
import ModalContainer from "../../components/Modal/ModalContainer";
import { Link } from "react-router-dom";
import { IHomeState } from "./interfaces/IHomeState";
import { IHill } from "../../components/Hill/interfaces/IHill";
import { deleteHill, fetchHills } from "../../api";
import { hillPlaceholder } from "../../components/Hill/util/hillPlaceholder";
import { IPagintation } from "./interfaces/IPagination";
import "./style/Home.css";

class Home extends React.Component {
    state: IHomeState = {
        hills: [],
        hill: hillPlaceholder,
        showModal: false,
        nextPage: undefined,
        previousPage: undefined
    };

    componentDidMount() {
        fetchHills(1, 4)
            .then(res => {
                this.setState({ 
                    hills: [...this.state.hills, ...res.data.results],
                    nextPage: res.data.next,
                    previousPage: res.data.previous
                })
            });
    }

    deleteHill = (id: string) => {
        deleteHill(id)
            .then(() => {
                const hills = this.state.hills.filter((hill: IHill) => hill._id !== id);
                this.setState({ hills: hills });
            });
    }

    selectHill = (hill: IHill) => {
        this.setState({ hill });
        this.setState({ showModal: true });
    }

    deselectHill = () => {
        this.setState({ hill: hillPlaceholder });
        this.setState({ showModal: false });
    }

    fetchNextHills = (next: IPagintation) => {
        fetchHills(next.page, next.limit)
            .then(res => {
                console.log(res.data);
                this.setState({ 
                    hills: [...this.state.hills, ...res.data.results],
                    nextPage: res.data.next,
                    previousPage: res.data.previous
                })
            });
    }

    render() {
        return (
            <div className="home">
                <div className="home__header">
                    <h1 className="home__title">Hill charts</h1>
                    {/* <input className="home__search" type="text" name="" id="" placeholder="Search"/> */}
                </div>

                {this.state.hills.map((hill: IHill, index: number) => (
                    <div key={index} className="card hill-card">
                        <Link to={`/hill/${hill._id}`} className="hill-card__link">
                            <h2>{hill.name}</h2>
                        </Link>
                        <p className="hill-card__author">by {hill.author}</p>
                        <p className="hill-card__description">{hill.description}</p>
                        <div className="hill-card__data">
                            <div className="hill-card__dates">
                                <p className="hill-card__date">Created {new Date(hill.createdAt).toUTCString()}</p>
                                {hill.updatedAt && <p className="hill-card__date">Last updated {new Date(hill.updatedAt).toUTCString()}</p>}
                            </div>
                            <div className="hill-card__buttons">
                                <Link to={`/edit/${hill._id}`} className="hill-card__edit"><EditIcon /></Link>
                                <button onClick={() => this.selectHill(hill)} className="hill-card__delete">
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                { this.state.nextPage ? (
                    <div className="home__next">
                        <button className="load-more"
                                onClick={() => this.fetchNextHills(this.state.nextPage!)}>
                                <p>Load More</p>
                        </button>
                    </div>
                ) : null }
                <ModalContainer onSubmit={() => this.deleteHill(this.state.hill!._id)}
                                onClose={() => this.deselectHill()}
                                isShown={this.state.showModal}
                                text={{title: "Delete Hill", submit: "Delete"}}
                                className="delete">
                    <p>Are you sure you want to delete <b>{this.state.hill.name}</b>?</p>
                </ModalContainer>
            </div>
        );
    }
}

export default Home;
