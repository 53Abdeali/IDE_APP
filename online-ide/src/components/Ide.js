import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import axios from "axios";
import FetchHistory from "./FetchHistory";

function Ide() {
  const [code, setCode] = useState(`public class Main{
    public static void main(String [] args){
        System.out.println("Hello World!");
      }
    }`);

  const [output, setOutput] = useState("");

  const handleRun = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/execute", {
        code: code,
      });
      setOutput(res.data);
    } catch (err) {
      setOutput("Error Executing Code", err);
      console.error("Execution Error:", err);
    }
  };

  return (
    <div>
      <CodeMirror
        value={code}
        height="400px"
        theme="dark"
        extensions={[java()]}
        onChange={(newValue) => setCode(newValue)}
      />
      <button
        onClick={handleRun}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: "blue",
          color: "white",
        }}
      >
        Run Code
      </button>

      <pre style={{ background: "#333", color: "white", padding: "10px" }}>
        {output || "Click 'Run Code' to see the output here..."}
      </pre>

      <FetchHistory/>
    </div>
  );
}

export default Ide;
