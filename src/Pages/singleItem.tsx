import Moment from "react-moment";
import { TiDelete } from "react-icons/ti";

interface data {
  todo: {
    id: string;
    title: string;
    description: string;
    date: string;
    isUpdated?: boolean;
  };
  handelDelete: (id: string) => void;
}

const singleItem = ({ todo, handelDelete }: data) => {
  return (
    <li
      className=" p-3 rounded-lg hover:shadow shadow-gray-300 duration-400 transition-all mt-7"
      
    >
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl ">{todo.title}</h2>
        <div className="text-2xl space-x-1">
          <button
            onClick={() => handelDelete(todo.id)}
            className=" hover:scale-110 transition-all"
          >
            <TiDelete  />
          </button>
        </div>
      </div>

      <textarea
        className="outline-none text-md h-[50px] scrollbar-hide bg-transparent resize-none border-none w-full p-0 my-3"
        value={todo.description}
      ></textarea>
      <p className="text-right text-xs  my-2">
        <Moment fromNow>{todo.date}</Moment>
      </p>
    </li>
  );
};

export default singleItem;
