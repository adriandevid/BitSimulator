var Regist = [];
var IsRegistradorContar = 0;
var contadorDeEnderecosCompletos = 0;
var ValorDeCadaTabela;
var contadorDePassos = 0;
var EnderoBusca = 1;

function IniciarPercusoDeInstrucoes() {
	intervalosDeChamandaDeFuncao = setInterval(CoresDeCaixas, 500);
}

function CoresDeCaixas() {
	var corDePC = document.getElementById("Component3");
	var corDaUC = document.getElementById("UC");
	corDePC.style.fill = "green";
	contadorDePassos += 1;
	console.log(contadorDePassos);
	if (contadorDePassos > 3) {
		corDePC.style.fill = "white";
		if (contadorDePassos > 6 && contadorDePassos < 10) {
			corDaUC.style.fill = "green";
		} else {
			corDaUC.style.fill = "white";
			if (10 < contadorDePassos && contadorDePassos < 13) {
				TrocarCorPorEndereco(EnderoBusca, "green");
			} else {
				if (contadorDePassos > 14) {
					TrocarCorPorEndereco(EnderoBusca, "white");
				}
			}
		}
	}
}

function AdicionarComando() {
	var valorDeInput = document.getElementById("EntradaDeInstrucao").value;
	var InstrucaoDecomposta = valorDeInput.split(" ");
	var contadorDeCond = 0;
	if (contadorDeEnderecosCompletos != 20) {
		for (var contador = 0; contador < Instrucoes.length; contador++) {
			contadorDeCond += 1;
			if (3 <= InstrucaoDecomposta.length <= 4) {
				if (InstrucaoDecomposta[0] == Instrucoes[contador]) {
					if (InstrucaoDecomposta.length == 4 && (InstrucaoDecomposta[0] == "ADD" ||
						InstrucaoDecomposta[0] == "SUB" ||
						InstrucaoDecomposta[0] == "DIV")
					) {
						Regist = [];
						Regist.push(InstrucaoDecomposta[1]);
						Regist.push(InstrucaoDecomposta[2]);
						Regist.push(InstrucaoDecomposta[3]);

						for (
							var contador = 0;
							contador < Registradores.length;
							contador++
						) {
							for (
								var contadorRegistrador = 0;
								contadorRegistrador < Regist.length;
								contadorRegistrador++
							) {
								if (Registradores[contador] == Regist[contadorRegistrador]) {
									IsRegistradorContar += 1;
								}
							}
						}
						if (IsRegistradorContar == 3) {
							var AlertErrorColor = document.getElementById(
								"EntradaDeInstrucao"
							);
							AlertErrorColor.style = "border:2px solid green;";
							InstrucoesDeEntrada.push(valorDeInput);
							contadorDeEnderecosCompletos += 1;
							AdicionarComandoNaMemoria(
								contadorDeEnderecosCompletos,
								valorDeInput
							);
							IsRegistradorContar = 0;
							contadorDeCond = 0;
							break;
						} else {
							var AlertErrorColor = document.getElementById(
								"EntradaDeInstrucao"
							);
							AlertErrorColor.style = "border:2px solid red;";
							alert(
								"Ouve um erro na sua entrada, por favor revise o seu dado/instrução e adicione novamente!!"
							);
							contadorDeCond = 0;
							IsRegistradorContar = 0;
							break;
						}
					} else {
						if (
							InstrucaoDecomposta.length == 3 &&
							(InstrucaoDecomposta[0] == "LOAD" ||
								InstrucaoDecomposta[0] == "STO")
						) {
							for (
								var contador = 0;
								contador < EnderecoInstrucaoDado.length;
								contador++
							) {
								if (InstrucaoDecomposta[1] == EnderecoInstrucaoDado[contador]) {
									IsRegistradorContar += 1;
									Regist = [];
									Regist.push(InstrucaoDecomposta[1]);
									Regist.push(InstrucaoDecomposta[2]);

									for (
										var contador = 0;
										contador < Registradores.length;
										contador++
									) {
										if (Registradores[contador] == Regist[1]) {
											IsRegistradorContar += 1;
										}
									}
									if (IsRegistradorContar == 2) {
										var AlertErrorColor = document.getElementById(
											"EntradaDeInstrucao"
										);
										AlertErrorColor.style = "border:2px solid green;";
										InstrucoesDeEntrada.push(valorDeInput);
										contadorDeEnderecosCompletos += 1;
										console.log(InstrucoesDeEntrada);
										AdicionarComandoNaMemoria(
											contadorDeEnderecosCompletos,
											valorDeInput
										);
										IsRegistradorContar = 0;
										contadorDeCond = 0;
										IsEnderecoContar = 0;
										break;
									} else {
										var AlertErrorColor = document.getElementById(
											"EntradaDeInstrucao"
										);
										AlertErrorColor.style = "border:2px solid red;";
										alert(
											"Ouve um erro na sua entrada, por favor revise o seu dado/instrução e adicione novamente!!"
										);
										contadorDeCond = 0;
										IsRegistradorContar = 0;
										IsEnderecoContar = 0;
										break;
									}
								} else {
									IsEnderecoContar += 1;
								}
							}
							if (IsEnderecoContar == EnderecoInstrucaoDado.length) {
								var AlertErrorColor = document.getElementById(
									"EntradaDeInstrucao"
								);
								AlertErrorColor.style = "border:2px solid red;";
								alert(
									"Ouve um erro na sua entrada, por favor revise o seu dado/instrução e adicione novamente!!"
								);
								contadorDeCond = 0;
								IsRegistradorContar = 0;
								IsEnderecoContar = 0;
								break;
							}
						} else {
							var AlertErrorColor = document.getElementById(
								"EntradaDeInstrucao"
							);
							AlertErrorColor.style = "border:2px solid red;";
							alert(
								"Ouve um erro na sua entrada, por favor revise o seu dado/instrução e adicione novamente!!"
							);
							contadorDeCond = 0;
							IsRegistradorContar = 0;
							IsEnderecoContar = 0;
							break;
						}
					}
				}
			}
		}
		if (contadorDeCond == Instrucoes.length) {
			if (
				parseInt(InstrucaoDecomposta[0]) == parseInt(InstrucaoDecomposta[0]) &&
				parseInt(InstrucaoDecomposta[0]) != NaN
			) {
				//adicionar e criar tag de dado
				var AlertErrorColor = document.getElementById("EntradaDeInstrucao");
				AlertErrorColor.style = "border:2px solid green;";
				DadosDeEntrada.push(valorDeInput);
				console.log(DadosDeEntrada);
				contadorDeEnderecosCompletos += 1;
				AdicionarComandoNaMemoria(contadorDeEnderecosCompletos, valorDeInput);
				contadorDeCond = 0;
				IsRegistradorContar = 0;
				IsEnderecoContar = 0;
			} else {
				var AlertErrorColor = document.getElementById("EntradaDeInstrucao");
				AlertErrorColor.style = "border:2px solid red;";
				alert(
					"Ouve um erro na sua entrada, por favor revise o seu dado/instrução e adicione novamente!!"
				);
				contadorDeCond = 0;
				IsRegistradorContar = 0;
				IsEnderecoContar = 0;
			}
		}
	}
}

function game() {
	ContadorDeEspacoPercorrido += 100;
	ObjectMov.setAttribute("cx", ContadorDeEspacoPercorrido);

	if (ContadorDeEspacoPercorrido == 1000) {
		clearInterval(intervalosDeChamandaDeFuncao);
		console.log("fim de jogo!!");
		ObjectMov.setAttribute("cx", 1200);
		ContadorDeEspacoPercorrido = 0;
	}
}

// Contador de espaço na memoria
function AdicionarComandoNaMemoria(id, Entrada) {
	ValorDeCadaTabela = document.getElementById("td" + id).innerText;
	if (ValorDeCadaTabela == "") {
		document.getElementById("td" + id).innerText = Entrada;
	}
}

function TrocarCorPorEndereco(id, cor) {
	ValorDeCadaTabela = document.getElementById("tr" + id);
	ValorDeCadaTabela.style.backgroundColor = cor;
}

function ExecutarPercursoEmAleatorio() { }

function DeixarMaiusculo() {
	document.getElementById("EntradaDeInstrucao").value = document
		.getElementById("EntradaDeInstrucao")
		.value.toUpperCase();
}
