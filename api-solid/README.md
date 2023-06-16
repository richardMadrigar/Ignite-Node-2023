# App

Gympass style app

## RFs (Requisitos funcionais)

- funcionalidades do app

- [ ] Deve ser possivel se cadastrar
- [ ] Deve ser possivel autencticar
- [ ] Deve ser possivel obter o perfil de um usuário logado
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuário logado
- [ ] Deve ser possivel o usuário seu hitorico de check-ins
- [ ] Deve ser possivel o usuário buscar academia proximas
- [ ] Deve ser possivel o usuários buscar ademias pelo nome
- [ ] Deve ser possivel o usuários realizar check-in em uma academia
- [ ] Deve ser possivel validar o check-in de um usuário
- [ ] Deve ser possivel cadastrar uma academia;

## RNs (Regras de nogocio)

- [ ] O usario não pode se cadastrar com um email duplicado;
- [ ] O usario não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuario não pode fazer check-in se estiver perto(100m) da academia;
- [ ] O check-in só pode ser validade ate minutos apos criado;
- [ ] O check-in só pode ser valido por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuario precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em banco postgres
- [ ] Todas listas de dados precisam estar paginas com 20 por pagina
- [ ] O usuario de deve ser identificado com JWT (JSON WEB TOKEN)

