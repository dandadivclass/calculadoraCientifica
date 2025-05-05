export function calcularFatorial(numero) {
    let x = parseInt(numero);
    if (x < 0) return NaN;
    let f = 1;
    for (let i = 2; i <= x; i++) f *= i;
    return f;
}