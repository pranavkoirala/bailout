"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";

const Create = ({}) => {
  const [people, setPeople] = useState(["", ""]);

  const addPersonInput = () => {
    setPeople([...people, ""]);
  };

  const removePersonInput = (index) => {
    const newPeople = [...people];
    newPeople.splice(index, 1);
    setPeople(newPeople);
  };
  return (
    <div className="plan-wrapper">
      <h1 className="text-2xl underline">create your plan</h1>
      <div className="plan-form border border-white mt-2 h-fit p-4 flex flex-col">
        plan name
        <input type="text" id="name" className="m-2 p-1 rounded" />
        description
        <input type="text" id="description" className="m-2 p-1 rounded" />
        <div className="mt-4 people-wrapper">
          <label className="block text-white">people attending</label>
          {people.map((person, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                className="m-2 p-1 rounded text-white"
                value={person}
                onChange={(e) => {
                  const newPeople = [...people];
                  newPeople[index] = e.target.value;
                  setPeople(newPeople);
                }}
                placeholder="enter person"
              />
              {people.length > 2 && (
                <button
                  className="ml-2 text-red-500"
                  onClick={() => removePersonInput(index)}
                >
                  <img
                    src="https://www.svgrepo.com/show/405158/cross-mark.svg"
                    alt="x"
                    className="w-4 h-4"
                  />
                </button>
              )}
            </div>
          ))}
          <button
            className="h-10 p-2 m-1 bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white text-base hover:border-[#fff] cursor-pointer transition"
            onClick={addPersonInput}
          >
            add another person
          </button>
        </div>
      </div>
    </div>
  );
};

Create.propTypes = {};

export default Create;
