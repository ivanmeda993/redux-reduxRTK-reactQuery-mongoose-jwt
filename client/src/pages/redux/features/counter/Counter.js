import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount, reset } from "./counterSlice";
import Btn from "../../../../components/btn/Btn";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const resetHandler = () => {
    dispatch(reset());
    setValue(0);
  };
  return (
    <section className="text-gray-600 body-font">
      <div className=" px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12 w-full ">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Counter
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base !text-3xl">
            {count}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          <Btn onClick={() => dispatch(increment())} text="Increment" />
          <Btn onClick={() => dispatch(decrement())} text="Decrement" />

          <input
            onChange={(e) => setValue(e.target.value)}
            type="number"
            id="default-input"
            value={value}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 w-[200px] md:mx-auto"
          />
          <Btn
            onClick={() => dispatch(incrementByAmount(+value))}
            text={`Amount ${value}`}
          />

          <Btn onClick={resetHandler} text="Reset" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default Counter;
