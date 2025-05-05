import { calcularFatorial } from "./fatorial.js";

export function avaliarExpressao(expressao) {
    let posicaoAtual = 0;
    const proximoCaractere = () => expressao[posicaoAtual];
    const consumirCaractere = () => expressao[posicaoAtual++];

    function lerNumeroDecimal() {
        let numeroStr = '';
        let pontoDecimalUsado = false;
        while ((proximoCaractere() >= '0' && proximoCaractere() <= '9') || (!pontoDecimalUsado && proximoCaractere() === '.')) {
            if (proximoCaractere() === '.') pontoDecimalUsado = true;
            numeroStr += consumirCaractere();
        }
        return parseFloat(numeroStr);
    }

    function lerFatorPrimario() {
        if (proximoCaractere() === '(') {
            consumirCaractere();
            let valor = lerExpressaoCompleta();
            consumirCaractere();  
            return valor;
        }
        if (proximoCaractere() >= 'a' && proximoCaractere() <= 'z') {
            let nomeFuncao = '';
            while (proximoCaractere() >= 'a' && proximoCaractere() <= 'z') {
                nomeFuncao += consumirCaractere();
            }
            consumirCaractere();  
            let argumento = lerExpressaoCompleta();
            consumirCaractere(); 
            return {
                sin: Math.sin,
                cos: Math.cos,
                tan: Math.tan,
                sqrt: Math.sqrt
            }[nomeFuncao](argumento);
        }

        let valor = lerNumeroDecimal();
        if (proximoCaractere() === '!') {
            consumirCaractere();
            return calcularFatorial(valor);
        }

        if (proximoCaractere() === '%') {
            consumirCaractere();
            return valor / 100;
        }

        return valor;     
    }

    function lerComPotencia() {
        let base = lerFatorPrimario();
        while (proximoCaractere() === '^') {
            consumirCaractere();
            base = Math.pow(base, lerFatorPrimario());
        }
        return base;
    }

    function lerTermoMultiplicativo() {
        let valor = lerComPotencia();
        while (['*', '/', '%'].includes(proximoCaractere())) {
            let operador = consumirCaractere();
            let proximoValor = lerComPotencia();
            if (operador === '*') {
                valor *= proximoValor;
            } else if (operador === '/') {
                valor /= proximoValor;
            } else {
                valor = valor * (proximoValor / 100);
            }
        }
        return valor;
    }

    function lerExpressaoCompleta() {
        let valor = lerTermoMultiplicativo();
        while (['+', '-'].includes(proximoCaractere())) {
            let operador = consumirCaractere();
            let proximoTermo = lerTermoMultiplicativo();
            valor = operador === '+' ? valor + proximoTermo : valor - proximoTermo;
        }
        return valor;
    }

    return lerExpressaoCompleta();
}