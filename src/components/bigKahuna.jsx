// import jquery from "jquery";
import "../styles/bigKahuna.css";
// import $ from "jquery";

function BigKahuna() {
  let hunger = 50;
  let happiness = 50;
  let energy = 50;

  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  //////////////////////////// MAIN FUNCTIONS ////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////

  let feed = () => {
    if (hunger > 0 && hunger < 101) {
      hunger = hunger + (100 - hunger) / 1.5;
    }
    if (happiness < 101) {
      happiness = happiness + (100 - happiness) * 0.75;
    }
    if (energy < 60) {
      document.getElementById("pet-image").src = "./img/dog.png";
      setTimeout(() => {
        energy = energy + (100 - energy) * 0.2;
      }, 2000);
    }
    document.querySelector("#feedButton").disabled = true;
    displayInfo();
    setGauges();
    setTimeout(() => {
      document.querySelector("#feedButton").disabled = false;
    }, 30000);
  };
  function train() {
    if (energy < 70) {
      energy = energy - energy * 0.5;
      if (happiness < 101) {
        happiness = happiness + (100 - happiness) * 0.3;
      }
    } else if (energy > 70) {
      alert("Your pet is too energetic to focus");
    }

    displayInfo();
    setGauges();
  }
  function play() {
    if (happiness < 101) {
      happiness = happiness + (100 - happiness) / 3;
    }
    if (hunger > 25 && hunger < 101) {
      hunger = hunger - hunger * 0.3;
    }
    if (energy > 20) {
      energy = energy - energy * 0.3;
    } else if (energy < 20) {
      alert("Your pet is too tired to play right now");
      document.querySelector("#playButton").disabled = true;
      displayInfo();
      setGauges();
      setTimeout(() => {
        document.querySelector("#playButton").disabled = false;
      }, 10000);
    }
    displayInfo();
    setGauges();
  }

  //increase happiness & decrease play
  function displayInfo() {
    document.getElementById("hungerPoints").innerHTML = Math.round(hunger);
    document.getElementById("happinessPoints").innerHTML =
      Math.round(happiness);
    document.getElementById("energyPoints").innerHTML = Math.round(energy);
  }

  let gauge = document.getElementsByClassName(".gauge");
  let gaugeElements = document.querySelectorAll(".gauge");

  function setGaugeValue(gauge, points) {
    var bar = document.getElementById(gauge);
    bar.style.transform = `rotate(${points * 1.8}deg)`;
    bar.style.transition = `2s ease-out`;
  }

  function setGauges() {
    //  console.log(happiness);
    setGaugeValue("happinessGauge", happiness);
    setGaugeValue("energyGauge", energy);
    setGaugeValue("hungerGauge", hunger);
  }

  //////////////////////////////////////////
  //////////// TIMING FUNCTIONS ////////////
  //////////////////////////////////////////

  setInterval(function () {
    if (hunger > 0) {
      hunger -= 1;
    }
    displayInfo();
    setGauges();
  }, 5000);

  setInterval(function () {
    if (hunger < 30 && happiness > 0) {
      happiness -= 1;
    }
    displayInfo();
    setGauges();
  }, 3000);

  setInterval(function () {
    if (hunger < 10 && happiness > 0) {
      happiness -= 1;
    }
    displayInfo();
    setGauges();
  }, 1000);

  setInterval(function () {
    if (hunger > 50 && energy < 100) {
      energy += 1;
    }
    displayInfo();
    setGauges();
  }, 2000);

  setInterval(function () {
    if (hunger < 25 && energy > 0) {
      energy -= 1;
    }
    displayInfo();
    setGauges();
  }, 4000);

  //////////////////////////////////////////////////////////////////////
  ///////////////////////// MOODS //////////////////////////////////////
  //////////////////////////////////////////////////////////////////////

  //////// MAKE RESTLESS ///////////
  setInterval(function () {
    if (energy > 90) {
      document.getElementById("pet-image").src = "./img/dogTornCouch.png";
      alert("Your dog is tearing up the couch!");
    } else if (energy < 90 && energy > 30) {
      document.getElementById("pet-image").src = "./img/dog.png";
    }
    displayInfo();
    setGauges();
  }, 10000);

  //////// MAKE SLEEPY ///////
  setInterval(function () {
    if (energy <= 20) {
      document.getElementById("pet-image").src = "./img/sleepingDog2.png";
    } else if (energy > 30 && energy < 90) {
      document.getElementById("pet-image").src = "./img/dog.png";
    }
    displayInfo();
    setGauges();
  }, 10000);

  //////// MAKE CRANKY ///////
  setInterval(function () {
    if (hunger < 30 && happiness < 30) {
      document.getElementById("pet-image").src = "./img/dogAngry.png";
    }
    displayInfo();
    setGauges();
  }, 10000);

  ////////////////////////////
  ///// BUTTON TIME OUTS /////
  ////////////////////////////

  var trainButton = document.querySelector("#trainButton");
  var feedButton = document.querySelector("#feedButton");
  var playButton = document.querySelector("#playButton");

  var clickBtn = document.querySelector(".buttons")[1];

  feedButton.disabled = false;
  trainButton.disabled = false;
  playButton.disabled = false;

  return (
    <div>
      <header>
        <h1>Welcome to my Pokimanz train game</h1>
      </header>

      <div className="main-body">
        <img id="pet-image" src="./img/dog.png" alt=""></img>
      </div>
      <div className="meters">
        <div className="happiness">
          <div className="gauge">
            <div className="gaugeBody">
              <div className="gaugeCover">
                <p>
                  💓
                  <span className="points" id="happinessPoints">
                    {" "}
                  </span>
                </p>
              </div>
              <div className="gaugeFill" id="happinessGauge"></div>
            </div>
          </div>
        </div>

        <div className="hunger">
          <div className="gauge">
            <div className="gaugeBody">
              <div className="gaugeCover">
                <p>
                  🍖<span className="points" id="hungerPoints"></span>
                </p>
              </div>
              <div className="gaugeFill" id="hungerGauge"></div>
            </div>
          </div>
        </div>

        <div className="energy">
          <div className="gauge">
            <div className="gaugeBody">
              <div className="gaugeCover">
                <p>
                  🔋<span className="points" id="energyPoints"></span>
                </p>
              </div>
              <div className="gaugeFill" id="energyGauge"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons">
        <div>
          <button id="trainButton" onclick={train}>
            👋 Train
          </button>
        </div>
        <div>
          <button id="feedButton" onclick={feed}>
            🍖 Feed
          </button>
        </div>
        <div>
          <button id="playButton" onclick={play}>
            ⚽ Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default BigKahuna;
