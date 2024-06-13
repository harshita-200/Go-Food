import React, { useState, useEffect, useRef } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceref = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  const handleonClick = async () => {
    let food = '';
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== '') {
      if (food.size === size) {
        await dispatch({ type: 'UPDATE', id: props.foodItem._id, price: finalPrice, qty: qty });
      } else if (food.size !== size) await dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, img: props.foodItem.img, qty: qty, size: size });
    } else await dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, img: props.img, qty: qty, size: size });
  };
  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceref.current.value);
  }, []);

  return (
    <div>
      <div
        className="card mt-3"
        style={{ "width": '18rem', boxShadow: '2px 2px 6px #b26f6f',backgroundColor:'black'}}
      >
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: '140px', objectFit: 'fill' }} />
        <div className="card-body" style={{ overflowY: 'auto' }}>
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.description}</p>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-success rounded" ref={priceref} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>;
              })}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button className="btn btn-success justify-center ms-2" onClick={handleonClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
