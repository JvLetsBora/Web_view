//cria uma variável api com o endereço fornecido pelo node
var api = "https://w89zmz-3020.preview.csb.app";

var eu = "";
var vida_ = 60;
var pocoes_ = 3;
var player_ = "";
var jogo = true;
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

function getEu(theUrl) {
  //p1
  // Essa Função é chamada no momento do carregamento da tag body na aba visão geral, relacionando a duração com o tamanho do grafico
  let requestLines = new XMLHttpRequest();
  requestLines.onload = function () {
    let dados = JSON.parse(this.responseText); // Essa linha representa a devolutiva da consulta ao banco de dados amarzenada em um array com varios dicionários.
    eu = dados[0]["vez"];
    vida_ = dados[0]["vida"];
    pocoes_ = dados[0]["pocoes"];
    player_ = dados[0]["status"];
  };

  requestLines.open("GET", api + theUrl, true);
  requestLines.send();
}

addEventListener("load", (event) => {
  atualizar(61, 3, 1);
  atualizar(61, 3, 2);

  getEu("/player1");
  if (player_ == "off") {
    atualizar(
      parseInt(players.player1.vida),
      parseInt(players.player1.pocoes),
      1
    );
    document.getElementById("player").innerHTML = "<b>Você é o player 1</b>";
  } else {
    atualizar(
      parseInt(players.player2.vida),
      parseInt(players.player2.pocoes),
      2
    );
    document.getElementById("player").innerHTML = "<b>Você é o player 2</b>";
    getEu("/player2");
  }
});

function dano(min, max) {
  return Math.random() * (max - min) + min;
}

function start() {
  if (players.turno == "seu") {
    document.getElementById(
      "placar"
    ).innerHTML = `<li><span>Vida: ${vida_}</span> </li> <li><span>Poções: ${pocoes_}</span></li><li id="turno" style="color:  rgb(16, 245, 50);">Seu turno</li>`;
  } else {
    document.getElementById(
      "placar"
    ).innerHTML = `<li><span>Vida: ${vida_}</span> </li> <li><span>Poções: ${pocoes_}</span></li><li id="turno" style="color:   rgb(224, 0, 0);">Esperando adiversario</li>`;
  }

  atualizar(
    parseInt(players.player1.vida),
    parseInt(players.player1.pocoes),
    1
  );
  atualizar(
    parseInt(players.player2.vida),
    parseInt(players.player2.pocoes),
    2
  );
}

function acaos(acao) {
  if (eu == "player1") {
    switch (acao) {
      case "ataque":
        console.log(eu);
        if (eu == "player1") {
          if (players.player2.vida >= 0) {
            let dano = this.dano(0, 15);
            if (dano > 0) {
              if (confirm(`Ataque sucedido, ${dano} ao inimigo!`)) {
                acao = "";
                players.turno == "dele";
                players.player2.vida -= dano;
                start();
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
                players.turno == "dele";
                players.player1.vida -= dano;
                start();
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

function atualizar(vida, pocoes, a) {
  $.ajax({
    type: "POST",
    url: api + "/atualizar" + a,
    contentType: "application/json; charset=utf-8", //por padrão, temos que avisar que a aplicação é do tipo json e que os caracteres aceitam caracteres especiais
    dataType: "json", //o conteúdo do dado é json
    data: JSON.stringify(
      //transforma os valores em uma string do tipo json
      {
        vida: vida, //idFunc, idProject, horasAlocadasProjeto, mes, ano
        status: "player" + a,
        pocoes: pocoes,
        vez: "vez_",
      }
    ),
  });

  $.ajax({
    type: "DELETE",
    url: api + "/deletar" + a,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      vida: vida,
    }),
  });
}
