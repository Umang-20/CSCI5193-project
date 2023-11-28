import React from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

const Tile = ({ task, theme, isCompleted, handleDelete, completeTask, getEditData }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2, backgroundColor: theme.palette.background.default }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ flex: 1, color: theme.palette.text.primary, textAlign: "start" }}>
          {task?.title}
        </Typography>
        {!isCompleted && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton color="inherit">
              <EditIcon onClick={() => getEditData(task)} />
            </IconButton>
            <IconButton color="inherit">
              <DoneIcon onClick={() => completeTask(task._id, task.title)} />
            </IconButton>
            <IconButton color="inherit">
              <DeleteIcon onClick={() => handleDelete(task._id)} />
            </IconButton>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Tile;
