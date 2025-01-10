import { useNavigate } from "react-router-dom";
import "./Card.css";

export default function cards({ title,  image, price, dispr,id }) {
  const navigate = useNavigate();
  const handleId = () => {
    window.scrollTo(0,0)
    navigate(`/Course/${id}`);
  };
  return (
    <>
      <div className="card">
        <div className="ribbon-sale-card">Trending</div>
        <img className="image-i" src={image} alt="course1" />
        <p className="page3-card-para">{title}</p>
        <em>
          <div className="description">Unlock Your Potential</div>
        </em>
        <em>
          <p className="disc-price-card">&#8377; {price}</p>
        </em>
        <p className="price-card">&#8377; {dispr}</p>
        <button className="page3-card-btn">
          <p className="page3-btn-para" onClick={handleId}>View Course</p>
        </button>
      </div>
    </>
  );
}
