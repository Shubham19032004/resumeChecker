import { useState, useEffect } from "react";

export default function Display({ data }) {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    let mydata = JSON.parse(data.data);
    setJsonData(mydata);
  }, [data]);

  return (
    <>
      {jsonData && (
        <div>
          
          <p className="rating"><span className="titles">Score:</span> {jsonData.score}</p>
          
          <p className="rating"><span className="titles">Missing:</span> {jsonData.missing}</p>
          <p className="rating"><span className="titles">Add:</span> {jsonData.add}</p>
        </div>
      )}
    </>
  );
}
