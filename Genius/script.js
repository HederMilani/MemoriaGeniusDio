let order = [];     // Definir array vazio para a ordem que deverá clicar os campos
let clickedOrder = [];  //Definir array para guardar a ordem dosa clicks
let score = 0;      //Variavel para armazenar a pontuação do jogo

/*
    Definir numeração para cada cor
    0 - Verde
    1 - Vermelho
    2 - Amarelo
    3 - Azul
*/

//Definir as classes do CSS como variavel
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

let shuffleOrder = () => {      //Função para definir o numero aleatório por rodada
    let colorOrder = Math.floor(Math.random() * 4);     //Randomizar um número entre 0 e 4 já arredondado para inteiro
    order[order.length] = colorOrder;       //Atribuindo o valor randomico ao array de ordem
    clickedOrder = [];      //Definir o array de clicks como vazio para cada rodada

    //Loop para definir a cor de cada item na ordem
    for(let i in order) {
        let elementColor = createElementColor(order[i]);
        lightColor(elementColor, Number(i) + 1); //Chamada da função que ira acender a cor na tela
    }
}

//Função para acender cores na tela
let lightColor = (element, number) => {
    number = number * 500;          //Definir o tempo 
    setTimeout(() => {          //Definir tempo acesso
        element.classList.add('selected');      //Definir a classe do CSS
    }, number - 250);
    setTimeout(() => {          //Definir o tempo para apagar a cor
        element.classList.remove('selected');
    });
}

//Função para conferir a ordem com os clickes
let checkOrder = () => {
    //Realizar a checagem em cada item do array de click
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            //Caso os fvalores seja diferentes chamar função para finalizar o jogo
            gameOver();
            break;
        } 
    }
    //Verificar se as quantidades dos arrayes são iguais
    if(clickedOrder.length == order.length) {
        //apresentar na tela a pontuação
        alert(`Pontuação: ${score}!\nVocê acertou. Iniciando o próximo nivel.`)
        //Função para chamar próximo nivel
        nextLevel();
    }
}

//Função para capturar o click
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;      //Receber a cor conforme clique
    createElementColor(color).classList.add('selected');      //Acender a cor no momento do click

    //Set time para apagar a cor
    setTimeout(() => {
        createElementColor(color).classList.remove('selected');
    });

    //Realizar a coinferencia após o click
    checkOrder();
}

//Criar função que retorna a cor
let createElementColor = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if(color == 2) {
        return yellow;
    } else if(color == 3) {
        return blue;
    }
}

//Função para iniciar o próximo nivel
let nextLevel = () => {
    score ++;           //Somar ponto 
    shuffleOrder();     //Chamar função de nova cor
}

//Função de game over
let gameOver = () => {
    alert(`Pontuação: ${score}!\n Você perdeu o jogo.\nClique em OK para iniciar um novo.`)
    //Zerar os arrays de controle
    order = [];
    clickedOrder = [];
    //Iniciar novo jogo
    playGame();
}

//Função para iniciar o jogo
let playGame = () => {
    alert('Bem vinco ao Genius!!!')
    score = 0;          //Zerar pontuação
    nextLevel();
}

