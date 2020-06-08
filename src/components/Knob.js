import { Component } from "preact";
import "../style/Knob.scss";

class Knob extends Component {
  constructor(props) {
    super(props);
    this.fullAngle = props.degrees;
    this.startAngle = (360 - props.degrees) / 2;
    this.endAngle = this.startAngle + props.degrees;
    this.margin = props.size * 0.15;
    this.value = 0;
    this.currentDeg = Math.floor(
      this.convertRange(
        props.min,
        props.max,
        this.startAngle,
        this.endAngle,
        props.value
      )
    );
    this.state = { deg: this.currentDeg };
  }

  startDrag = e => {
    e.preventDefault();
    const knob = e.target.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    };
    const moveHandler = e => {
      // this.touches = e;
      if (e.touches && e.touches.length) {
        e.clientX = e.touches[0].clientX;
        e.clientY = e.touches[0].clientY;
      }
      this.currentDeg = this.getDeg(e.clientX, e.clientY, pts);
      if (this.currentDeg === this.startAngle) this.currentDeg--;
      let newValue = Math.floor(
        this.convertRange(
          this.startAngle,
          this.endAngle,

          this.props.min,
          this.props.max,
          this.currentDeg
        )
      );
      this.setState({ deg: this.currentDeg });
      this.value = newValue;
      // this.props.onChange(newValue);
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("touchmove", moveHandler);
    document.addEventListener("mouseup", e => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("touchmove", moveHandler);
    });
    document.addEventListener("touchend", e => {
      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("mousemove", moveHandler);
    });
  };

  getDeg = (cX, cY, pts) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = (Math.atan(y / x) * 180) / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    let finalDeg = Math.min(Math.max(this.startAngle, deg), this.endAngle);
    return finalDeg;
  };

  convertRange = (oldMin, oldMax, newMin, newMax, oldValue) => {
    return (
      ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
    );
  };

  renderTicks = () => {
    let ticks = [];
    const incr = this.fullAngle / this.props.numTicks;
    const size = this.margin + this.props.size / 2;
    for (let deg = this.startAngle; deg <= this.endAngle; deg += incr) {
      const tick = {
        deg: deg,
        tickStyle: {
          height: size + 10,
          left: size - 1,
          top: size + 2,
          transform: "rotate(" + deg + "deg)",
          transformOrigin: "top"
        }
      };
      ticks.push(tick);
    }
    return ticks;
  };

  dcpy = o => {
    return JSON.parse(JSON.stringify(o));
  };

  render() {
    let kStyle = {
      width: this.props.size,
      height: this.props.size
    };
    let iStyle = this.dcpy(kStyle);
    let oStyle = this.dcpy(kStyle);
    oStyle.margin = this.margin;
    if (this.props.color) {
      // oStyle.backgroundImage =
      //   "radial-gradient(100% 70%,hsl(210, " +
      //   this.currentDeg +
      //   "%, " +
      //   this.currentDeg / 5 +
      //   "%),hsl(" +
      //   Math.random() * 100 +
      //   ",20%," +
      //   this.currentDeg / 36 +
      //   "%))";
      oStyle.backgroundImage = `radial-gradient(100% 90%,
        rgba(255,255,255,${this.value / 100}),#ebf5fc)`;
    }
    iStyle.transform = "rotate(" + this.state.deg + "deg)";

    return (
      <div className="knob knobdiv" style={kStyle}>
        {/* <div className="debug">{JSON.stringify(this.value)}</div> */}
        <div className="ticks">
          {this.props.numTicks
            ? this.renderTicks().map((tick, i) => (
                <div
                  key={i}
                  className={
                    "tick" + (tick.deg <= this.currentDeg ? " active" : "")
                  }
                  style={tick.tickStyle}
                />
              ))
            : null}
        </div>
        <div
          className="knob outer"
          style={oStyle}
          onMouseDown={this.startDrag}
          onTouchStart={this.startDrag}
        >
          <div className="knob inner" style={iStyle}>
            <div className="grip" />
          </div>
        </div>
      </div>
    );
  }
}
Knob.defaultProps = {
  size: 150,
  min: 10,
  max: 30,
  numTicks: 0,
  degrees: 270,
  value: 0
};

export { Knob };
