import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";

const TaskDialog = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen />,
    },
  ];

  return <div>TaskDialog</div>;
};

export default TaskDialog;
