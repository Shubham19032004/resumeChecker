import { useState } from "react";
import axios from 'axios';
import Display from "./Display";
export default function Input() {
  const [detail, setDetail] = useState("");
  const [pdf, setPdf] = useState(null);
  const [data,setData]=useState(null)
  function uploadPdf(event) {
    const selectedPdf = event.target.files[0];

    if (selectedPdf) {
      setPdf(selectedPdf);
    }
  }

  async function submit(event) {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("detail", detail);
      formData.append("pdf", pdf);
      console.log(pdf)
      const res = await axios.post("http://localhost:3000", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setData(res.data)
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }

  return (
    <div className="inputdiv" >
    <form encType="multipart/form-data">
      <span className="Text">Enter job details:</span>
      <input
        className="input"
        type="text"
        placeholder="Detail"
        onChange={(e) => setDetail(e.target.value)}
      />
      <span className="Text">Enter your Resume (PDF)</span>
      <input
        className="resumepdf"
        type="file"
        accept=".pdf"
        name=""
        onChange={uploadPdf}
        required
      />
      <button onClick={submit} className="SubmitButton">Submit</button>
     
    </form>
    {data && <Display data={data} />}

    </div>
  );
}
