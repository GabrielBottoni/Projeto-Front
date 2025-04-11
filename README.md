# Mestre do Sabor 🍽️

[Acesse a aplicação na Vercel](https://projeto-mit-1.vercel.app/)

> **Este projeto foi desenvolvido como parte da prova da pós-graduação em Desenvolvimento Web.**

**Mestre do Sabor** é uma aplicação web moderna que simula uma loja de alimentos com autenticação de usuários e funcionalidades distintas para clientes e administradores. O projeto utiliza gerenciamento de estado global com Redux e comunicação com API utilizando Axios.

## Funcionalidades

### Autenticação
- Login obrigatório para acessar o sistema.
- Perfis distintos: **cliente** e **administrador**.
- Rotas protegidas com redirecionamento conforme o tipo de usuário.

### Área do Cliente
- Visualização dos produtos cadastrados.
- Adição e remoção de itens no carrinho.
- Carrinho persistente e controlado via Redux.

### Área Administrativa
- Todas as funcionalidades disponíveis ao cliente.
- Cadastro de novos produtos com imagem.
- Exclusão de produtos da loja.
- Atualização visual em tempo real dos produtos listados.

## Tecnologias Utilizadas

- **[React](https://reactjs.org/)** – Biblioteca principal da aplicação.
- **[Redux](https://redux.js.org/)** + **[React Redux](https://react-redux.js.org/)** – Gerenciamento de estado global.
- **[Axios](https://axios-http.com/)** – Comunicação com APIs externas.
- **[React Router](https://reactrouter.com/)** – Gerenciamento de rotas.
- **[Reactstrap](https://reactstrap.github.io/)** – Componentes visuais baseados em Bootstrap.
- **[localStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage)** – Simulação de persistência dos produtos.
- **[Vercel](https://vercel.com/)** – Hospedagem e deploy.

## Como Rodar Localmente

1. Clone o repositório: [https://github.com/GabrielBottoni/Projeto-Front.git]

2. Instale as dependências: npm install

3. Inicie o servidor de desenvolvimento: rpm run dev
