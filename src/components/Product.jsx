import React from "react";
import { Link } from "react-router-dom";

export default function Product(props) {
  const newStyle = {
    card: {
      borderBolor: "transparent",
      transition: "all 1s linear",
      maxWidth: 200,
      height: 300
    },
    cardFooter: {
      background: "transparent",
      borderTop: "transparent",
      transition: "all 1s linear"
    },
    imgContainer: {
      position: "transparent",
      overflow: "hidden"
    },
    cardImgTop: {
      transition: "all 1s linear",
      width: 200,
      height: 200
    },
    cartButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      padding: "0.2rem 0.4rem",
      background: "var(--mainAmber)",
      border: "none",
      color: "var(--mainWhite)",
      fontSize: "1.2rem",
      borderRadius: "0.5rem 0 0 0",

      transition: "all 1s linear"
    }
  };

  const { _id, image, title, price } = props.item;
  const { getProductDetails } = props;

  return (
    <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card" style={newStyle.card}>
        <div style={newStyle.imgContainer}>
          <Link to="/details">
            <img src={image} alt={title} style={newStyle.cardImgTop} onClick={() => getProductDetails(_id)}/>
          </Link>
          
          <div className='card-footer d-flex justify-content-between' style={newStyle.cardFooter}>
            <p className='align-self-center mb-0'>
              {title}
            </p>
            <h5 className='text-blue font-italic mb-0'>
              <span className='mr-1'>лв.</span>
              {price}
            </h5>
            <button
              style={newStyle.cartButton}
            >
              <i className="fas fa-cart-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
