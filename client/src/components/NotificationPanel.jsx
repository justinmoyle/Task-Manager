import React, { Fragment, useState } from "react";
import moment from "moment";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { Transition } from "@headlessui/react";

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  //   const {data, refetch} = useGetNotificationsQuery();
  //   const [markAsRead] = useMarkNotiAsReadMutation();

  const ICONS = {
    alert: (
      <HiBellAlert className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
    ),
    message: (
      <BiSolidMessageRounded className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
    ),
  };

  const data = [
    {
      id: "1123",
      team: ["123123", "123123", "123123", "123123"],
      text: "New Task",
      task: null,
      notiType: "alert",
      isRead: [],
      createdAt: "2026-02-09T05:45:23.353Z",
      updatedAt: "2026-02-09T05:45:23.353Z",
    },
    {
      id: "1123",
      team: ["123123", "123123", "123123", "123123"],
      text: "New Task",
      task: null,
      notiType: "alert",
      isRead: [],
      createdAt: "2026-02-09T05:45:23.353Z",
      updatedAt: "2026-02-09T05:45:23.353Z",
    },
  ];

  const readHandler = () => {};
  const viewHandler = () => {};

  const callsToAction = [
    { name: "Cancel", href: "#", icon: "" },
    {
      name: "Mark All Read",
      href: "#",
      icon: "",
      onClick: () => readHandler("all", ""),
    },
  ];

  return (
    <>
      <Popover className="relative">
        <Popover.Button className="inline-flex items-center outline-none">
          <div className="w-8 h-8 flex items-center justify-center text-gray-800 relative">
            <IoIosNotificationsOutline className="text-3xl" />
            {data?.length > 0 && (
              <span className="absolute top-0 right-1 w-4 h-4 rounded-full bg-red-600">
                <div className="h-full w-full flex justify-center items-center text-sm text-white font-semibold">
                  {data?.length}
                </div>
              </span>
            )}
          </div>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel
            className="absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen
            max-w-max px-4"
          >
            {({ close }) =>
              data?.length > 0 && (
                <div
                  className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl 
                    bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5"
                >
                  <div className="p-4 cursor-pointer">
                    {data?.slice(0, 5).map((item, index) => (
                      <div
                        key={item._id + index}
                        className="group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div
                          className="mt-1 h-8 w-8 flex items-center justify-center 
                                    rounded-lg bg-gray-200 group-hover:bg-white"
                        >
                          {ICONS[item.notiType]}
                        </div>

                        <div
                          className="cursor-pointer"
                          onClick={() => viewHandler(item)}
                        >
                          <div
                            className="flex items-center gap-3 font-semibold text-gray-900
                                        capitalize"
                          >
                            <p>{item.notiType}</p>
                            <span className="text-xs font-normal lowercase">
                              {moment(item.createdAt).fromNow()}
                            </span>
                          </div>
                          <p className="line-clamp-1 mt-1 text-gray-600">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    {callsToAction.map((item) => (
                      <Link
                        key={item.name}
                        onClick={
                          item?.onClick ? () => item.onClick() : () => close()
                        }
                        className="flex items-center justify-center gap-x-2.5 p-3
                    font-semibold text-blue-600 hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default NotificationPanel;
