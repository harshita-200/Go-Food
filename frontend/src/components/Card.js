import React, { useState, useEffect, useRef } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceref = useRef();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleonClick = async () => {
    let food = '';
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    let finalPrice = qty * parseInt(options[size]);

    if (food !== '') {
      if (food.size === size) {
        await dispatch({ type: 'UPDATE', id: props.foodItem._id, price: finalPrice, qty: qty });
      } else {
        await dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, img: props.foodItem.img, qty: qty, size: size });
      }
    } else {
      await dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, img: props.foodItem.img, qty: qty, size: size });
    }

    // Set success message
    setSuccessMessage(`${props.foodItem.name} added to cart!`);

    // Clear success message after 3 seconds (optional)
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  useEffect(() => {
    setSize(priceref.current.value);
  }, []);
  let finalPrice = qty * parseInt(options[size]); 
  return (
    <div>
      <div className="card mt-3" style={{ width: '18rem', boxShadow: '2px 2px 6px #b26f6f', backgroundColor: 'black' }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: '140px', objectFit: 'fill' }} />
        <div className="card-body" style={{ overflowY: 'auto' }}>
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.description}</p>
          <div className="container w-100">
            <select className="m-2 h-100 bg-danger rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-danger rounded" ref={priceref} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>;
              })}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button className="btn btn-danger justify-center ms-2" onClick={handleonClick}>Add to Cart</button>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
}
