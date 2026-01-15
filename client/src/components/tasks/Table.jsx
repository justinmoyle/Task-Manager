import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { toast } from "sonner";
import { formatDate, PRIOTITYSTYLES, TASK_TYPE, BGS } from "../../utils";
import clsx from "clsx";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "../UserInfo";
import Button from "../Button";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TableHeader = () => (
  <thead className="w-full border-b border-gray-600">
    <tr className="w-full text-black text-left">
      <th className="py-2">Task Title</th>
      <th className="py-2">Priority</th>
      <th className="py-2 line-clamp-1">Created At</th>
      <th className="py-2">Assets</th>
      <th className="py-2">Teams</th>
      <th className="py-2">Actions</th>
    </tr>
  </thead>
);

const TableRow = ({ task }) => (
  <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
    <td className="py-2">
      <div className="flex items-center gap-2">
        <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
        <p className="w-full line-clamp-2 text-base text-black">
          {task?.title}
        </p>
      </div>
    </td>

    <td className="py-2">
      <div className="flex gap-1 items-center">
        <span className={clsx("text-lg", PRIOTITYSTYLES[task?.priority])}>
          {ICONS[task?.priority]}
        </span>
        <span className="capitalize line-clamp-1">
          {task?.priority} Priority
        </span>
      </div>
    </td>

    <td className="py-2">
      <span className="text-sm text-gray-600">
        {formatDate(new Date(task?.date))}
      </span>
    </td>

    <td className="py-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <BiMessageAltDetail />
          <span>{task?.activities?.length}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MdAttachFile />
          <span>{task?.assets?.length}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <FaList />
          <span>{task?.subTasks?.length}</span>
        </div>
      </div>
    </td>

    <td className="py-2">
      <div className="flex">
        {task?.team?.map((m, index) => (
          <div
            key={m._id}
            className={clsx(
              "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
              BGS[index % BGS?.length]
            )}
          >
            <UserInfo user={m} />
          </div>
        ))}
      </div>
    </td>

    <td className="py-2 flex gap-2 md:gap-4 justify-start">
      <Button
        className="text-blue-600 hover:text-blue-500 sm:px-0
        text-sm md:text-base"
        type="button"
        label="Edit"
      />
      <Button
        className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base"
        type="button"
        label="Delete"
        onClick={() => deleteClicks(task._id)}
      />
    </td>
  </tr>
);

const deleteClicks = () => {};

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="bg-white px-2 md:px-4 pb-9 shadow-md rounded">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <ConfirmationDialog
      open={openDialog}
      setOpen={setOpenDialog}
      onClick={deletHandler}
      /> */}
    </>
  );
};

export default Table;
