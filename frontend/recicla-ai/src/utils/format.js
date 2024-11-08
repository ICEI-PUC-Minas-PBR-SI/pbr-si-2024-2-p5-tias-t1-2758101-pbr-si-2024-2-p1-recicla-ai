export const formatPhoneNumber = (input) => {
    const cleanedInput = input.replace(/\D/g, "");

    const match = cleanedInput.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return cleanedInput.length > 2 ? `(${cleanedInput.slice(0, 2)}) ${cleanedInput.slice(2)}` : cleanedInput;
};

export const formatCnpj = (input) => {

    const onlyNumbers = input.replace(/\D/g, "");

    return onlyNumbers
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/\/(\d{4})(\d)/, "/$1-$2")
        .slice(0, 18);

};

export const formatCPF =(input) => {
    input = input.replace(/\D/g, '');
  
    return input.replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export const formatNoDots = (input) => {

    return input.replace(/[^\d]/g, "");

}