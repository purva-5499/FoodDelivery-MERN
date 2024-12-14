import React,{useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import burgerImage from '../Images/burger.jpg'
import momosImage from '../Images/momos.jpg'
import pizzaImage from '../Images/pizza.jpg'


export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async()=>{
        let response = await fetch("http://localhost:5000/api/foodData", {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            }
        });
        response=await response.json();
       setfoodItem(response[0]);
       setfoodCat(response[1]);
    }

    useEffect(()=>{
        loadData()
    },[])



    return (
        <div>
            <div><Navbar /></div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{height:"450px"}}>
                            <div className="carousel-inner" id='carousel' style={{ width: "100%", height: "500px", display: "flex"}}>
                                <div className="carousel-caption" style={{zIndex:"10"}}>
                                    <div className="d-flex justify-content-center">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}></input>
                                        <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                                    </div>
                                </div>
                                <div className="carousel-item active">
                                    <img src={burgerImage} className="d-block w-100" alt="..." style={{filter:"brightness(60%)", objectFit: "contain !important", height: "100%"}}></img>
                                </div>
                                <div className="carousel-item">
                                    <img src={momosImage} className="d-block w-100" alt="..." style={{filter:"brightness(60%)", objectFit: "contain !important", height: "100%"}}></img>
                                </div>
                                <div className="carousel-item">
                                    <img src={pizzaImage} className="d-block w-100" alt="..." style={{filter:"brightness(60%)", objectFit: "contain !important", height: "100%"}}></img>
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
                        </div></div>
            <div className='container'>
                {
                    foodCat !== []
                    ?foodCat.map((data)=>{
                        return (
                            <div className='row mb-3'>
                                <div key={data._id} className='fs-5 m-3'>{data.CategoryName}
                                </div>
                                <hr />
                                {
                                    foodItem !== []
                                    ?foodItem.filter((item)=>(item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItem=>{
                                        return(
                                            <div key={filterItem._id} className='col-12 col-lg-3 col-md-6 m-3 '>
                                                <Card foodItem = {filterItem}
                                                options = {filterItem.options[0]}>
                                                </Card>
                                            </div>
                                        )
                                    })
                                    : <div>No such data found</div>
                                }
                            </div>
                        )
                    })
                    : ""
                }
                
            </div>
            <div><Footer /></div>
        </div>
    )
}
