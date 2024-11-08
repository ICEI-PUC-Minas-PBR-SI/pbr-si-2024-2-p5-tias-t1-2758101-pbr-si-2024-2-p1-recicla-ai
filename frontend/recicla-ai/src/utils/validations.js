export const validateCpf = (cpf) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
};

export const validateCnpj = (cnpj) => {
    const regexCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return regexCnpj.test(cnpj);
};

export const validatePhoneNumber = (phoneNumber) => {
    const formattedRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    const unformattedRegex = /^\d{11}$/;
    return formattedRegex.test(phoneNumber) || unformattedRegex.test(phoneNumber);
};