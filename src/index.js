import {render, Fragment} from "preact";
import {
  useReducer,
  useState,
  useCallback,
  useRef,
  useEffect
} from "preact/hooks";

import {Knob} from "./components/Knob.js";

import "./style/index.scss";

const url = '/huehousecontrol/ajax/groups/2'

window.lastBrightnessChange = 0;

const App = () => {
  const [powerOn, setPowerOn] = useState(true);
  const [warmnessChoise, setWarmnessChoise] = useState(null);
  const [brightnessValue, setBrightnessValue] = useState(null);
  const [lastBrightnessChange, setLastBrightnessChange] = useState(new Date().getTime())

  // if (window.lastBrightnessChange !== lastBrightnessChange) {
  // console.log("lastBrightnessChange changed!!!");
  // console.log("window:", window.lastBrightnessChange, "new:", lastBrightnessChange)
  // }
  // window.lastBrightnessChange = lastBrightnessChange

  const getWarmnessAsCTNum = str =>
    str === "warm" ? 495 :
      str === "cold" ? 200 : 0;

  //load initial state
  useEffect(() =>
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setBrightnessValue(res.state.bri)
        setPowerOn(res.state.on)
        // console.log(res.state.ct)
        if (res.state.ct === getWarmnessAsCTNum("warm")) {
          setWarmnessChoise("warm");
        }
        else if (res.state.ct === getWarmnessAsCTNum("cold")) {
          setWarmnessChoise("cold");
        }
      })
      .catch(err =>
        alert("you should probably connect from inside corret NAT"))
    , []);



  const handlePowerClick = _ => {
    setPowerOn(!powerOn);
    fetch(url, {
      method: "PUT"
      , body: new URLSearchParams(`data={"status":{"on":${!powerOn}}}`)//=${!powerOn}`)
    })
      .then(e => e.body())
      .then(e => console.log("put done", e))
      .catch(e => console.log(e));
  }

  const handleWarmnessClick = warmness => {
    setWarmnessChoise(warmness);
    fetch(url, {
      method: "PUT"
      , body: new URLSearchParams(`data={"status":{"ct":${getWarmnessAsCTNum(warmness)},"transitiontime":0}}`)
    })
      .then(e => e.body())
      .then(e => console.log("put done", e))
      .catch(e => console.log(e));
  }

  function handleBrightnessChange(bri) {
    const currTime = new Date().getTime();
    // console.log("currtime:", currTime, "lastchange:", lastBrightnessChange, currTime - lastBrightnessChange)
    if ((currTime - lastBrightnessChange) >= 600) {
      setBrightnessValue(bri);
      setLastBrightnessChange(new Date().getTime());
      fetch(url, {
        method: "PUT"
        , body: new URLSearchParams(`data={"status":{"bri":${bri}}}`)//,"transitiontime":0}}`)
      })
        .then(e => console.log("put done", e))
        .catch(e => console.error(e));
    }
    else {
    }

  }

  return (
    <Fragment>
      <ul>
        <li>
          <label>
            <input type="checkbox" name="poweron" checked={powerOn} onClick={handlePowerClick} />
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
            <input
              type="checkbox"
              name="warm"
              checked={warmnessChoise === "warm"}
              onClick={() => handleWarmnessClick("warm")}
            />
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
            <input
              type="checkbox"
              name="cold"
              checked={warmnessChoise === "cold"}
              onClick={() => handleWarmnessClick("cold")}
            />
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

        {brightnessValue === null ? "" : <Knob
          numTicks={35}
          degrees={210}
          min={0}
          max={254}
          value={brightnessValue}
          size={110}
          color={true}
          onChange={handleBrightnessChange}
        /* force rerender with key, otherwise didn't rotate on value update. 
        doesn't seem to have perf implications EDIT: had other implications*/
        // key={brightnessValue}
        />}
      </ul>
    </Fragment>
  );
};

render(<App />, document.querySelector("app") || document.body);
