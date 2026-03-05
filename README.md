# GitHub User Search Solution - DevChallenges

Esta é uma solução para o desafio de busca de usuários do GitHub da plataforma [devchallenges.io](https://devchallenges.io/challenge/github-profile). O projeto permite explorar perfis de desenvolvedores utilizando a API oficial do GitHub, focando em performance e experiência do usuário.

*This is a solution to the GitHub User Search challenge from [devchallenges.io](https://devchallenges.io/challenge/github-profile). The project allows exploring developer profiles using the official GitHub API, focusing on performance and user experience.*

## Sumário | *Table of contents*

- [Visão Geral | *Overview*](#visão-geral--overview)
  - [O desafio | *The challenge*](#o-desafio--the-challenge)
  - [Capturas de Tela | *Screenshots*](#capturas-de-tela--screenshots)
  - [Links](#links)
- [Instalação | *Installation*](#instalação--installation)
- [Meu processo | *My process*](#meu-processo--my-process)
  - [Tecnologias utilizadas | *Built with*](#tecnologias-utilizadas--built-with)
  - [O que eu aprendi | *What I learned*](#o-que-eu-aprendi--what-i-learned)
- [Configuração de API | *API Configuration*](#configuração-de-api--api-configuration)
- [Autor | *Author*](#autor--author)

## Visão Geral | *Overview*

### O desafio | *The challenge*

Os usuários devem ser capazes de:

- Pesquisar usuários do GitHub em tempo real com sugestões (Autocomplete).
- Visualizar detalhes como Nome, Bio, Avatar e data de atualização.
- Ver o tempo relativo da última atualização (ex: "updated 4 days ago").
- Receber alertas amigáveis caso o limite de requisições da API seja atingido.
- Navegar em uma interface responsiva e otimizada.

*Users should be able to:*

- *Search GitHub users in real-time with suggestions (Autocomplete).*
- *View details such as Name, Bio, Avatar, and update date.*
- *See relative time of the last update (e.g., "updated 4 days ago").*
- *Receive friendly alerts if the API rate limit is reached.*
- *Navigate a responsive and optimized interface.*

### Capturas de Tela | *Screenshots*

![Captura de tela em desktop | Screenshot in desktop](/public/screenshots/screenshot_desktop.jpeg)

Captura de tela em desktop | *Screenshot in desktop*

---

![Captura de tela em tablet | Screenshot in tablet](/public/screenshots/screenshot_tablet.jpeg)

Captura de tela em tablet | *Screenshot in tablet*

---

![Captura de tela em dispositivo móvel | Screenshot in mobile](/public/screenshots/screenshot_mobile.jpeg)

Captura de tela em dispositivo móvel | *Screenshot in mobile*

---

### Links

- URL da solução | Solution URL: [https://github.com/giullianoth/GitHubProfile-DevChallenges](https://github.com/giullianoth/GitHubProfile-DevChallenges)
- URL do site ativo | Live Site URL: [https://github-profile-lac-zeta.vercel.app/](https://github-profile-lac-zeta.vercel.app/)

## Instalação | *Installation*

1. **Clone o repositório | _Clone the repository:_**

```bash
git clone https://github.com/giullianoth/GitHubProfile-DevChallenges
```

2. **Instale as dependências | _Install dependencies:_**

```bash
npm install
```

3. **Configure as variáveis de ambiente:** Crie um arquivo ```.env``` na raiz do projeto e adicione seu Token do GitHub | *__Set up environment variables:__ Create a ```.env``` file in the project root and add your GitHub Token*

```
VITE_GITHUB_TOKEN=seu_token_aqui
```

```
VITE_GITHUB_TOKEN=your_token_here
```

4. Inicie o projeto | *Start the project:*

```bash
npm run dev
```

## Meu processo | *My process*

### Tecnologias utilizadas | *Built with*

- [**React**](https://react.dev/) - Hooks avançados | *Advanced hooks* (useCallback, useEffect)
- [**TypeScript**](https://www.typescriptlang.org/) - Interfaces para tipagem da API | *API typing interfaces*
- [**GitHub REST API**](https://docs.github.com/en/rest) - Consumo de dados reais | *Actual data usage*
- **CSS Modules** - Estilização isolada e escalável | *Isolated and scalable styling*
- **Debounce Logic** - Otimização de chamadas de rede | *Network call optimization*

### O que eu aprendi | *What I learned*

1. **Consumo Inteligente de APIs:** Aprendi a lidar com o comportamento assíncrono do ```fetch``` combinando buscas de lista com buscas de detalhes individuais usando ```Promise.all``` para melhorar a percepção de velocidade.

2. **Gerenciamento de Rate Limits:** Implementei um sistema de tratamento de erro HTTP 403 para informar o usuário quando o limite de requisições do GitHub expira, garantindo que o app não "quebre" silenciosamente.

3. **Lógica de Tempo Relativo:** Desenvolvi uma função personalizada para calcular a diferença entre datas e exibir formatos humanos (segundos, minutos, horas ou dias), evitando dependências externas pesadas.

---

1. *__Smart API Consumption:__ I learned how to handle the asynchronous ```fetch``` behavior by combining list fetches with individual detail fetches using ```Promise.all``` to improve perceived speed.*

2. *__Rate Limit Management:__ I implemented an HTTP 403 error handling system to inform the user when the GitHub request limit expires, ensuring that the app doesn't "break" silently.*

3. *__Relative Time Logic:__ I developed a custom function to calculate the difference between dates and display human-readable formats (seconds, minutes, hours, or days), avoiding heavy external dependencies.*

```typescript
// Exemplo da lógica de tempo relativo que implementei
// Example of the relative time logic I implemented
const diffInDays = Math.floor(diffInHours / 24);
return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'}`;
```

## Configuração de API | *API Configuration*

Este projeto utiliza um **Personal Access Token (Classic)** para elevar o limite de requisições de 60 para 5.000 por hora. O token foi configurado com escopos nulos (apenas acesso público) seguindo o princípio do privilégio mínimo para maior segurança.

*This project uses a **Personal Access Token (Classic)** to increase the rate limit from 60 to 5,000 requests per hour. The token was configured with zero scopes (public access only) following the principle of least privilege for better security.*

## Autor | *Author*

Feito com :heart: por este cara sonhador:

*Made with :heart: by this dreamy guy:*

| <img src="https://avatars.githubusercontent.com/u/106249494?v=4" width="100px" style="border-radius: 50%"> **Giulliano Guimarães** |
| --- |
|[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/giullianoth) [![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/giullianoth/) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giullianoth/) [![GMail](https://img.shields.io/badge/Gmail-D14836?style=flat&logo=gmail&logoColor=white)](mailto:llthguimaraes@gmail.com) |
