import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateBlog = () => {
  const mealsUrl = "http://localhost:3000/meals"
  const navigateTo = useNavigate()

  const [formData, setFormData] = useState({
    strMeal: "",
    idMeal: "",
    status: false,
  });

  const handleChange = (e) => {
    const data = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(mealsUrl, {
        strMeal: formData.title,
        idMeal: formData.description,
        status: formData.status,
        
      });
      navigateTo("/blogs");
    } catch (error) {
      console.error("xeta:", error);
    }
  };

  return (
    <div>
      <Header />

      <main>
       <div className="container mx-auto">
       <form>
          <div>
            <label htmlFor="title">Title</label>
            <input  onChange={(e) => handleChange(e)} type="text" name="title" className="block border border-black p-2"  />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea onChange={(e) => handleChange(e)} name="description" id="" cols="30" rows="10" className="block border border-black p-2"></textarea>
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select  onChange={(e) => handleChange(e)} name="status" className="block border border-black p-1">
              <option value={false} >False</option>
              <option value={true} >True</option>
            </select>
          </div>
        <button onClick={handleSubmit} className="px-5 py-2 bg-indigo-500 text-white mt-4">Submit</button>
        </form>
       </div>
      </main>
    </div>
  );
};

export default CreateBlog;
