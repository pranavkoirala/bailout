import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlanPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/plan/id/${id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [id]);

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
            Submit
          </button>
        </div>
      ) : (
        <div>
          {data
            ? data.people.map((person) => {
                console.log(person);
                return (
                  <div key={person.id}>
                    <button className="p-2 bg-gray-300 rounded m-2 text-white">
                      {person.name}
                    </button>
                  </div>
                );
              })
            : "Loading..."}
        </div>
      )}
    </div>
  );
};

export default PlanPage;
