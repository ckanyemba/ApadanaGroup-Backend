import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1496989981497-27d69cdad83e?q=80&w=1831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ForGallery = () => {
    const { items: data, status } = useSelector((state) => state.galleries);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh" // Make sure the content covers the full viewport height
  };

  return (
    <div className="image-container" style={backgroundStyle}>
      {status === "success" ? (
        <>
          <h2>Gallery</h2>
          <div className="gallery">
              {data &&
                data?.map((gallery) => (
              <div key={gallery.id} className="gallery">
                <h3>{gallery.name}</h3>
                <Link to={`/gallery/${gallery._id}`}>
                <img src={gallery.image.url} alt={gallery.name} />
                </Link>
                <div className="details">
                  <span>{gallery.content}</span>
                  <span className="createdAt">${gallery.createdAt}</span>
                </div>
                <button> Love </button>
                <button> Like </button>
                <button> Share </button>
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

export default ForGallery;

