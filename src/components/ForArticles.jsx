import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ForArticles = () => {
  const { items: data, status } = useSelector((state) => state.galleries);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (article) => {
      dispatch(addToCart(article));
      navigate("/cart");
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh" // Make sure the content covers the full viewport height
  };

  return (
    <div className="article-container" style={backgroundStyle}>
      {status === "success" ? (
        <>
          <h2>Articles</h2>
          <div className="articles">
            {data &&
              data?.map((article) => (
                <div key={article.id} className="article">
                  <h3>{article.name}</h3>
                  <Link to={`/article/${article._id}`}>
                  <img src={article.image.url} alt={article.name} />
                  </Link>
                  <div className="details">
                    <span>{article.content}</span>
                    <span className="createdAt">${article.createdAt}</span>
                  </div>
                 
                  <button> Read More ...</button>
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

export default ForArticles;
