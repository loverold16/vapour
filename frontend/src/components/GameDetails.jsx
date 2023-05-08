import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import Gameloader from "../assets/Lottie/gamecontroller.json";
import Screenshots from "./Screenshots";
import StoreList from "./StoreList";
import Ratings from "./Ratings";
import Header from "../Navigation/Header";

export default function GameDetails() {
    const [gamedetails, setGameDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { id } = location.state;
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/games/${id}`)
            .then((res) => {
                setGameDetails(res.data);
                document.title = res.data.name;
                setLoading(false);
            })
            .catch((error) => {
                setfetchError(true);
                res.send(error);
            });
    }, []);

    if (loading) {
        return (
            <>
                <div className="d-flex align-items-center justify-content-center vh-100">
                    <div style={{ width: 400 }}>
                        <Lottie animationData={Gameloader} loop={true} />
                    </div>
                </div>
            </>
        );
    }
    const ratings = gamedetails.ratings;
    const keys = Object.keys(gamedetails);
    // const tags = keys.find((key) => key === "tags");
    // const genre = keys.find((key) => key === "genres");

    return (
        <>
            <div
                className="details"
                style={{
                    backgroundImage: `url(${gamedetails.background_image})`,
                }}
            >
                <div className="container-fluid">
                    <section>
                        <div className="rounded-2 p-3 maskedbg">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="gametitle p-3">
                                        <h1 className="text-white">{gamedetails.name}</h1>
                                        <button className="btn btn-info">
                                            <span className="fw-bold">Released: </span>
                                            {gamedetails.released}
                                        </button>
                                    </div>
                                    <div className="px-3">
                                        <h5>ABOUT THE GAME: </h5>
                                        <p>{gamedetails.description_raw}</p>
                                    </div>
                                    <div className="px-3">
                                        <h5 className="header-primary">DEVELOPERS: </h5>
                                        <ul>
                                            {gamedetails.developers?.map((dev, id) => (
                                                <li key={id}>{dev.name}</li>
                                            ))}
                                        </ul>
                                        <h5>WEBSITE</h5>
                                        <Link
                                            className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                            to={gamedetails.website}
                                        >
                                            {gamedetails.name}
                                        </Link>
                                    </div>
                                    <div className="p-3">
                                        <h5>WHERE TO BUY: </h5>
                                        <StoreList gameid={gamedetails.id} />
                                    </div>
                                    <div className="p-3">
                                        <h5>PUBLISHERS: </h5>
                                        <ul>
                                            {gamedetails.publishers?.map((publisher, id) => (
                                                <li key={id}>{publisher.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div
                                        className="btn-group px-3"
                                        role="group"
                                        aria-label="Basic mixed styles example"
                                    >
                                        <button type="button" className="btn btn-success border ">
                                            Add to Collection
                                        </button>
                                        <button type="button" className="btn btn-success border">
                                            Add to Liked
                                        </button>
                                        <button type="button" className="btn btn-success border">
                                            Refer to Friend
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="my-2">
                                        <Screenshots gameid={gamedetails.id} />
                                    </div>
                                    <div className="tags py-2">
                                        <h5>TAGS #</h5>
                                        {gamedetails.tags?.map((tag, id) => (
                                            <Link
                                                key={id}
                                                id={id}
                                                to={`/category/tags/${tag.slug}`}
                                                state={{ 'item': tag }}
                                                className="btn btn-sm btn-dark gametags border"
                                            >
                                                {tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="genres py-2">
                                        <h5>GENRES</h5>
                                        {gamedetails.genres?.map((genres, id) => (
                                            <Link
                                                key={id}
                                                to={`/category/genre/${genres.slug}`}
                                                state={{ 'item': genres }}
                                                className="btn btn-sm btn-dark gametags border"
                                            >
                                                {genres.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="ratings py-2">
                                        <h5>RATINGS</h5>
                                        <div className="progress" style={{ height: "3rem" }}>
                                            <Ratings
                                                data={ratings}
                                                colors={[
                                                    "bg-success",
                                                    "bg-warning",
                                                    "bg-danger",
                                                    "bg-info",
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="details-section">
                            <ul className="nav nav-tabs custom-nav border border-0">
                                <li className="nav-item maskedbg rounded">
                                    <a
                                        className="nav-link active"
                                        data-bs-toggle="tab"
                                        href="#contact-details"
                                    >
                                        Contact Details
                                    </a>
                                </li>
                                <li className="nav-item maskedbg rounded">
                                    <a
                                        className="nav-link "
                                        data-bs-toggle="tab"
                                        href="#files-attached"
                                    >
                                        Files Attached
                                    </a>
                                </li>
                            </ul>
                            <div className="card tab-content maskedbg">
                                <div id="contact-details" className="tab-pane active">
                                    <div className="card-body">
                                        <h2>Contact Details</h2>
                                    </div>
                                </div>
                                <div id="files-attached" className="tab-pane fade">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <h2>Files Attached</h2>
                                        </div>
                                    </div>
                                </div>
                                <div id="client-progress" className="tab-pane fade">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <h2>Client Progress</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}