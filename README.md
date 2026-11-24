# Lume à Mesa

Landing page conceitual de portfólio para o segmento de **Gastronomia**. Marca, serviços e dados são fictícios.

**Demonstração:** Cardápio navegável por categoria. Não há envio de dados pessoais, sistema de cadastro ou pagamento.

## Rodar localmente

Requisitos: Node.js 22+ e npm.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000 para ver a landing page.

## Publicar

O projeto usa Next.js App Router, TypeScript e exportação estática. `npm run build` gera `out/`.
Para GitHub Pages, em **Settings → Pages**, selecione **GitHub Actions**, então execute o fluxo “Publicar demonstração no GitHub Pages”. O fluxo configura o caminho público do repositório automaticamente.
Para Vercel, importe o repositório como projeto Next.js sem definir `PAGES_BASE_PATH`.

### Funil demonstrativo

A landing torna visível o menu antes de pedir qualquer ação. A pessoa monta sua degustação, vê o preço por pessoa, leva a seleção à mesa e simula um horário e turno, sem pedido, dados de contato ou pagamento. A estimativa da mesa combina pratos e número de pessoas; nenhum evento é enviado.

Experimento futuro: comparar “Montar minha degustação” com “Ver menu e preços”, avaliando em teste de usabilidade quantas pessoas chegam a um resumo de mesa válido e se conseguem explicar o preço. Não há coleta nem resultados nesta demo.
