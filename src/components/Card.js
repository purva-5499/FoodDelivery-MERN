import React, {useState, useRef, useEffect} from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch=useDispatchCart();
    let data = useCart();
    let options=props.options;
    let priceOptions=Object.keys(options);
    const [qty, setqty]=useState(1);
    const [size, setsize]=useState("");
    const handleAddToCart= async ()=>{
        let food=[]
        for(const item of data){
            if(item.id === props.foodItem._id){
                food=item;
                break;
            }
        }
        if(food !== []){
            if(food.size === size){
                await dispatch({type:"UPDATE", id:props.foodItem._id, price:finalPrice, qty:qty })
                return 
            }else{
                await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, price:finalPrice, qty:qty, size:size})
                return 
                //console.log(data);
            }
        }
        await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, price:finalPrice, qty:qty, size:size})
        //console.log(data);
        
    }
    const priceRef=useRef();
    let finalPrice=qty*parseInt(options[size]);
    useEffect(()=>{
        setsize(priceRef.current.value)
    }, [])

    return(
        <div>
            <div className='container-fluid'>
                <div className="card bg-secondary-70 mt-2" style={{ "width": "18rem", "maxHeigth": "360px", filter:"brightness(90%)" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:'200px', objectFit:'fill'}}></img>
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className='container' w-100>
                            <select className='m-2 h-100 bg-success text-white rounded' onChange={(e)=>setqty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}> {i + 1} </option>
                                    )
                                })}
                            </select>

                            <select className='m-2 h-100 bg-success text-white rounded' ref={priceRef} onChange={(e)=>setsize(e.target.value)}>
                               {priceOptions.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                               })}
                            </select>

                            <div className='d-inline h-100'>₹{finalPrice}/-</div>
                            <hr></hr>
                            <div>
                            <button className={`btn btn-success justify-content-center`} onClick={handleAddToCart}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}