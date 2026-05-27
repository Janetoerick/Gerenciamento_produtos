# Gerenciador de Produtos

Este é um sistema completo para gerenciamento de produtos, desenvolvido com uma arquitetura dividida em um ecossistema Back-end, um Front-end responsivo e persistência de dados isolada. 
O ambiente é totalmente conteinerizado utilizando Docker para garantir consistência.

---

## Tecnologias Utilizadas

### **Front-end**
* **Angular**
* **TypeScript**
* **Bootstrap**
* **Bootstrap Icon**

### **Back-end**
* **Java 17**
* **Spring Boot**
* **Spring Data JPA**
* **Hibernate**

### **Banco de Dados & Infraestrutura**
* **MySQL 8.0**
* **Docker & Docker Compose**

---

## Como Instalar
### Pré-requisitos
Antes de começar, certifique-se de ter instalado e configurado em sua máquina os seguintes componentes:
* **Git**: Para clonagem e controle de versão do repositório.
* **Docker (Versão 20.10+)**: Para criação e execução dos contêineres isolados.
* **Docker Compose (Versão 2.0+)**: Para gerenciamento da arquitetura multi-container, redes e volumes.
  
### Passo 1: Clonar o Repositório
Abra o seu terminal e execute o comando abaixo para clonar o projeto:
```bash
git clone https://github.com/Janetoerick/Gerenciamento_produtos.git
```

### Passo 2: Navegar até a Raiz do Projeto
```bash
cd /Gerenciamento_produtos
```
### Passo 3: Subir a Infraestrutura Completa via Docker Compose
Para compilar e iniciar o banco de dados, o backend e o frontend de uma única vez em segundo plano, execute:
```bash
docker compose up -d --build
```
A partir desse ponto a aplicação já estará funcional e pronta para ser usada.

---

## Execução Manual (Modo Desenvolvimento)
Existe também a opção de executar cada serviço manualmente de forma local e isolada.

### Pré-requisito Obrigatório para o backend
O backend (Spring Boot) depende obrigatoriamente do banco de dados para ser iniciado. Portanto, antes de rodar o Java ou o Angular manualmente, você precisa subir o container do MySQL:
```bash
docker compose up -d db
```
### Como rodar o backend (isoladamente)
Graças às variáveis de ambiente dinâmicas com fallback (${VARIAVEL:valor_padrao}) configuradas no arquivo application.properties, 
você pode rodar o Java diretamente sem alterar nenhuma linha de configuração:

1. Certifique-se de que o container do banco está ativo (`docker compose up -d db`).
2. Abra a pasta do backend na sua IDE de preferência (VS Code, IntelliJ, Eclipse).
3. Execute a classe principal (@SpringBootApplication). O Spring Boot detectará que está fora do contêiner e se conectará automaticamente e de forma segura ao banco em localhost:3307.

### Como rodar o frontend (isoladamente)
Caso queira rodar localmente o frontend da aplicação sem subir via docker, é possível também.

1. Abra a pasta do frontend no projeto `\front_end_gerencia_produtos`
2. Inicialize o servidor Angular `ng serve` (Certifique-se de ter todas as dependência necessárias instaladas)

---

## Como acessar a aplicação
Com os serviços iniciados, abra o seu navegador de preferência e utilize os seguintes endereços locais:
* Interface Web (Front-end Angular): http://localhost:8081
* Serviço de API (Back-end Spring Boot): http://localhost:8080
* Acesso Direto ao MySQL: Host `localhost`, Porta `3307` (Usuário: `dev_user` / Senha: `dev_password`)

---

## Rotas da API
Abaixo estão listados os principais endpoints expostos pelo Back-end para o gerenciamento de produtos (Base URL: http://localhost:8080):

| Método | Endpoint | Descrição | Parâmetros / JSON
| --- | --- | --- | --- 
| GET    | `/products` | Recupera a lista completa de produtos. | -
| GET    | `/products/{id}` | Busca o produto com o id. | -
| GET    | `/products/filter` | Busca paginada e filtrada de produtos. | Parâmetros de URL: `?page=0&size=20`
| POST    | `/products` | Adiciona um novo produto. | `{"name": String, "category": String, "price": number, "description": String}`
| PUT    | `/products/{id}` | Atualiza um produto. | `{"name": String, "category": String, "price": number, "description": String, "active": boolean}`
| DELETE    | `/products/{id}` | Deleta um produto via id. | -

---

## Observações

* **Persistência Segura:** O volume do banco está mapeado localmente como `mysql_data`.
Parar o ambiente com docker compose down não apaga os dados. Os dados só serão limpos se explicitamente rodar `docker compose down --volumes`.
* **Configuração de CORS:** Se optar por motivo diverso alterar a porta do frontend(8081) modifique o
@CrossOrigin(origins = "http://localhost:8081") no controller do backend para evitar o bloqueio de requisições pelo navegador.
* **Velocidade de Inicialização:** O contêiner do MySQL pode demorar um pouco mais para ser inicializado do que os demais containers de backend e frontend.
Caso dê erro de persistência de dados espere mais alguns segundos até o serviço do MySQL inicializar completamente.

---

# Autor
* **Janeto Erick da Costa Lima**
