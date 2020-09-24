# Tetris
![[logo11]()](misc/img/logo.jpg)

## Integrantes
* Victor Hugo Meirelles Silva (vhms)
* Victor Miguel de Morais Costa (vmmc2)
* Zilde Souto Maior Neto (zsmn)

## Objetivo
* O presente repositório consiste na implementação de um jogo Tetris, que faz parte de um Hackenge (Hackathon + Challenge) proposto na disciplina de Engenharia de Software (IF-977). Essa atividade busca fazer com que a equipe possa exercitar o trabalho em equipe enquanto expande seus conhecimentos a respeito de ferramentas como: JavaScript, CSS, HTML e métodos de deploy (como GitHub Pages ou Heroku).

## Link para o Jogo
https://tetris-ess.herokuapp.com

## Link para o post sobre o desenvolvimento no LinkedIn
https://www.linkedin.com/feed/update/urn:li:activity:6714362975941103616/

## Tecnologias Utilizadas no Desenvolvimento
* JavaScript
* CSS
* HTML
* Bulma (https://bulma.io/)
* SweetAlert (https://sweetalert.js.org/guides/)
* Heroku 


## Desafios Enfrentados
### Falta de conhecimento sobre programação Web
* Os participantes do grupo não possuiam nenhum conhecimento prévio a respeito de tecnologias Web (JavaScript, HTML, CSS), sendo assim isso já foi um grande desafio dado o prazo de entrega e a necessidade de aprender o básico sobre essas ferramentas.
### Inexperências com ferramentas de deploy (Heroku ou GitHub Pages)
* Nenhum dos membros da equipe tinha feito um deploy de página antes. Devido a isso, foi necessário despender tempo procurando formas de realizar esse deploy da maneira apropriada.
### Desafios de Implementação
#### Problemas na rotação da peça
* Enquanto desenvolviamos a movimentação dos blocos com as teclas, tivemos problemas com a tecla de rotação. Especialmente, quando o jogador tentava realizar uma rotação na borda do grid: Enquanto que no vídeo esse tipo de colisão não era abordado, notamos esse problema e procuramos uma maneira de corrigi-lo: fizemos a rotação e salvamos as posições das peças em uma variável auxiliar e verificamos se a peça mais a esquerda se mantinha mais a esquerda, dessa forma conseguimos garantir que caso isso não ocorresse é porque haviamos detectado colisão lateral, evitando ter que colocar blocos laterais para colisão.
#### Problemas para realizar a animação de quebra de linha
* Queríamos fazer um efeito "emocionante" assim que uma linha fosse completa, mas infelizmente devido aos eventos que estávamos usando serem assíncronos, não conseguimos fazer pausas durante eles para dar espaço a uma animação dos blocos sendo removidos lentamente. Para isso, foi criado um outro setInterval(), responsável por fazer uma parte da animação em questão a cada repetição.
#### Problemas para conseguir estilizar a página HTML do jogo com o CSS
* Dado a nossa experiência nula em CSS e HTML, essa parte de realizar a estilização foi bem complicada. Primeiro para entender como tudo funciona (com a questão das tags e como o HTML se linka ao CSS) e depois para realizar as modificações que nós queriamos realizar para deixar o site o mais agradável possível. Diante disso, optamos por utilizar um framework de CSS chamado Bulma. Escolhemos esse framework pelos seguintes motivos: Documentação abragente, visual elegante, fácil instalação, curva de aprendizado curta e falta de necessidade de fazer linkagens com o JavaScript.


## Capturas de Tela
![[scap1]()](misc/img/screenshot2.png)
![[scap2]()](misc/img/screenshot3.png)
