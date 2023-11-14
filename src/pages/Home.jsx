import React from "react";
import Header from "../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(3);

  const showMoreMeals =  () =>{
    setVisible((prev) => prev + 3);
  }
  
  const mealsUrl = "http://localhost:3000/meals";

  const fetchApi = async () => {
    const response = await axios.get(mealsUrl);
    setItems(response.data);
  };

  useEffect(() => {
    fetchApi();
  }, []);


  return (
    <div>
      <Header />
      <div className="grid grid-cols-3 mt-5 justify-center gap-5 p-10 text-center	">
        {items.slice(0,visible).map((item) => (
          <div
            key={item.idMeal}
            className="card border border-width-3px p-5 bg-cyan-400	"
          >
            <div className="img">
              <img src={item.strMealThumb} alt="" />
            </div>
            <div className="title mt-4 mb-4">
              <div>{item.strMeal}</div>
            </div>
            <div>
            <button className="px-5 py-2 text-white  bg-cyan-800">Read More</button>
          </div>
          </div>
         
        ))}
      </div>
      <div className="text-center mb-5">
  <button onClick={showMoreMeals} className="px-5 py-2 text-white bg-cyan-800 mx-auto">Click Show More</button>
</div>
    </div>
  );
};

export default Home;


