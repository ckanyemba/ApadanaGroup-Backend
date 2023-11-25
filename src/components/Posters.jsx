import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Posters = () => {
  const { items: data, status } = useSelector((state) => state.events);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (event) => {
    dispatch(addToCart(event));
    navigate("/cart");
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh" // Make sure the content covers the full viewport height
  }; // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  return (
    <div className="events-container" style={backgroundStyle}>
      {status === "success" ? (
        <>
          <h2>New Events</h2>
          <div className="events">
            {data &&
              data?.map((event) => (
                <div key={event._id} className="event">
                  <h3>{event.name}</h3>
                  <Link to={`/event/${event._id}`}>
                  <img src={event.image.url} alt={event.name} />
                  </Link>
                  <div className="details">
                    <span>{event.desc}</span>
                    <span>{event.content}</span>
                    <span className="createdAt">${event.createdAt}</span>
                  </div>
                  <button onClick={() => handleAddToCart(event)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Posters;
