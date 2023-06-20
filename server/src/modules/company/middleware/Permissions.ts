export const adminPermissions = [
  //! permissões para empresas
  'create:company', //? (Criar empresa)
  'read:company', //? (Ler informações da empresa)
  'update:company', //? (Atualizar informações da empresa)
  'delete:company', //? (Excluir empresa)
  //! permissões para usuários
  'create:company-user', //? (Criar usuário da empresa)
  'read:company-user', //? (Ler informações do usuário da empresa)
  'update:company-user', //? (Atualizar informações do usuário da empresa)
  'delete:company-user', //? (Excluir usuário da empresa)
];
export const userCompanyPermissions = [
  //! permissões para empresas
  'read:company', //? (Ler informações da empresa)
  'read:company-user', //? (Ler informações do usuário da empresa)
  'update:company-user', //? (Atualizar informações do usuário da empresa)
  //! permissões para unidades da empresa
  'create:company-unit', //? (Criar unidade da empresa)
  'read:company-unit', //? (Ler informações da unidade da empresa)
  'update:company-unit', //? (Atualizar informações da unidade da empresa)
  //! permissões para ativos da unidade da empresa
  'create:unit-active', //? (Criar ativo da unidade da empresa)
  'read:unit-active', //? (Ler informações do ativo da unidade da empresa)
  'update:unit-active', //? (Atualizar informações do ativo da unidade da empresa)
  'delete:unit-active', //? (Excluir ativo da unidade da empresa)
];
