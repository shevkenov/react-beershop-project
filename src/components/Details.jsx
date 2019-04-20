import React from "react";
import {Link} from 'react-router-dom';

export default function Details(props) {
  const img = {
    width: 130,
    height: 200
  };

  const btn = {
    fontSize: '1.2rem',
    background: "transparent",
    border: "0.05rem solid var(--mainAmber)",
    borderColor: "var(--mainAmber)",
    color: "var(--mainAmber)",
    borderRadius: "0.5rem",
    padding: "0.2rem 0.5rem",
    cursor: "pointer",
    margin: "0.2rem 0.5rem 0.2rem 0",
    transition: "all 0.5s ease-in-out"
  };

  const { title, image, brand, price, description, style } = props.details;
  const {isAdmin} = props;
  return (
    <div className="container py-5">
      <div className="row">
        <div className="cal-10 max-auto text-center text-slanted text-blue my-5">
          <h2>{title}</h2>
        </div>
      </div>
      <div className="row">
        <div>
          <img src={image} alt={title} className="img-fluid" style={img} />
        </div>
        <div className="cal-10 max-auto col-md-6 my-3 text-capitalize">
          <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
            made by: <span className="text-uppercase">{brand}</span>
          </h4>
          <h4 className="text-blue">
            <strong>
              price: <span>$</span>
              {price}
            </strong>
          </h4>
          <h4 className="text-blue">
            <strong>style: {style}</strong>
          </h4>
          <p className="text-capitalize font-weight-bold mt-3 mb-0">
            some info about product:
          </p>
          <p className="text-muted lead">{description}</p>
          <div>
            <Link to="/">
              <button style={btn}>back to products</button>
            </Link>
           <button style={btn}>add to cart</button>
           {
               isAdmin ?
                <Link to="/edit">
                    <button style={btn}>Edit</button>
                </Link>
                :
                    null
           }
          </div>
        </div>
      </div>
    </div>
  );
}
