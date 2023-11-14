import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Blog = () => {
  const [blog, setBlog] = useState();
  const { id } = useParams();
  const mealsUrl = `http://localhost:3000/meals/${id}`;

  const fetchData = async () => {
    const response = await axios.get(mealsUrl);
    setBlog(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <div className="inline-block  p-5  bg-cyan-500 ">
    <div>
        <img src={blog?.strMealThumb}alt="" className="w-72" />
    </div>
    <h1>{blog?.strMeal}</h1>
  </div>;
};

export default Blog;
