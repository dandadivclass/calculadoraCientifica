import { painelFuncoes, painelBotoes, funcoes, teclasCalculadora, atalhoFuncoes } from "./scripts/variaveisGlobais.js";
import { processarEntrada } from "./scripts/processarEntrada.js";

funcoes.forEach((tecla) => {
    const botao = document.createElement('button');
    botao.textContent = tecla;
    botao.classList.add('cor-funcao');
    painelFuncoes.appendChild(botao);
});

teclasCalculadora.forEach((tecla) => {
    const botao = document.createElement('button');
    botao.textContent = tecla;
    painelBotoes.appendChild(botao);
}); 

document.addEventListener('keydown', (evento) => {
    let tecla = evento.key;
    let acao = null;

    if (tecla === 'Enter') {
        acao = '=';
    } else if (tecla.toLowerCase() === 'd') {
        acao = 'C';
    } else if (tecla === 'Backspace') {
        acao = 'BACKSPACE';
    } else if (atalhoFuncoes[tecla.toLowerCase()]) {
        acao = atalhoFuncoes[tecla.toLowerCase()];
    } else if ((tecla >= '0' && tecla <= '9') || ['+','-','*','/','%','^','(',')','.','=','!'].includes(tecla)) {
        acao = tecla;
    }

    if (!acao) return;

    const botoes = painelBotoes.querySelectorAll('button');
    botoes.forEach(btn => {
        if (btn.textContent === acao.replace('(', '')) {
            btn.classList.add('ativo');
            setTimeout(() => btn.classList.remove('ativo'), 150);
        }
    });

    processarEntrada(acao);
});





