# Projeto de Loja Virtual em Angular

Este projeto é uma loja virtual desenvolvida em Angular, utilizando Bootstrap para estilos e um banco de dados JSON servido pelo Json-server.

## Funcionalidades Implementadas

- Lista de produtos
- Carrossel de produtos populares
- Barra de pesquisa de produtos com sugestão de auto completar
- Sistema de cadastro e login de usuários
- Sistema de cadastro e login de vendedores
- Funcionalidades para vendedores:
    - Adicionar, editar/atualizar e excluir produtos
    - Atualização dinâmica da barra do header após o login
- Sistema de verificação de informações corretas ao logar/cadastrar usuários e vendedores
- Página de detalhes do produto
- Sistema de logout
- Implementação de header e footer
- Responsividade para diferentes dispositivos
- Avisos de mensagens em caso de falha no login por 3 segundos
- Proteção de rotas para vendedores, permitindo acesso e edição de produtos somente quando logados
- Armazenamento de dados no Local Storage

## Recursos Técnicos Utilizados

- Angular NgModule
- Observer e RxJS
- BehaviorSubject
- Local Storage para armazenamento de dados
- RouterGuard para proteção de rotas
- Serviços para manipulação de dados
- Interfaces para definição de tipos de dados
- Utilização de templates angulares no header (vendedor, usuário e padrão)

## O que falta

- Implementação do sistema de carrinho de compras
- Criação da página de finalização de compra

## Como Rodar o Projeto

1. Clone o repositório do projeto do Git.
2. Certifique-se de ter o Node.js e o npm instalados.
3. No terminal, navegue até a pasta do projeto e execute o seguinte código para instalar as dependências:

```bash
npm install
```

4. Instale o Json-server para testar o projeto:
    - Crie uma pasta fora do projeto.
    - Instale o Json-server globalmente executando o comando:

```bash
npm install -g json-server
```

## Como Configurar o Banco de Dados para Teste

Após a instalação do Json-server, siga as etapas abaixo para configurar o banco de dados de teste:

1. Crie um arquivo chamado `db.json`.
2. Abra o arquivo `db.json` e insira os seguintes endpoints:

```json
{
  "seller": [
    { }
  ],
  "product": [
    {
      "name": "Celular A51",
      "price": "1500",
      "color": "Preto",
      "category": "Celular",
      "image": "https://imgs.casasbahia.com.br/55058284/1g.jpg",
      "description": "Celular muito bom",
      "id": 1
    },
    // ...outros produtos
  ],
  "user": [
    { }
  ]
}
```

3. Execute o servidor Json-server no terminal com o seguinte comando, especificando o arquivo `db.json` e a porta desejada (nesse caso, 3001):

```bash
json-server --watch db.json --port 3001
```

4. Verifique o arquivo `environment.ts` dentro da pasta `src` do projeto para garantir que esteja configurado para rodar na mesma porta do servidor Json (neste caso, 3001).

5. Após essas etapas, execute o seguinte comando no terminal dentro da pasta do projeto para compilar e iniciar o servidor de desenvolvimento:

```bash
ng serve -o
```

Isso irá compilar e iniciar o projeto para teste.

