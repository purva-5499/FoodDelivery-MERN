import React from 'react'
import burgerImage from '../Images/burger.jpg'
import momosImage from '../Images/momos.jpg'
import pizzaImage from '../Images/pizza.jpg'

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{height:"450px"}}>
                <div className="carousel-inner" id='carousel' style={{ width: "100%", height: "500px", display: "flex"}}>
                    <div className="carousel-caption" style={{zIndex:"10"}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src={burgerImage} className="d-block w-100" alt="..." style={{filter:"brightness(40%)", objectFit: "contain !important", height: "100%"}}></img>
                    </div>
                    <div className="carousel-item">
                        <img src={momosImage} className="d-block w-100" alt="..." style={{filter:"brightness(90%)", objectFit: "contain !important", height: "100%"}}></img>
                    </div>
                    <div className="carousel-item">
                        <img src={pizzaImage} className="d-block w-100" alt="..." style={{filter:"brightness(90%)", objectFit: "contain !important", height: "100%"}}></img>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
