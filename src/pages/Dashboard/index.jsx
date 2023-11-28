import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import TaskCard from "../../components/TaskCard";
import { Box, Button, CircularProgress, Tab, Tabs } from "@mui/material";
import TaskModal from "../../components/TaskModal";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BASE_URL || "https://task-tracker-backend-zzyu.onrender.com";

const Dashboard = ({ theme }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { jwtToken } = useSelector((state) => state.auth.user);
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTask, setEditTask] = useState({});

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async (isDone = false) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${baseUrl}/task/filter`,
        { isDone },
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const highPriorityTasks = tasks.filter((task) => task.priority === "HIGH");
  const mediumPriorityTasks = tasks.filter((task) => task.priority === "MEDIUM");
  const lowPriorityTasks = tasks.filter((task) => task.priority === "LOW");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    getTasks(newValue === 1 ? true : false);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${baseUrl}/task/${id}`, {
        headers: {
          Authorization: jwtToken,
        },
      });
      toast.success("Task Deleted Successfully");
      getTasks();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeTask = async (id, title) => {
    try {
      await axios.put(
        `${baseUrl}/task/${id}`,
        { title, isDone: true },
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      toast.success("Task Completed Successfully");
      getTasks();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getEditData = (task) => {
    setIsEdit(true);
    setEditTask(task);
    setOpenModal(true);
  };

  const handleCreateTask = async (task) => {
    try {
      await axios.post(`${baseUrl}/task`, task, {
        headers: {
          Authorization: jwtToken,
        },
      });
      getTasks();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setIsEdit(false);
    setEditTask({});
    setOpenModal(false);
  };

  const handleUpdateTask = async (id, task) => {
    try {
      await axios.put(`${baseUrl}/task/${id}`, task, {
        headers: {
          Authorization: jwtToken,
        },
      });
      toast.success("Task Updated Successfully");
      getTasks();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <TaskModal
          theme={theme}
        open={openModal}
        handleClose={handleCloseModal}
        isEdit={isEdit}
        editTaskData={editTask}
        onSubmit={handleCreateTask}
        onUpdate={handleUpdateTask}
      />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          flexDirection: "column",
        }}>
        {loading ? (
          <div style={{ height: "100vh", marginTop: "300px" }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              style={{
                marginBottom: "10px",
              }}>
              <Tab label="Ongoing" />
              <Tab label="Completed" />
            </Tabs>
            {tabValue === 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    width: "90%",
                    justifyContent: "end",
                    marginRight: "24px",
                    marginBottom: "10px",
                  }}>
                  <Button variant="contained" onClick={() => setOpenModal(true)}>
                    Create Task
                  </Button>
                </div>
                <TaskCard
                  theme={theme}
                  headerTitle={"High Priority Tasks"}
                  tasks={highPriorityTasks}
                  handleDelete={deleteTask}
                  getEditData={getEditData}
                  completeTask={completeTask}
                />
                <TaskCard
                  theme={theme}
                  headerTitle={"Medium Priority Tasks"}
                  tasks={mediumPriorityTasks}
                  handleDelete={deleteTask}
                  getEditData={getEditData}
                  completeTask={completeTask}
                />
                <TaskCard
                  theme={theme}
                  headerTitle={"Low Priority Tasks"}
                  tasks={lowPriorityTasks}
                  getEditData={getEditData}
                  handleDelete={deleteTask}
                  completeTask={completeTask}
                />
              </>
            ) : (
              <TaskCard
                theme={theme}
                headerTitle={"Completed Tasks"}
                tasks={tasks}
                isCompleted={true}
              />
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
