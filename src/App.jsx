import React, { useEffect, useReducer, useRef, useState } from "react";
import TasksReducer from "./TasksReducer";

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, dispatch] = useReducer(TasksReducer, [], () => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const dialougeRef = useRef();
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const addTaskHandler = () => {
    dispatch({
      type: "added",
      input,
    });

    setInput("");
    inputRef.current.focus();
  };
  const handleDeleteTask = (i, e) => {
    e.stopPropagation();
    dispatch({
      type: "deleted",
      i,
    });
  };
  const handleCompleteTask = (i) => {
    dispatch({
      type: "completed",
      id: i,
    });
  };
  const handleDeleteAll = () => {
    dialougeRef.current.close();
    dispatch({
      type: "deleteAll",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-900">
      <dialog
        style={{ transform: "translate(-50%, -50%)" }}
        ref={dialougeRef}
        className="p-4 absolute top-[35%] left-[50%] bg-white rounded-lg text-3xl font-bold"
      >
        Are you sure, you want to
        <br />
        delete all the tasks?
        <br />
        <div className="float-end mt-4 flex text-white/80 gap-1.5">
          <button
            onClick={() => dialougeRef.current.close()}
            className="bg-green-800 rounded-md py-[1px] cursor-pointer active:scale-95 text-sm px-2"
          >
            cancel
          </button>
          <button
            onClick={handleDeleteAll}
            className="bg-red-800 rounded-md py-[1px] cursor-pointer active:scale-95 text-sm px-2"
          >
            yes
          </button>
        </div>
      </dialog>
      <div
        style={{ transform: "translate(-50%)" }}
        className="absolute left-[50%] top-20"
      >
        <input
          type="text"
          value={input}
          ref={inputRef}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTaskHandler()}
          placeholder="Add task"
          className="border-[.5px] text-white border-gray-600 py-2 px-4 focus:border-blue-900 transition-all rounded-md outline-none mb-4"
        />
        <button
          onClick={addTaskHandler}
          className="bg-green-800 py-[7px] hover:text-white text-white/80 transition-all cursor-pointer active:scale-95 text-lg px-4 rounded-md font-extrabold ml-3"
        >
          Add
        </button>
        <button
          onClick={() => {
            if (tasks.length === 0)
              return alert("There is no tasks to delete!");
            dialougeRef.current.showModal();
          }}
          className="bg-red-800 py-[7px] hover:text-white text-white/80 transition-all cursor-pointer active:scale-95 text-lg px-4 rounded-md font-extrabold ml-3"
        >
          Delete All
        </button>
      </div>

      <div
        style={{ transform: "translate(-50%)" }}
        className=" top-40  absolute flex justify-center items-center left-[50%] text-white rounded p-4"
      >
        <ol className="list-decimal">
          {tasks.length === 0 ? (
            <p className="mt-10 text-2xl font-bold"> No Tasks Yet.</p>
          ) : (
            tasks.map((task, idx) => (
              <li key={idx}>
                <div
                  onClick={() => handleCompleteTask(idx)}
                  className={`w-240 text-gray-300 mb-1 font-bold bg-gray-800 p-2.5 rounded-md flex justify-between items-center ${
                    task.complete ? "bg-purple-800 " : ""
                  }`}
                >
                  <p className="pl-1 break-words pr-10">{task.input}</p>
                  <button
                    onClick={(e) => handleDeleteTask(idx, e)}
                    className="pl-4 text-red-600 cursor-pointer  pr-4"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}
