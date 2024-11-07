import { useEffect, useState } from "react";
import { viewContest } from "./contestservice";
import "./Contest.css"; // Custom CSS file to style the component
import { useNavigate } from "react-router-dom";

const Contest = () => {
  const [contest, setContest] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const fetchedContests = await viewContest();
        setContest(fetchedContests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };
    fetchContests();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">List of Contests</h2>
      <div className="row">
        {contest?.length > 0 ? (
          contest?.map((contestItem) => (
            <div key={contestItem._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{contestItem.name}</h5>
                  <p className="card-text">{contestItem.description}</p>
                  <p className="text-muted">Start Time: 06-02-2024</p>
                  <p className="text-muted">End Time: 09-02-2024</p>
                </div>
                <div className="card-footer text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/test/${contestItem.id}`)}
                  >
                    View Contest
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No contests available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contest;
