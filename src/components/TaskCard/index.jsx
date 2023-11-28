import React from "react";
import { Card, CardContent, CardHeader, Divider, Box } from "@mui/material";
import Tile from "../Tile";

const TaskCard = ({
  theme,
  headerTitle,
  tasks,
  handleDelete,
  isCompleted = false,
  completeTask,
  getEditData,
}) => {
  return (
    <Card
      sx={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        width: "90%",
        marginBottom: "10px",
      }}>
      <CardHeader
        title={headerTitle}
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      />
      <Divider />
      <CardContent>
        <Box sx={{ py: 1 }}>
          {tasks.length === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20px",
                color: theme.palette.text.secondary,
              }}>
              <p>No tasks found</p>
            </Box>
          )}
          {tasks.map((task) => (
            <Tile
              key={task._id}
              task={task}
              theme={theme}
              isCompleted={isCompleted}
              completeTask={completeTask}
              handleDelete={handleDelete}
              getEditData={getEditData}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
