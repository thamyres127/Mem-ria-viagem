# 🧭 Memória de Viagem

Jogo da memória com tema de viagem, feito em **HTML, CSS e JavaScript puro** (sem frameworks e sem dependências externas, além de uma fonte do Google Fonts).

🔗 **Demo:** *(adicione aqui o link do GitHub Pages depois de publicar)*

## Funcionalidades

- Tabuleiro 4×4 com 8 pares de ícones de viagem
- Embaralhamento aleatório a cada partida (algoritmo Fisher-Yates)
- Contador de jogadas e cronômetro em tempo real
- Recorde salvo no navegador (`localStorage`)
- Animação de flip em CSS 3D (`transform`, `backface-visibility`)
- Acessível por teclado (`tabindex`, `role="button"`, `Enter`/`Espaço`)
- Respeita `prefers-reduced-motion`
- Totalmente responsivo

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, grid, animações 3D)
- JavaScript (ES6+, manipulação de DOM, `localStorage`)

## Como rodar localmente

1. Baixe ou clone este repositório
2. Abra o arquivo `index.html` no navegador — não precisa de servidor nem de instalação

```bash
git clone https://github.com/SEU-USUARIO/memoria-viagem.git
cd memoria-viagem
```

## Como publicar no GitHub Pages

1. Suba os arquivos para um repositório no GitHub
2. Vá em **Settings → Pages**
3. Em "Branch", selecione `main` e a pasta `/root`
4. Salve — em alguns minutos o jogo estará disponível em `https://SEU-USUARIO.github.io/memoria-viagem`

## Estrutura do projeto

```
memoria-viagem/
├── index.html   # estrutura da página
├── style.css    # visual e animações
├── script.js    # lógica do jogo
└── README.md
```

---

Projeto criado como peça de portfólio para candidaturas a vagas de **Front-end Jr.**
