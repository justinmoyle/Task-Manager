import React from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardPen } from "react-icons/lu";
import { FaNewspaper, FaSimCard, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import clsx from "clsx";
import Chart from "../components/Chart";
import { TASK_TYPE, BGS, PRIOTITYSTYLES, getInitials } from "../utils/index";
import { summary } from "../assets/data";
import UserInfo from "../components/UserInfo";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskTableHeader = () => (
  <thead className="border-b border-gray-300 ">
    <tr className="text-black text-left">
      <th className="py-2">Task Title</th>
      <th className="py-2">Priority</th>
      <th className="py-2">Team</th>
      <th className="py-2 hidden md:block">Date Created</th>
    </tr>
  </thead>
);

const TaskTableRow = ({ task }) => (
  <tr className="border-gray-300 border-b text-gray-600 hover:bg-gray-300/10">
    <td className="p-2 ">
      <div className="flex items-center gap-2">
        <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
        <p className="text-base text-black">{task.title}</p>
      </div>
    </td>

    <td className="p-2 ">
      <div className="flex items-center gap-1">
        <span
          className={clsx(
            "w-4 text-lg h-4 rounded-full",
            PRIOTITYSTYLES[task.priority]
          )}
        >
          {ICONS[task.priority]}
        </span>
        <span className="text-sm text-black">{task.priority}</span>
      </div>
    </td>

    <td className="p-2">
      <div className="flex">
        {task.team?.map((m, index) => (
          <div
            key={index}
            className={clsx(
              "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm mr-1 cursor-pointer",
              BGS[index % BGS.length]
            )}
          >
            <UserInfo user={m} />
          </div>
        ))}
      </div>
    </td>

    <td className="p-2 hidden md:block">
      <span className="text-base text-gray-600">
        {moment(task?.date).fromNow()}
      </span>
    </td>
  </tr>
);

const TaskTable = ({ tasks }) => {
  return (
    <>
      <div
        className="w-full md:2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md
    rounded"
      >
        <table className="w-full">
          <TaskTableHeader />
          <tbody>
            {tasks?.map((task, id) => (
              <TaskTableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const UserTableHeader = () => (
  <thead className="border-b border-gray-300 ">
    <tr className="text-black text-left">
      <th className="pr-2 pt-2  text-sm">Full Name</th>
      <th className="pr-2 pt-2  text-sm">Status</th>
      <th className="pr-2 pt-2 text-center text-sm">Date Created</th>
    </tr>
  </thead>
);

const UserTableRow = ({ user }) => (
  <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
    <td className="py-2">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full text-white flex items-center justify-center
          text-sm bg-violet-700"
        >
          <span className="text-center">{getInitials(user?.name)}</span>
        </div>

        <div>
          <p className="text-sm">{user.name}</p>
          <span className="text-xs text-black">{user?.role}</span>
        </div>
      </div>
    </td>

    <td>
      <p
        className={clsx(
          "w-fit px-3 py-1 rounded-full text-sm",
          user?.isActive ? "bg-green-200" : "bg-yellow-100"
        )}
      >
        {user?.isActive ? "Active" : "Away"}
      </p>
    </td>

    <td className="py-2 text-sm text-center">
      {moment(user?.createdAt).fromNow()}
    </td>
  </tr>
);
const UserTable = ({ users }) => {
  return (
    <div className="w-full md:1/3 bg-white h-fit px-2 md:px-6 shadow-md rounded">
      <table className="w-full mb-5">
        <UserTableHeader />
        <tbody>
          {users?.map((user, index) => (
            <UserTableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  const totals = summary.tasks;

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardPen />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div
        className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center
      justify-between"
      >
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-base text-gray-600">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
          <span className="text-sm text-gray-400">{"100 last month"}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map((item, index) => (
          <Card
            key={index}
            icon={item.icon}
            bg={item.bg}
            label={item.label}
            count={item.total}
          />
        ))}
      </div>
      <div className="bg-white w-full my-16 p-4 rounded shadow-sm">
        <h4 className="text-gray-600 font-semibold text-xl">
          Chart by Priority
        </h4>
        <Chart />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        {/* left */}
        <div className="w-2/3">
          <TaskTable tasks={summary.last10Task} />
        </div>
        {/* right */}
        <div className="w-1/3">
          <UserTable users={summary.users} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
