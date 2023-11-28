import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const TaskModal = ({ open, handleClose, onSubmit, isEdit = false, editTaskData, onUpdate }) => {
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    priority: "LOW",
  });

  useEffect(() => {
    if (isEdit) {
      setTaskDetails({
        title: editTaskData.title,
        description: editTaskData.description,
        priority: editTaskData.priority,
      });
    }
  }, [isEdit, editTaskData]);

  const handleChange = (event) => {
    setTaskDetails({ ...taskDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    if (isEdit) {
      onUpdate(editTaskData._id, taskDetails);
    } else {
      onSubmit(taskDetails);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
          minWidth: "300px",
        }}>
        <Typography variant="h5" gutterBottom>
          Create Task
        </Typography>
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={taskDetails.title}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={taskDetails.description}
          onChange={handleChange}
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select
            value={taskDetails.priority}
            name="priority"
            onChange={handleChange}
            label="Priority">
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ textAlign: "right", mt: 2 }}>
          <Button variant="outlined" onClick={handleClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={taskDetails.title.trim() === "" || taskDetails.description.trim() === ""}
            onClick={handleSubmit}
            color="primary">
            {isEdit ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
