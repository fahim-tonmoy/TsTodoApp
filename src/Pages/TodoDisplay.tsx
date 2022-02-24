import React, { useEffect, useRef, useState } from "react";

import Swal from "sweetalert2";
import Todo from "./singleItem";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";

interface formData {
  id: string;
  title: string;
  description: string;
  date: string;
  isUpdated?: boolean;
}

const TodoDisplay = () => {
  const { register, handleSubmit, reset } = useForm<formData>();
  const [switchEdit, setSwitchEdit] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  // todo states
  const [todos, setTodos] = useState<formData[]>(
    JSON.parse(localStorage.getItem("todos")!) || []
  );

  // save the todo in the local storage
  const onSubmit = (data: formData) => {
      // post todo functionality
      data.id = nanoid(10);
      data.date = new Date().toISOString();
      const newData = [...todos, data].reverse();
      setTodos(newData);
      // cogoToast.success("YAY!!🥳🎉 You added a todo");
      reset();
    }

  // setting local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // deleting a todo
  const handelDelete = (selectedId: string): void => {
    Swal.fire({
      title: "Confirm?",
      text: "Do You want to delete this Item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#08703c",
      cancelButtonColor: "#a30808",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const afterDeletedTodo = todos.filter(({ id }) => id !== selectedId);
        setTodos(afterDeletedTodo);
      } else {
        Swal.fire("Ok no problem", "", "info");
      }
    });
  };

  return (
    <>
      <section className="lg:max-w-6xl lg:mx-auto ">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cold-1 px-4 mt-10">
          
          <div className=" my-20 lg:mt-0 md:mt-0">
            <h1 className="text-center text-2xl font-bold">
              Tasks
            </h1>
            <div className="h-[500px] overflow-y-scroll scrollbar-hide text-sm lg:mx-8 md:mx-4 space-y-5">
              {todos.length === 0 ? (
                <h1 className="text-center text-lg my-10 ">
                  Your Tasks
                </h1>
              ) : (
                todos.map((todo) => (
                  <ol>
                    <Todo
                    key={todo.id}
                    todo={todo}
                    handelDelete={handelDelete}
                    />
                  </ol>
                ))
              )}
            </div>
          </div>
          
            <form
              className="flex flex-col  w-full space-y-5 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="text-center font-semibold text-3xl">
                Add Your Tasks
              </h1>
              <input
                required
                className="outline-none border-2 border-gray-400 bg-white shadow focus:shadow-lg transition-all focus:ring-0 py-4 rounded-lg"
                type="text"
                defaultValue=""
                placeholder="Title..."
                {...register("title")}
              />
              <textarea
                required
                className="outline-none border-2 border-gray-400 bg-white shadow focus:shadow-lg transition-all  focus:ring-0 py-4 rounded-lg lg:h-[200px] resize-none md:h-[200px] h-full w-full"
                placeholder="Description"
                defaultValue=""
                {...register("description")}
              ></textarea>
              <button className="bg-green-800 text-white py-2 rounded font-bold">
                Add todo
              </button>
            </form>
          
        </div>
      </section>
    </>
  );
};

export default TodoDisplay;
