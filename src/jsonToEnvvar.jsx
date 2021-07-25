import React, { useEffect, useState } from "react";
import { jsonDataExample } from "./exampleData";
import copy from "copy-to-clipboard";

const JsonToEnvvar = () => {
  const [jsonData, SetJsonData] = useState(jsonDataExample);
  const [envVars, SetenvVars] = useState("");
  const [isJsonWithProblem, SetIsJsonWithProblem] = useState(false);

  function jsonDataChange(event) {
    SetJsonData(event.target.value);
  }

  function onClickCopy() {
    copy(envVars);
  }

  useEffect(() => {
    function transformJsonToEnvvar() {
      let parsedJson = {};
      try {
        SetIsJsonWithProblem(false);
        parsedJson = JSON.parse(jsonData);
      } catch (_) {
        SetIsJsonWithProblem(true);
      }

      let envVars = "";
      for (var [key, value] of Object.entries(parsedJson)) {
        if (key && value) {
          envVars += `${key}=${value}\n`;
        }
      }
      SetenvVars(envVars);
    }
    transformJsonToEnvvar();
  }, [jsonData]);

  return (
    <div className="row">
      <div className="col">
        {isJsonWithProblem ? (
          <p className="alert alert-danger" role="alert">
            Json is with problem.
          </p>
        ) : (
          ""
        )}

        <div className="mb-3">
          <label htmlFor="json" className="form-label">
            Json
          </label>
          <textarea
            className="form-control"
            id="jsonData"
            value={jsonData}
            onChange={jsonDataChange}
            rows="20"
          ></textarea>
        </div>
      </div>
      <div className="col">
        <div className="mb-3">
          <label htmlFor="envVars" className="form-label">
            envVars
          </label>
          <button
            type="button"
            className="btn btn-outline-primary"
            style={{ "margin-left": "10px" }}
            onClick={onClickCopy}
          >
            <i className="fa fa-copy" style={{ "padding-right": "5px" }}></i>
            Copy
          </button>
          <textarea
            className="form-control"
            id="envVars"
            value={envVars}
            readOnly
            rows="20"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default JsonToEnvvar;
