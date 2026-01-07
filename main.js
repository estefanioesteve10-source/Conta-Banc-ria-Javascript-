const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let contas = [];

// ===== FUNÇÕES AUXILIARES =====

function gerarIBAN() {
  let base = "EF1000050000";
  let resto = "";
  for (let i = 0; i < 9; i++) {
    resto += Math.floor(Math.random() * 10);
  }
  return base + resto;
}

function menuPrincipal() {
  console.log(`
========= MENU BANCÁRIO =========
1 - Depósito
2 - Consulta
3 - Levantamento
4 - Criar Conta
5 - Todas as Contas
0 - Sair
================================
`);
  rl.question("Escolha uma opção: ", opcao => {
    switch (opcao) {
      case "1":
        deposito();
        break;
      case "2":
        consulta();
        break;
      case "3":
        levantamento();
        break;
      case "4":
        criarConta();
        break;
      case "5":
        listarContas();
        break;
      case "0":
        console.log("Obrigado por usar o sistema bancário!");
        rl.close();
        break;
      default:
        console.log("Opção inválida!");
        menuPrincipal();
    }
  });
}

function voltarMenu() {
  rl.question("\n1 - Voltar | 2 - Menu Principal: ", op => {
    if (op === "2") menuPrincipal();
    else voltarMenu();
  });
}

// ===== OPERAÇÕES =====

function criarConta() {
  rl.question("Nome do titular: ", nome => {
    let iban = gerarIBAN();
    contas.push({
      nome,
      iban,
      saldo: 0
    });

    console.log("\nConta criada com sucesso!");
    console.log(`Nome: ${nome}`);
    console.log(`IBAN: ${iban}`);
    console.log(`Saldo: ${0} Kz`);

    voltarMenu();
  });
}

function consulta() {
  rl.question("Digite o Nome ou IBAN: ", dado => {
    let conta = contas.find(
      c => c.nome === dado || c.iban === dado
    );

    if (!conta) {
      console.log("Conta não encontrada!");
    } else {
      console.log(`
====== DADOS DA CONTA ======
Nome: ${conta.nome}
IBAN: ${conta.iban}
Saldo: ${conta.saldo} Kz
============================
`);
    }
    voltarMenu();
  });
}

function deposito() {
  rl.question("Nome do titular: ", nome => {
    rl.question("IBAN: ", iban => {
      let conta = contas.find(
        c => c.nome === nome && c.iban === iban
      );

      if (!conta) {
        console.log("Conta não encontrada!");
        voltarMenu();
        return;
      }

      rl.question("Valor a depositar: ", valor => {
        valor = Number(valor);
        if (valor <= 0) {
          console.log("Valor inválido!");
        } else {
          conta.saldo += valor;
          console.log("Depósito realizado com sucesso!");
        }
        voltarMenu();
      });
    });
  });
}

function levantamento() {
  rl.question("Nome do titular: ", nome => {
    rl.question("IBAN: ", iban => {
      let conta = contas.find(
        c => c.nome === nome && c.iban === iban
      );

      if (!conta) {
        console.log("Conta não encontrada!");
        voltarMenu();
        return;
      }

      rl.question("Valor a levantar: ", valor => {
        valor = Number(valor);
        if (valor <= 0 || valor > conta.saldo) {
          console.log("Saldo insuficiente ou valor inválido!");
        } else {
          conta.saldo -= valor;
          console.log("Levantamento realizado com sucesso!");
        }
        voltarMenu();
      });
    });
  });
}

function listarContas() {
  if (contas.length === 0) {
    console.log("Nenhuma conta cadastrada.");
  } else {
    console.log("\n===== LISTA DE CONTAS =====");
    contas.forEach((c, i) => {
      console.log(`
Conta ${i + 1}
Nome: ${c.nome}
IBAN: ${c.iban}
Saldo: ${c.saldo} Kz
---------------------------`);
    });
  }
  voltarMenu();
}

// ===== INICIAR =====
menuPrincipal();

