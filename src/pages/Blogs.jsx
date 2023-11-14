
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Paginations from "../components/Paginations/paginations";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);
  const [editId, setEditId] = useState(-1);
  const [formData, setFormData] = useState({
    strMeal: "",
    strMealThumb: "",
    idMeal: "",
    status: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const mealsUrl = "http://localhost:3000/meals";

  const fetchApi = async () => {
    const response = await axios.get(mealsUrl);
    setBlogs(response.data);
  };

  useEffect(() => {
    fetchApi();
  }, [blogs]);

  const handleDelete = (id) => {
    const url = mealsUrl + "/" + id;
    axios
      .delete(url)
      .then(() => {
        const data = blogs.filter((blog) => blog.id !== id);
        setBlogs(data);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    setEditId(id);
    const data = blogs.find((blog) => blog.id === id);
    setFormData({
      strMeal: data.strMeal,
      strMealThumb: data.strMealThumb,
      id: data.id,
      status: data.status,
    });
  };


  const handleUpdate = () => {
    const url = mealsUrl + "/" + editId;
    axios
      .put(url, {
        id: editId,
        strMeal: formData.strMeal,
        strMealThumb: formData.strMealThumb,
        status: formData.status,
      })
      .then((res) => {
        console.log(res);
        setEditId(-1);
      })
      .catch((err) => console.log(err));
  };

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = blogs.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-3 mt-5 justify-center gap-5 p-10 text-center">
        {currentPosts.map((blog) => (
          <div
            key={blog.id}
            className="card border border-width-3px p-5 bg-cyan-400"
          >
            <div className="img">
              <img src={blog.strMealThumb} alt="" />
            </div>
            <div className="title mt-4 mb-4">
              <div>{blog.strMeal}</div>
            </div>
            <div className="flex justify-center gap-2  flex-col">
              <Link
                to={`/blogs/${blog.id}`}
                className="px-5 py-2 text-white  bg-cyan-800"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Paginations
        totalPosts={blogs.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <div className="container mx-auto">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  strMeal
                </th>
                <th scope="col" className="px-6 py-3">
                  strMealThumb
                </th>
                <th scope="col" className="px-6 py-3">
                  idMeal
                </th>
                <th scope="col" className="px-6 py-3">
                  CRUD action
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                blog.id === editId ? (
                  <tr key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <input
                        className="w-full"
                        type="text"
                        name="strMeal"
                        value={formData.strMeal}
                        onChange={handleChange}
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <input
                        className="w-full"
                        type="text"
                        name="strMealThumb"
                        value={formData.strMealThumb}
                        onChange={handleChange}
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {formData.id}
                    </td>
                    <td className=" flex gap-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {/* <button onClick={handleUpdate}>Güncelle</button> */}
                      <button
                       onClick={handleUpdate}
                        className="px-3 py-2 bg-yellow-500 text-white"
                      >
                        Update
                      </button>
                      <Link
                        to={`/blogs/${blog.id}`}
                        className="px-3 py-2 bg-green-500 text-white"
                      >
                        Show
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="px-3 py-2 bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {blog.strMeal}
                    </th>
                    <td className="px-6 py-4">{blog.strMealThumb}</td>
                    <td className="px-6 py-4">{blog.id}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(blog.id)}
                        className="px-3 py-2 bg-yellow-500 text-white"
                      >
                        Edit
                      </button>
                      <Link
                        to={`/blogs/${blog.id}`}
                        className="px-3 py-2 bg-green-500 text-white"
                      >
                        Show
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="px-3 py-2 bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
