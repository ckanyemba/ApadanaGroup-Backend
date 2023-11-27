import { useState, useEffect } from "react";
import { setHeaders, url } from "../../features/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Event = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(
          `${url}/events/find/${params.id}`,
          setHeaders()
        );

        setEvent(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  const handleAddToCart = (event) => {
    dispatch(addToCart(event));

    navigate("/cart");
  };

  return (
    <StyledEvent>
      <EventContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ImageContainer>
              <img src={event.image?.url} alt="event" />
            </ImageContainer>
            <EventDetails>
            <h3>{event.name}</h3>
            <p>
              <span>Type:</span>
              {event.type}
            </p>
            <p>
              <span>Description:</span>
              {event.desc}
            </p>
            <p>
              <span>Content:</span>
              {event.content}
            </p>
            <Price>
              ${event.prize?.toLocaleString()}
            </Price>
            <button
              className="event-add-to-cart"
              onClick={() => handleAddToCart()}
            >
              Add To Cart
            </button>
            </EventDetails>
          </>
        )}
      </EventContainer>
    </StyledEvent>
  );
};

export default Event;

const StyledEvent = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const EventContainer = styled.div`
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

const EventDetails = styled.div`
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
