# GaussX

Site oficial do **GaussX**, clube de interesse de Física e Matemática.

O projeto foi desenvolvido como uma plataforma simples e visualmente limpa para organizar encontros, disponibilizar materiais e apresentar a identidade do grupo.

## Estrutura do projeto

```text
index.html
styles.css
script.js
assets/
  logo-gaussx.svg
```

## O que este site faz

- exibe a identidade visual do GaussX;
- apresenta os encontros em formato de cards;
- possui animação de entrada na logo e no título;
- possui efeito de surgimento dos cards durante a rolagem;
- mantém um layout estático e leve, fácil de publicar no Netlify.

## Como editar

### Alterar os encontros
Abra o arquivo `script.js` e edite o array `meetings`:

```js
const meetings = [
  {
    title: 'Encontro 1 - Alinhando Expectativas',
    description: 'Descrição do encontro.',
    date: '12 de março de 2026',
    href: '#'
  }
];
```

### Trocar a logo
Substitua o arquivo:

```text
assets/logo-gaussx.svg
```

Se preferir PNG, troque o arquivo e ajuste o caminho no `index.html`.

### Alterar cores e estilo
Edite as variáveis no início de `styles.css`:

```css
:root {
  --bg: #02071a;
  --bg-card: rgba(2, 8, 24, 0.88);
  --text: #ffffff;
  --muted: #d3d9ea;
  --line: rgba(255,255,255,0.9);
  --accent: #6d5cff;
  --accent-2: #31a8ff;
}
```

## Publicação no GitHub + Netlify

### No GitHub
Se o repositório estiver organizado com uma pasta chamada `Site_GaussX`, coloque os arquivos deste site **dentro dessa pasta**.

### No Netlify
Se o site estiver dentro da pasta `Site_GaussX`, o campo **Publish directory** deve ser:

```text
Site_GaussX
```

O campo **Build command** pode ficar vazio.

## Deploy automático

Se o Netlify estiver conectado ao repositório GitHub, novos commits geram novos deploys automaticamente.

## Observação importante

Se o site publicar sem animação ou com erro 404, normalmente o problema é um destes:

1. o `index.html` não está na pasta publicada;
2. o Netlify está apontando para a pasta errada;
3. o repositório está com arquivos antigos;
4. o navegador está mostrando cache antigo.

Nesses casos, faça um novo deploy e atualize com `Ctrl + Shift + R`.
