import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Card from "../components/Card";
export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("https://go-food-12.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log(response[0], response[1]);
    setfoodItem(response[0]);
    setfoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ backgroundColor: "black" }}>
      <div style={{zIndex:1}}>
        <Navbar />
      </div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                style={{ backgroundColor: "white" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="http://live.staticflickr.com/7911/47462192331_0af7693a88_b.jpg"
              className="d-block w-100 carousel-img"
              style={{ filter: "brightness(80%)", objectFit: "cover"}}
              alt="..."
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/184946701/photo/pizza.jpg?s=612x612&w=0&k=20&c=97rc0VIi-s3mn4xe4xDy9S-XJ_Ohbn92XaEMaiID_eY="
              className="d-block w-100 carousel-img"
              style={{ filter: "brightness(80%)", objectFit: "cover"}}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://live.staticflickr.com/4745/38718537835_584882a2ed_h.jpg"
              className="d-block w-100 carousel-img"
              style={{ filter: "brightness(80%)", objectFit: "cover"}}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container ">
        {
          <div className="m-3">
            {foodCat.length > 0 ? (
              foodCat.map((data) => (
                <div key={data._id} className="row mb-3">
                  <div className="fs-3 m-3">{data.CategoryName}</div>
                  <hr />
                  {foodItem.length > 0 ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filterItems) => (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      ))
                  ) : (
                    <div>No data available</div>
                  )}
                </div>
              ))
            ) : (
              <div>No data available</div>
            )}
          </div>
        }
      </div>
      <div>
        <Footer />
      </div>
      <style jsx>{`
        .carousel-img {
          filter: brightness(80%);
          object-fit: cover;
        }

        .carousel-item {
          height: 500px; /* Default height for larger screens */
        }

        @media (max-width: 767px) {
          .carousel-item {
            height: 220px; /* Height for smaller screens */
          }
        }
      `}</style>
    </div>
  );
}
