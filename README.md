# WebBot - Dados públicos CNPJ

Este bot localiza uma sequencia de caracteres através de regex para criar uma lista de arquivos '.zip' para serem baixados, os downloads são efetuados via wget em um ambiente docker. Caso o contêiner seja encerrado ou a conexão interrompida será possível continuar do ponto de parada assim que o serviço for restabelecido.

# Dependências
    - Docker
# Execução
    - 1 - No diretório do projeto execute o comando:

        $ docker build . -t approbocnpj:1.0 
        
        esse comando criara a imagem docker
    - 2 - Execute o comando:

        $ mkdir -p files && docker run --volume $(pwd)/files:/app/files \
            --env URL=https://receita.economia.gov.br/orientacao/tributaria/cadastros/cadastro-nacional-de-pessoas-juridicas-cnpj/dados-publicos-cnpj \
            --rm -it approbocnpj:1.0


        "mkdir -p files" garante que o diretório esteja criado e 
        "docker run --volume $(pwd)/files:/app/files \
            --env URL=https://receita.economia.gov.br/orientacao/tributaria/cadastros/cadastro-nacional-de-pessoas-juridicas-cnpj/dados-publicos-cnpj \
            --rm -it approbocnpj:1.0" com esse comando você está executando o container e salvando os arquivos no diretório "files", é importante que você não esqueça de colocar a variável de ambiente "URL".
 <iframe width="560" height="415"
    src="https://youtu.be/5Q5OZyI0utw" 
    frameborder="1" 
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>

# Motivações
    - .Js ao invés de .sh, .ps1 ou .py? 
        Sim, pois eu quis assim!
    - Wget?
        wget é um utilitário simples mas eficiente para download, roda nas grandes plataformas de sistemas operacionais (Microsoft Windows,macOs, linux e freeBSD). Mas a possíbilidade de limitar a banda consumida para baixar arquivos e conseguir retomar downloads interrompidos com argumentos simples, foram os pontos determinantes para essa escolha. 
        Mas o maior motivo foi "Porque eu quis!".

# Sem pretenção de ser uma aplicação
    Um crawling de maneira geral tem um tempo de vida curto, as paginas web constantemente mudam a U.I, U.X, links e diretórios o que acaba quebrando muitos dos grandes bot's de coleta de dados, assim eu acredito que se você gasta mais de 3 dias para fazer um bot... provavelmente perdeu seu tempo, o tempo que leva para produzir um bot no estilo monólito, poderia ter sido usado para produzir outros menores, que com um pequeno trabalho de orquestração conseguimos extrair as vantagens do multi core em containers, assim como a fácil manutenção de bots quebrados. É neste cenário que reina o ditado "a soma das partes é maior que o todo".
