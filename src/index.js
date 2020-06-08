import { render, Fragment } from "preact";
import {
  useReducer,
  useState,
  useCallback,
  useRef,
  useEffect
} from "preact/hooks";

import { Knob } from "./components/Knob.js";

import "./style/index.scss";

const App = () => {
  return (
    <Fragment>
      <ul>
        <li>
          <label>
            <input type="checkbox" name="" />
            <div class="icon-box bigbox">
              {/* <i class="fa fa-home" aria-hidden="true" /> */}
              <span class="poweron" aria-hidden="true">
                <svg
                  class="bi bi-power"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  fill="#509eec"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.578 4.437a5 5 0 1 0 4.922.044l.5-.866a6 6 0 1 1-5.908-.053l.486.875z"
                  />
                  <path fill-rule="evenodd" d="M7.5 8V1h1v7h-1z" />
                </svg>
              </span>
            </div>
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" name="" />
            <div class="icon-box">
              {/* <i class="fa fa-phone" aria-hidden="true" /> */}
              {/* <i class="poweroff" aria-hidden="true"/> */}
              <span class="nighttime" aria-hidden="true">
                <svg
                  class="bi bi-moon"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  fill="#509eec"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z"
                  />
                </svg>
              </span>
            </div>
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" name="" />
            <div class="icon-box">
              {/* <i class="fa fa-plane" aria-hidden="true" /> */}
              <span class="daytime" aria-hidden="true">
                <svg
                  class="bi bi-sun"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  fill="#509eec"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M8.202.28a.25.25 0 0 0-.404 0l-.91 1.255a.25.25 0 0 1-.334.067L5.232.79a.25.25 0 0 0-.374.155l-.36 1.508a.25.25 0 0 1-.282.19l-1.532-.245a.25.25 0 0 0-.286.286l.244 1.532a.25.25 0 0 1-.189.282l-1.509.36a.25.25 0 0 0-.154.374l.812 1.322a.25.25 0 0 1-.067.333l-1.256.91a.25.25 0 0 0 0 .405l1.256.91a.25.25 0 0 1 .067.334L.79 10.768a.25.25 0 0 0 .154.374l1.51.36a.25.25 0 0 1 .188.282l-.244 1.532a.25.25 0 0 0 .286.286l1.532-.244a.25.25 0 0 1 .282.189l.36 1.508a.25.25 0 0 0 .374.155l1.322-.812a.25.25 0 0 1 .333.067l.91 1.256a.25.25 0 0 0 .405 0l.91-1.256a.25.25 0 0 1 .334-.067l1.322.812a.25.25 0 0 0 .374-.155l.36-1.508a.25.25 0 0 1 .282-.19l1.532.245a.25.25 0 0 0 .286-.286l-.244-1.532a.25.25 0 0 1 .189-.282l1.508-.36a.25.25 0 0 0 .155-.374l-.812-1.322a.25.25 0 0 1 .067-.333l1.256-.91a.25.25 0 0 0 0-.405l-1.256-.91a.25.25 0 0 1-.067-.334l.812-1.322a.25.25 0 0 0-.155-.374l-1.508-.36a.25.25 0 0 1-.19-.282l.245-1.532a.25.25 0 0 0-.286-.286l-1.532.244a.25.25 0 0 1-.282-.189l-.36-1.508a.25.25 0 0 0-.374-.155l-1.322.812a.25.25 0 0 1-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"
                  />
                </svg>
              </span>
            </div>
          </label>
        </li>

        <Knob
          numTicks={35}
          degrees={210}
          min={1}
          max={100}
          value={0}
          size={110}
          color={true}
        />
      </ul>
    </Fragment>
  );
};

render(<App />, document.querySelector("app") || document.body);
