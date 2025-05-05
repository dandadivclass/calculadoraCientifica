import { elementoVisor, estado } from "./variaveisGlobais.js";
import { validaDigito, validaOperador, ultimoNumeroContemPonto } from "./validarEntradas.js";
import { avaliarExpressao } from "./avaliarExpressao.js";

export function processarEntrada(entrada) {
    if (estado.resultadoExibido) {
        if (validaDigito(entrada) || entrada.endsWith('(')) {
            elementoVisor.value = '';
        }
        estado.resultadoExibido = false;
    }

    if (entrada === 'C') {
        elementoVisor.value = '';
        return;
    }
    if (entrada === 'BACKSPACE') {
        elementoVisor.value = elementoVisor.value.slice(0, -1);
        return;
    }

    if (entrada === '=') {
        try {
            elementoVisor.value = avaliarExpressao(elementoVisor.value);
        } catch {
            elementoVisor.value = 'Erro';
        }
        estado.resultadoExibido = true;
        return;
    }

    if (entrada === '.' && ultimoNumeroContemPonto()) return;

    const ultimo = elementoVisor.value.slice(-1);
    if (validaOperador(entrada) && (!elementoVisor.value || validaOperador(ultimo))) return;

    elementoVisor.value += entrada;
}
