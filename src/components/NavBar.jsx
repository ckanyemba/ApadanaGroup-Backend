import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";

const NavBar = () => {
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
      <img
          src="https://res.cloudinary.com/dyhkqsixw/image/upload/v1700748700/black_logo_alone_cclvex.png"
          alt="Logo"
          style={{ height: "70px", width: "70px", border: "12px solid #130808"  }} // Adjust the height and width as needed
        />
        <h2>ApadanaGroup</h2>
        </div>
      <Link to="/">
        <h2>Shop</h2>
      </Link>
      <Link to="/forgallery">
        <h2>Gallery</h2>
      </Link>
      <Link to="/forarticles">
        <h2>Articles</h2>
      </Link>
      <Link to="/posters">
        <h2>Events</h2>
      </Link>
      <Link to="/about">
        <h2>About</h2>
      </Link>
      <Link to="/contact">
        <h2>Contact</h2>
      </Link>
      
      {auth._id ? (
        <Links>
        {auth.isAdmin ? (
            <div>
              <Link to="/admin/summary">Admin</Link>
            </div>
        ) : null}
          <div
            onClick={() => {
              dispatch(logoutUser(null));
              toast.warning("Logged out!", { position: "bottom-left" });
            }}
          >
            Logout
          </div>
        </Links>
      ) : (
        <AuthLinks>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </AuthLinks>
      )}
      <Link to="/cart">
        <div className="nav-bag">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-handbag-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0  1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
          </svg>
          <span className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>
    </nav>
    
  );
};

export default NavBar;

const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;

const Links = styled.div`
  color: white;
  display: flex;

  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
    }
  }
`;