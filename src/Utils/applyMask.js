export const applyMask = (value, maskId) => {
    const MASKS = {
        cep: [/(^\d{5})(\d{3}$)/, "$1-$2"],
        telefone: [/(^\d{2})(\d{4})(\d{4}$)/, "($1) $2-$3"],
        celular: [/(^\d{2})(\d{5})(\d{4}$)/, "($1) $2-$3"],
        cpf: [/(^\d{3})(\d{3})(\d{3})(\d{2}$)/, "$1.$2.$3-$4"]
    };

    if (MASKS[maskId]) {
        return value.replace(MASKS[maskId][0], MASKS[maskId][1]);
    }

    return value; // Retorna o valor inalterado se não houver máscara correspondente.
};