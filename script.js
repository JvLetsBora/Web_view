//cria uma variável api com o endereço fornecido pelo node
api = "https://w89zmz-3021.preview.csb.app";

function getEu() {
  $.get("https:/w89zmz-3020.preview.csb.app/users", function (resultado) {
    return resultado.player;
  });
}
var eu = getEu();

var jogo = false;
const players = {
  player1: {
    vida: 60,
    pocoes: 3,
    status: "off",
  },
  player2: {
    vida: 60,
    pocoes: 3,
    status: "off",
  },
  turno: "seu",
};

function dano(min, max) {
  return Math.random() * (max - min) + min;
}

function start(vida, pocoes) {
  if (players.turno == "seu") {
    document.getElementById(
      "placar"
    ).innerHTML = `<li><span>Vida: ${vida}</span> </li> <li><span>Poções: ${pocoes}</span></li><li id="turno" style="color:  rgb(16, 245, 50);">Seu turno</li>`;
  } else {
    document.getElementById(
      "placar"
    ).innerHTML = `<li><span>Vida: ${vida}</span> </li> <li><span>Poções: ${pocoes}</span></li><li id="turno" style="color:   rgb(224, 0, 0);">Esperando adiversario</li>`;
  }
}

function acaos(acao) {
  if (eu == "player1") {
    switch (acao) {
      case "ataque":
        if (eu == "player1") {
          if (players.player2.vida >= 0) {
            let dano = this.dano(0, 15);
            if (dano > 0) {
              if (confirm(`Ataque sucedido, ${dano} ao inimigo!`)) {
                acao = "";
              }
            }
            players.player2.vida -= dano;
          }
        }
        document.getElementById(acao).style.backgroundColor =
          "rgb(165, 42, 42)";
        break;
      case "cura":
        players.player1.pocoes -= 1;
        players.player1.vida += 10;
        document.getElementById(acao).style.backgroundColor =
          "rgb(42, 165, 52)";
        break;
      case "esquiva":
        document.getElementById(acao).style.backgroundColor =
          "rgb(165, 99, 42)";
        break;
    }
    start(players.player1.vida, players.player1.pocoes);
  } else {
    switch (acao) {
      case "ataque":
        if (eu == "player2") {
          if (players.player1.vida >= 0) {
            let dano = this.dano(0, 15);
            if (dano > 0) {
              if (confirm(`Ataque sucedido, ${dano} ao inimigo!`)) {
                acao = "";
              }
            }
            players.player1.vida -= dano;
          }
        }
        document.getElementById(acao).style.backgroundColor =
          "rgb(165, 42, 42)";
        break;
      case "cura":
        players.player2.pocoes -= 1;
        players.player2.vida += 10;
        document.getElementById(acao).style.backgroundColor =
          "rgb(42, 165, 52)";
        break;
      case "esquiva":
        document.getElementById(acao).style.backgroundColor =
          "rgb(165, 99, 42)";
        break;
    }
    start(players.player2.vida, players.player2.pocoes);
  }
}
