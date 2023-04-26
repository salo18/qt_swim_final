import formatDistance from "date-fns/formatDistance";

export default function Grid({ samples }) {
  return (
    <>
      <h2>Recent Samples:</h2>
        {/* <button onClick={refreshData}>Refresh Data</button> */}

        <div className="grid">
          {samples.map((sample) => {
            return (
              <div key={sample.cronUpdateDate} className="card">
                {/* <h3>{sample.lawaSampleDate}</h3> */}
                <p>
                  Lake Status: <strong>{sample.status}</strong>
                </p>
                <p>
                  Time since we last checked LAWA:{" "}
                  {formatDistance(sample.cronUpdateDate, new Date())}
                </p>
              </div>
            );
          })}
        </div>
    </>
  );
}
