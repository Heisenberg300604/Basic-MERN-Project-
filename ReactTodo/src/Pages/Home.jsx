import React, { useContext, useEffect, useState } from 'react'
import TaskItem from '../Components/TaskItem'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from '../main';
import DeleteButton from '../Components/DeleteButton';

const Home = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async(id)=>{
    try {
      const {data} = await axios.put(`api/v1/task/${id}`,{},{
        withCredentials:true
      }) 
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const deletehandler = async(id)=>{
    try {
      const {data} = await axios.delete(`/api/v1/task/${id}`,{withCredentials: true,});
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const createTaskHandler =  async() => {
    try {
      const {data} =await axios.post("api/v1/task/new",
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      // console.log(title,description);
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setRefresh(prev => !prev);
    } catch (error) {
      toast.error(error);
    }
  }

  const getDataHandler = async()=>{
    try {
      const {data}= await axios.get("api/v1/task/mytasks",
        {
          withCredentials: true,
        }
      )
      setTasks(data.tasks);
      // console.log(tasks); // Added just for debugging
      
    } catch (error) {
      toast.error("Sorry ! Could not fetch users detail")
    }
  }

  useEffect(() => {
    getDataHandler()
  }, [refresh])
  

  return (
    <>
      <div className="border border-gray-600 p-10 rounded-md w-full max-w-lg mx-auto mt-10 flex flex-col items-center bg-white">
        <div className="mb-6 w-full max-w-xs">
          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            type="text"
            placeholder="Task Name"
            className="input input-bordered border-gray-500 w-full bg-white text-black px-3 py-2"
          />
        </div>
        <div className="w-full max-w-xs">
          <input
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
            type="text"
            placeholder="Description"
            className="input input-bordered border-gray-500 w-full bg-white text-black px-3 py-2"
          />
        </div>
        <button onClick={createTaskHandler} className="btn btn-outline w-3/4 btn-wide mt-6  bg-white text-black hover:bg-black hover:text-white">
          Create task
        </button>
      </div>
      {
        tasks.map((item)=>{
          return (<TaskItem id={item._id} key={item._id} title={item.title} description={item.description}
            updateHandler = {updateHandler} deletehandler={deletehandler} isCompleted ={item.isCompleted}
          />)
        })
      }
      
    </>
  )
}

export default Home
