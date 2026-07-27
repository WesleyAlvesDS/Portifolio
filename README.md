# Portfólio — Wesley Alves Ferreira

Portfólio profissional desenvolvido com **Astro 7.x** e deploy via **Netlify**.

## Stack

- **Framework:** Astro 7.x (SSG)
- **Estilo:** CSS vanilla com design system por CSS variables
- **Interatividade:** Canvas (Mind Map), Intersection Observer (scroll reveal)
- **API:** GitHub REST API (repositórios em tempo real)
- **Deploy:** Netlify

## Funcionalidades

- **Mind Map interativo** — Canvas com hover, tooltips e layout responsivo (cards no mobile)
- **Timeline animada** — Experiência profissional e cursos com scroll reveal
- **Projetos dinâmicos** — Puxados da API do GitHub em tempo real
- **Dark/Light mode** — Toggle com persistência via localStorage
- **Seção de serviços** — Orçamentos com formulário funcional (mailto)
- **Formulário de contato** — Com seleção de serviço, faixa de orçamento e anti-spam (honeypot)
- **Responsivo** — Mobile-first com breakpoints em 480px, 768px e 1024px

## Projetos

| Projeto | Descrição | Status |
|---------|-----------|--------|
| [Artigo com Café](https://artigocomcafe.com) | Blog de cafeteria digital | Em construção |
| [Pasty](https://pasty.ordob.com) | Ferramenta web de colagens | Ativo |
| Librino | Sistema de gestão de estoque para bibliotecas | Concluído |

## Como rodar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

O build gera estáticos na pasta `dist/`.

## Estrutura

```
src/
├── components/
│   ├── Header.astro
│   ├── Hero.astro
│   ├── Timeline.astro
│   ├── MindMap.astro
│   ├── Projects.astro
│   ├── Certifications.astro
│   ├── Contact.astro
│   └── Footer.astro
├── data/
│   └── resume.ts          # Dados do currículo sanitizados
├── layouts/
│   └── Layout.astro
└── pages/
    └── index.astro
```

## Contato

- **Email:** pro.wesleyalves@gmail.com
- **LinkedIn:** [linkedin.com/in/wesley-alves-pro](https://www.linkedin.com/in/wesley-alves-pro)
- **GitHub:** [github.com/WesleyAlvesDS](https://github.com/WesleyAlvesDS)
