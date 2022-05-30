const affichageTravail = document.querySelector(".affichage__t");
const affichageRepos = document.querySelector(".affichage__p");

const btnGo = document.querySelector(".b1");
const btnStop = document.querySelector(".b2");
const btnReset = document.querySelector(".b3");

const cycles = document.querySelector("h2");

const form = document.querySelector("form");
const formTxt = document.querySelector("form p");
const inputs = document.querySelectorAll("form input");

let tempsInitial = 1800;
let tempsDeRepos = 300;

let newTime = [];

let travailModifier = tempsInitial;
let reposModifier = tempsDeRepos;

let checkInterval = false;
let pause = false;
let nbCycles = 0;

cycles.innerText = `Nombre de cycles : ${nbCycles}`;

affichageTravail.innerText = `${Math.trunc(travailModifier / 60)} : ${
  travailModifier % 60 < 10 ? `0${travailModifier % 60}` : travailModifier % 60
}`;
affichageRepos.innerText = `${Math.trunc(reposModifier / 60)} : ${
  reposModifier % 60 < 10 ? `0${reposModifier % 60}` : reposModifier % 60
}`;

btnGo.addEventListener("click", () => {
  if (checkInterval === false) {
    travailModifier--;
    affichageTravail.innerText = `${Math.trunc(travailModifier / 60)} : ${
      travailModifier % 60 < 10
        ? `0${travailModifier % 60}`
        : travailModifier % 60
    }`;

    let timer = setInterval(() => {
      checkInterval = true;
      if (pause === false && travailModifier > 0) {
        travailModifier--;
        affichageTravail.innerText = `${Math.trunc(travailModifier / 60)} : ${
          travailModifier % 60 < 10
            ? `0${travailModifier % 60}`
            : travailModifier % 60
        }`;
      } else if (
        pause === false &&
        travailModifier === 0 &&
        reposModifier > 0
      ) {
        reposModifier--;
        affichageRepos.innerText = `${Math.trunc(reposModifier / 60)} : ${
          reposModifier % 60 < 10
            ? `0${reposModifier % 60}`
            : reposModifier % 60
        }`;
      } else if (
        pause === false &&
        reposModifier === 0 &&
        travailModifier === 0
      ) {
        nbCycles++;
        cycles.innerText = `Nombre de cycles : ${nbCycles}`;

        travailModifier = tempsInitial;
        reposModifier = tempsDeRepos;

        affichageTravail.innerText = `${Math.trunc(travailModifier / 60)} : ${
          travailModifier % 60 < 10
            ? `0${travailModifier % 60}`
            : travailModifier % 60
        }`;
        affichageRepos.innerText = `${Math.trunc(reposModifier / 60)} : ${
          reposModifier % 60 < 10
            ? `0${reposModifier % 60}`
            : reposModifier % 60
        }`;
      }
    }, 1000);

    // Reset

    btnReset.addEventListener("click", () => {
      clearInterval(timer);
      travailModifier = tempsInitial;
      reposModifier = tempsDeRepos;
      checkInterval = false;

      affichageTravail.innerText = `${Math.trunc(travailModifier / 60)} : ${
        travailModifier % 60 < 10
          ? `0${travailModifier % 60}`
          : travailModifier % 60
      }`;
      affichageRepos.innerText = `${Math.trunc(reposModifier / 60)} : ${
        reposModifier % 60 < 10 ? `0${reposModifier % 60}` : reposModifier % 60
      }`;
    });
  } else return;
});

btnStop.addEventListener("click", () => {
  if (pause === false) {
    btnStop.innerText = "Play";
  } else if (pause === true) {
    btnStop.innerText = "Pause";
  }
  pause = !pause;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputs.forEach((time) => {
    newTime.push(time.value);
  });

  if (newTime[0] === "" || newTime[0] < 1 || newTime[0] > 60) {
    travailModifier = tempsInitial;
    affichageTravail.innerText = `${Math.trunc(travailModifier / 60)} : ${
      travailModifier % 60 < 10
        ? `0${travailModifier % 60}`
        : travailModifier % 60
    }`;
    formTxt.innerText = "Veuilez entrer une durée entre 1min et 60min";
  } else if (newTime[1] === "" || newTime[1] < 1 || newTime[1] > 60) {
    reposModifier = tempsDeRepos;
    affichageRepos.innerText = `${Math.trunc(reposModifier / 60)} : ${
      reposModifier % 60 < 10 ? `0${reposModifier % 60}` : reposModifier % 60
    }`;
    formTxt.innerText = "Veuilez entrer une durée entre 1min et 60min";
  } else {
    travailModifier = newTime[0] * 60;
    reposModifier = newTime[1] * 60;
    affichageTravail.innerText = `${Math.trunc(travailModifier / 60)} : ${
      travailModifier % 60 < 10
        ? `0${travailModifier % 60}`
        : travailModifier % 60
    }`;
    affichageRepos.innerText = `${Math.trunc(reposModifier / 60)} : ${
      reposModifier % 60 < 10 ? `0${reposModifier % 60}` : reposModifier % 60
    }`;
  }

  newTime = [];
});
