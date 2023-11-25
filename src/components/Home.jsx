import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { addToCart } from "../features/cartSlice";
import { Link } from  "react-router-dom";


const backgroundImageUrl = 'https://images.unsplash.com/photo-1605478328994-f93e98217da7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const Home = () => {
    const { items: data, status } = useSelector((state) => state.products);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigate("/cart");
    };

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh', // Make sure the content covers the full viewport height
      };

    return (
        <div className="home-container" style={backgroundStyle}>
            {status === "success" ? (
                <>
                    <h2>New Arrivals</h2>
                    <div className="products">
                        {data &&
                            data?.map((product) => (
                                <div key={product._id} className="product">
                                    <h3>{product.name}</h3>
                                    <Link to={`/product/${product._id}`}>
                                    <img src={product.image.url} alt={product.name} />
                                    </Link>
                                  
                                    <div className="details">
                                        <span>{product.desc}</span>
                                        <span className="price">${product.price}</span>
                                    </div>
                                    <button onClick={() => handleAddToCart(product)}>
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

export default Home;