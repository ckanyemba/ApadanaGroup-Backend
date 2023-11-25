import { useState, useEffect } from "react";
import { setHeaders, url } from "../../features/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Gallery = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gallery, setGallery] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(
          `${url}/galleries/find/${params.id}`,
          setHeaders()
        );

        setGallery(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  const handleAddToCart = (gallery) => {
    dispatch(addToCart(gallery));

    navigate("/cart");
  };

  return (
    <StyledGallery>
      <GalleryContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ImageContainer>
              <img src={gallery.image?.url} alt="gallery" />
            </ImageContainer>
            <h3>{gallery.name}</h3>
            <p>
              <span>Type:</span>
              {gallery.type}
            </p>
            <p>
              <span>Description:</span>
              {gallery.desc}
            </p>
            <p>
              <span>Content:</span>
              {gallery.content}
            </p>
            <Price>
              ${gallery.prize?.toLocaleString()}
            </Price>
            <button
              className="gallery-add-to-cart"
              onClick={() => handleAddToCart()}
            >
              Add To Cart
            </button>
          </>
        )}
      </GalleryContainer>
    </StyledGallery>
  );
};

export default Gallery;

const StyledGallery = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const GalleryContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
  }
`;

const GalleryDetails = styled.div`
  flex: 2;
  margin-left: 2rem;
  h3 {
    font-size: 35px;
  }
  p span {
    font-weight: bold;
  }
`;

const Price = styled.div`
  margin: 1rem 0;
  font-size: 25px;
`;
