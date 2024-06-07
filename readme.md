# MOBILE APPLICATION DEVELOPMENT

### Telas

* Login
* Cadastro
* Recuperação de Senha
* Principal(Usuário)
* Principal(Empresa)
* Verificar(Usuário/Empresa)
* Sobre + Logout

##  Sobre as telas: 

1. Login
    1. Firebase autenticação
2. Cadastro 
    1. Cadastro para usuário (Empresa deverá entrar em contato para receber status de empresa)
3. Recuperação de Senha
    1. Não implementado a recuperação, é apenas visual
4. Principal 
    1. **Usuário:** App de câmera para o usuário fazer a fotografia do foco de sujeira
    2. o foco será adicionado ao banco de dados pelo backend com o uso do fastapi
    3. após a validação da API criada pelo **roboflow** para uso do nosso **modelo treinado**
    4. **Empresa:** Será um formulário de limpeza de foco que o funcionário vai passar o id do foco, nome da empresa, e seu nome
    5. (utilizamos apenas o id do foco para exclusão por enquanto), backend usando a api do fastapi.
5. Verificar
    1. **Usuário:** Ele verá a posição própria pelo uso do component mapView e marker, utilizando a latitude e longitude do individuo
    2. **Empresa:** Será renderizado focos de até 10 unidades (Valor estratosferico com o objetivo de engrandecer o mvp e deixar o programador que vos escreve feliz de ver marcações no mapa) de distância do funcionário, sendo condizentes com suas posições, demonstrando id e nome de cada foco, o nome é o nome do usuário que validou o foco.
6. Sobre + Logout
    1. Status sobre o usuário ou funcionário sendo relativos a nome, localização, status, email.
    2. Botão de logout que volta para tela inicial e limpa o asyncStorage.



##  Endpoints: 

Backend: Feito por FastAPI integrada com SQL com o cx_oracle

Não consegui subi pelo render, pois estava dando erro com o instant-client

que pesa mais que, enfim, não cabe nem no repo do github

-------------------------------------------------------------------

1.  iplocal:8080/criar_foco/latitude/longitude/nome ---------------------------  POST 
    1. cria o foco utilizando a latitude/longitude/nome do individuo tendo validação do modelo de ia
2.  iplocal:8080/focos/latitude/longitude --------------------------------------- GET
    1. lista os focos conforme a latitude do funcionário da empresa com a precisão de 10 unidades de latitude ou inferior de distância
3. iplocal:8080/deletar_foco/id_do_foco -----------------------------------------DELETE
    1. deleta os focos pelo id, só quem pode usar são os funcionários
4. https://detect.roboflow.com/lixo-na-praiaa/2
    1. conecta com o modelo de previsão que possui a capacidade de detectar lixo, permitindo a criação de foco do usuário


----------------------------

##  Links para o repositório:

Mobile: https://github.com/gutodidonato/Global-mobile

Backend: Será enviado do github

Tentativa frustrada de enviar o backend para o render:
https://backnew-gs.onrender.com




---------------------------------------
##  Logins:


gabriellhernandesd@gmail.com
17062005


email@email.com
12345678


---------------------------------------
##  OBS:

para rodar o backend e o front: é necessário utilizar o seu ipv4, altere o meu
e é necessário instalar o instant_client/ instalar os modulos do requirements

