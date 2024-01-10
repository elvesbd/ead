export const notificationMessages = {
  required: (key: string) => `${key} é obrigatório!`,
  empty: (key: string) => `${key} não pode ser vazio!`,
  minLength: (length: number, key: string) =>
    `${key} não pode ter menos que ${length} caracteres!`,
  maxLength: (length: number, key: string) =>
    `${key} não pode ter mais que ${length} caracteres!`,
  number: (key: string) => `${key} deve ser um número válido!`,
  string: (key: string) => `${key} deve ser do tipo string!`,
  regex: (key: string) => `${key} não corresponde ao padrão esperado!`,
  email: (key: string) => `${key} deve ser um endereço de e-mail válido!`,
  uuid: (key: string) => `${key} deve ser um uuid válido!`,
  cpf: (key: string) => `${key} deve ser um cpf válido`,
  negative: (key: string) => `${key} não pode ser um número negativo!`,
};
