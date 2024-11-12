"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";

const Create = ({}) => {
  const [people, setPeople] = useState(["", ""]);
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    console.log(people, planName, description, password, date);
    const response = await fetch("http://localhost:3000/api/plan/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planName,
        description,
        password,
        people,
        date: new Date(date).getTime() / 1000,
      }),
    });
    console.log(response.data);
  };

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
        <input
          type="text"
          id="name"
          className="m-2 p-1 rounded text-black"
          onChange={(e) => setPlanName(e.target.value)}
        />
        description
        <input
          type="text"
          id="description"
          className="m-2 p-1 rounded text-black"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="password-wrapper flex flex-col justify-center">
          Password
          <div className="p-button-wrapper mt-[3.5px] ml-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer show-pass"
                value=""
                onChange={() => setShowPassword(!showPassword)}
              />
              <div className="group peer bg-white rounded-full duration-300 w-8 h-4 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-2.5 after:w-2.5 after:top-[3px] after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-[14px] peer-hover:after:scale-95"></div>
            </label>
          </div>
          <input
            hidden={!showPassword}
            type="password"
            id="password"
            className="m-2 p-1 rounded relative text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-2 people-wrapper">
          <label className="block text-white">people attending</label>
          {people.map((person, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                className="m-2 p-1 rounded text-black"
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
        <input
          type="datetime-local"
          className="text-black w-fit mt-4"
          min={new Date().toISOString().split(".")[0]}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className="h-10 w-50 p-2 mt-4 bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white text-base hover:border-[#fff] cursor-pointer transition"
          onClick={handleSubmit}
        >
          submit
        </button>
      </div>
    </div>
  );
};

Create.propTypes = {};

export default Create;
