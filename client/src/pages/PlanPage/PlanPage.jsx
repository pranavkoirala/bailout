import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../assets/Footer";

const PlanPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [password, setPassword] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    fetch(`https://bailout.onrender.com/api/plan/id/${id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [id]);

  const handleCancel = async () => {
    try {
      const response = await fetch(
        `https://bailout.onrender.com/api/plan/cancel/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ personName: selectedPerson }),
        }
      );

      if (response.ok) {
        setData((prevData) => ({
          ...prevData,
          people: prevData.people.forEach((person) =>
            person.name === selectedPerson
              ? { ...person, hasCancelled: true }
              : person
          ),
        }));
        setIsCancelled(true);
        setSelectedPerson(null);
      } else {
        alert("Error cancelling plan");
      }
    } catch (error) {
      console.error("Error cancelling plan:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/plan/verify/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setData(data.plan);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error verifying password:", error);
    }
  };

  return (
    <div className="flex flex-col items-center text-black">
      {data?.passwordProtected ? (
        <div className="flex flex-col">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 p-2 border rounded"
          />
          <button onClick={handleSubmit} className="p-2 bg-gray-300 rounded">
            submit
          </button>
        </div>
      ) : (
        <div>
          {data?.bothCancelled && (
            <div>
              <h2 className="text-white text-2xl font-bold">
                all people have cancelled the plan, congratulations! :)
              </h2>
              <p className="text-white">make sure to tell the others.</p>
            </div>
          )}
          {!data?.bothCancelled && selectedPerson && (
            <div>
              <h2 className="text-white text-3xl font-bold">
                you have selected {selectedPerson.name}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 bg-red-500 rounded m-2 text-white hover:bg-red-700 transition-colors"
              >
                cancel plan
              </button>
              {isCancelled && (
                <p className="text-white mt-2">
                  you have successfully cancelled the plan!
                </p>
              )}
            </div>
          )}
          {!data?.bothCancelled &&
            !selectedPerson &&
            data?.people &&
            Array.isArray(data.people) &&
            data.people.map((person) => (
              <div key={person._id}>
                <button
                  className="p-2 bg-gray-300 rounded m-2 text-white"
                  onClick={() => setSelectedPerson(person)}
                >
                  {person.name}
                </button>
              </div>
            ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PlanPage;
