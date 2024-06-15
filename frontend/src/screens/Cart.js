import React from 'react'
//import Delete from '@material-ui/icons/Delete'
import { FaTrashAlt } from "react-icons/fa";
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>Your Cart is Empty!!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async (e) => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("https://go-food-4.onrender.com/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
     console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
    const resp = await fetch("https://go-food-4.onrender.com/order", {
      method: "POST",
      body: JSON.stringify({
        amount:500,
        currency:"INR",
        receipt: "receiptId",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await resp.json();
    console.log(order);
    var options = {
      key: "rzp_test_DTCs5mydIhBI8p", // Enter the Key ID generated from the Dashboard
      amount:500, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency:"INR",
      name: "BiteExpress", //your business name
      description: "Test Transaction",
      image: "",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "https://go-food-4.onrender.com/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
       <div className="container justify-content-center"><h2>My Cart</h2></div>
      {console.log(data)}
      <div className='container m-auto table-responsive  table-responsive-sm table-responsive-md' >

      <div className="row" >
  {data.map((food, index) => (
    <div key={index} className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">

          <h5 className="card-title">{food.name}</h5>
          <img
                                      src={food.img}
                                      className="card-img-top"
                                      alt="..."
                                      style={{
                                        height: "120px",
                                        objectFit: "fill",
                                      }}
                                    />
          <p className="card-text">Quantity: {food.qty}</p>
          <p className="card-text">Option: {food.size}</p>
          <p className="card-text">Amount: ₹{food.price}/-</p>
          <button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}><FaTrashAlt /></button>
        </div>
      </div>
    </div>
  ))}
</div>

        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}