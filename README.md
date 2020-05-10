<h1>Projeto App Descontração</h1>

<h2>Configurando ambiente</h2>
<p>Versão do nodejs para o projeto é a 12.9.0 pois o Expo está com bug em outras versões</p>
<p>Instalar o Expo CLI siga as instruções oficiais da comunidade <a href="https://reactnative.dev/docs/environment-setup">Expo react-native</a></p>

<h2>Gerando uma APK</h2>
<p>Deve ter em sua máquina os arquivos SDK do android studio disponiveis na variavel de ambiente do seu Sistema Operacional</p>
<p>O java/jdk deve estar exposto também em sua variavel de ambiente!</p>
<p>Para gerar uma APK de Debug ou Produção deve se ter uma chave gerada pelo JDK do java 1.8+!</p>
<h2>Testando Local</h2>
<p>O Expo gera um QR Code que permite testar via Smartphone, deve apenas baixar e instalar o Aplicativo Expo no seu celular e scanear o QR Code</p>
<p>Caso queira testar em simulador da máquina é preciso baixar o Android Studio e configurar um dispositivo para ser exposto em sua variavel de ambiente do Sistema operacional</p>
<p>Lembrando que a API que este aplicativo consulta é a mais generica possivel, podendo ser substituida facilmente dentro da pasta src/api onde acontece as requisições para a API</p>

<h2>API Consumida</h2>
<p>Como exemplo de API para este app deve se criar uma que atenda os seguintes requisitos abaixo: (Lembrando que esta é uma API de exemplo, podendo ser substituida por outra, realizando as alterações necessárias)</p>

<h1>API Para simular no APP</h1>

# API Instalura
## Execução
Para executar a API, basta acessar a pasta raiz `instalura-api` pelo terminal e executar os comandos a seguir para instalar as dependências e iniciar a API, respectivamente:
```
npm install
npm start
```
Logo após, a API rodará em `http://localhost:3030`.
## Endpoints
### Criação de novo usuário
```
- REQUEST
[POST] http://localhost:3030/users/signup
[BODY]
{
    userName: 'usuario1',
    password: 'abc123',
    userProfilePhotoUrl: 'http://usuario1.com.br'
}
[HEADERS]
{
    Content-type: 'application/json'
}

- RESPONSE
[SUCESSO]
    [STATUS] 204

[ERRO]
    [STATUS] 50x
    [BODY]
        {
            message: 'Mensagem de erro...'
        }
```
O campo `userName` deve conter o valor do campo login, `password` a senha e `userProfilePhotoUrl` a URL do perfil do novo usuário. Campos esses encontrados no formulário de cadastro de usuários na aplicação Instalura.

### Login
```
- REQUEST
[POST] http://localhost:3030/users/login
[BODY]
{
    userName: 'usuario1',
    password: 'abc123'
}
[HEADERS]
{
    Content-type: 'application/json'
}

- RESPONSE
[SUCESSO]
    * Autenticado
        [STATUS] 200
        [BODY]
        {
            id: 1,
            name: 'usuario1'
        }
        [HEADERS]
        {
            x-access-token: 'jviorwnjinwn241'
        }

    * Não Autenticado
        [STATUS] 401
        [BODY]
        {
            message: 'Falha na autenticação do usuário usuario1!'
        }
        
[ERRO]
    [STATUS] 50x
    [BODY]
    {
        message: 'Mensagem de erro...'
    }
```
O cabeçalho `x-access-token` devolvido é o cabecalho que deve ser trafegado após o login para que a API reconheça o usuário.

### Listagem de fotos
```
- REQUEST
[GET] http://localhost:3030/:userName/photos
[HEADERS]
{
    x-access-token: 'jviorwnjinwn241'
}

- RESPONSE
[SUCESSO]
    [STATUS] 200
    [BODY]
    [
        {
            allowComments: false,
            comments: 0,
            description: "comentario da foto",
            id: 2,
            likes: 0,
            postDate: "2018-02-13T12:30:25.000Z",
            url: "https://instagram.fcgh9-1.fna.fbcdn.net/t51.2885-15/e35/15276770_381074615568085_8052939980646907904_n.jpg?ig_cache_key=MTM5ODY4MDMyNjYyMDA1MDE4OQ%3D%3D.2",
            userId: 1
        }
    ]
[ERRO]
    [STATUS] 50x
    [BODY]
    {
        message: 'Mensagem de erro...'
    }
```
O retorno da requisição é um *array* com a listagem de fotos do usuário cujo `userName` foi informado na URL da requisição com o *path param* `:userName`.
### Remoção de fotos
```
- REQUEST
[DELETE] http://localhost:3000/photos/:photoId
[HEADERS]
{
    x-access-token: 'jviorwnjinwn241'
}

- RESPONSE
[SUCESSO]
    * Sucesso na remoção
        [STATUS] 200
    
    * Foto não existente
        [STATUS] 404
        [BODY]
        {
            message: 'Foto não existe!'
        }
    
    * Usuário não autorizado para exclusão
        [STATUS] 403
        [BODY]
        {
            message: 'Forbidden: Sem autorização para a operação!'
        }
    
[ERRO]
    [STATUS] 50x
    [BODY]
    {
        message: 'Mensagem de erro...'
    }
```
O *path param* `:photoId` passado na URL deve ser o ID da foto a ser excluída e é obrigatório a passagem do cabecalho `x-access-token`.