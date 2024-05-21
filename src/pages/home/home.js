import React from "react";
import "./home.css";
import system from "../images/system.jpg";
import scheduling from "../images/scheduling.jpg";
import globe from "../images/globe.png";
//import logo from "../images/iron.webp";

function Card() {
  return (
    <div className="card">
      <div className="card-top">
        <h2>Reporting</h2>
      </div>
      <p className="ParagraphSpace">Reporting Management</p>
      <img
        className="systempic"
        src={system}
        alt="CER Reporting System"
        height="200"
        width="200"
      />
    </div>
  );
}
function Card2() {
  return (
    <div className="card">
      <div className="card-top">
        <h2>Scheduling </h2>
      </div>
      <p className="ParagraphSpace">
        We know scheduling and time management can be an arduous process, and
        our system is designed to make the process as simple as possible.
        Templates are pre-installed with defaults which can be tailored to your
        individual requirements. You can set up a general schedule and then
        over-ride the schedule for specific requirements, or leave it as is and
        just press the "Launch" button.
      </p>
      <img
        className="systempic"
        src={scheduling}
        alt="Iron Reservations "
        height="200"
        width="200"
      />
    </div>
  );
}
function Card3() {
  return (
    <div className="card">
      <div className="card-top">
        <h2>Scaleability </h2>
      </div>
      <p className="ParagraphSpace">
        Whether you have a small shop with one person and a very simple scheule
        requirements, or multiple locations scattered all over the world with
        multiple employees amd rates, our system will handle anything you throw
        at it with ease.
      </p>
      <img
        className="globepic"
        src={globe}
        alt="Iron Reservations "
        height="200"
        width="200"
      />
    </div>
  );
}
const home = () => {
  return (
    <div className="App">
      <div className="right-container">
        <Card />
        {/* <Card2 />
        <Card3 /> */}
      </div>
    </div>
  );
};

export default home;

// function App() {
//   return (
//   <div className=”App”>
//   <div class=”right-container”>

//   <Card/>
//   <Card/>
//   <Card/>
//   </div>
//   </div>
//   );
//  }
