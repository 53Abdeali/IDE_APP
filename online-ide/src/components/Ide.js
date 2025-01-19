import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import axios from "axios";
import FetchHistory from "./FetchHistory";

function Ide() {
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
  }`);
  const [output, setOutput] = useState("");

  const handleRun = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setOutput("Authentication Error: Please log in to execute code.");
        console.error("No token found");
        return;
      }

      const codeToExecute = { code };

      const response = await axios.post(
        "http://localhost:8080/api/execute",
        codeToExecute,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOutput(response.data.output);
      console.log("Execution Result:", response.data);
    } catch (err) {
      setOutput(
        `Error Executing Code: ${
          err.response ? err.response.data.message : err.message
        }`
      );
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

      <FetchHistory />
    </div>
  );
}

export default Ide;
