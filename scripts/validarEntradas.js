export function validaOperador(operador) {
    return ['+','-','*','/','%','^'].includes(operador);
}

export function validaDigito(digito) {
    return (digito >= '0' && digito <= '9') || digito === '.';
}

export function ultimoNumeroContemPonto() {
    const partes = elementoVisor.value.split(/[^\d.]/);
    const ultimo = partes[partes.length - 1];
    return ultimo.includes('.');
}