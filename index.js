const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const niveis = {
    "Ferro": [0, 9],
    "Bronze": [10, 20],
    "Prata": [21, 50],
    "Ouro": [51, 80],
    "Diamante": [81, 90],
    "Lendário": [91, 100],
    "Imortal": [101, Infinity]
};

function determinarNivel(vitorias) {
    for (const [nivel, [min, max]] of Object.entries(niveis)) {
        if (vitorias >= min && vitorias <= max) {
            return nivel;
        }
    }
    return "Desconhecido";
}

function perguntarContinuar() {
    return new Promise((resolve) => {
        rl.question("Deseja inserir mais dados? (s/n): ", (resposta) => {
            resolve(resposta.toLowerCase() === 's');
        });
    });
}

async function calcularRanqueadas() {
    let continuar = true;

    while (continuar) {
        const vitoriasInput = await new Promise((resolve) => {
            rl.question("Digite a quantidade de vitórias: ", resolve);
        });

        const derrotasInput = await new Promise((resolve) => {
            rl.question("Digite a quantidade de derrotas: ", resolve);
        });

        let vitorias = parseInt(vitoriasInput);
        let derrotas = parseInt(derrotasInput);

        if (isNaN(vitorias) || isNaN(derrotas)) {
            console.log("Por favor, insira números válidos para vitórias e derrotas.");
        } else {
            let saldoVitorias = vitorias - derrotas;
            let nivel = determinarNivel(vitorias);
            console.log(`O Herói tem um saldo de ${saldoVitorias} e está no nível de ${nivel}.`);
        }

        continuar = await perguntarContinuar();
    }

    console.log("Obrigado por usar a calculadora de partidas ranqueadas!");
    rl.close(); 
}

calcularRanqueadas();
