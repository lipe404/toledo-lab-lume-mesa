"use client";
import { useState } from "react";

const menus = {
  Entradas: [
    ["Pão da casa", "Fermentação longa, manteiga tostada e sal de ervas.", "28"],
    ["Abóbora na brasa", "Coalhada, castanhas e melaço de cana.", "36"],
    ["Queijo da serra", "Compota cítrica e crocante de mandioca.", "42"],
  ],
  Principais: [
    ["Massa do dia", "Massa fresca, tomate assado e manjericão.", "68"],
    ["Arroz de cogumelos", "Cogumelos grelhados, caldo de legumes e queijo curado.", "72"],
    ["Costela de panela", "Purê de mandioca e agrião.", "89"],
  ],
  Doces: [
    ["Pudim na lata", "Baunilha e caramelo bem escuro.", "26"],
    ["Banana de fogo", "Banana assada, creme fresco e farofa doce.", "29"],
    ["Doce de leite", "Chocolate amargo e flor de sal.", "32"],
  ],
} as const;
type Menu = keyof typeof menus;
type Dish = (typeof menus)[Menu][number];
const courseOrder: Menu[] = ["Entradas", "Principais", "Doces"];
const brl = (n: number) => new Intl.NumberFormat("pt-BR", {style:"currency",currency:"BRL",maximumFractionDigits:0}).format(n);


function Embers() {
  return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="46" stroke="currentColor" strokeDasharray="2 4"/><path d="M51 20C39 38 60 40 49 62 40 56 37 49 37 44 27 53 28 75 48 80 70 82 78 63 64 48 65 64 56 65 55 61 66 44 62 31 51 20Z" stroke="currentColor" strokeWidth="1.6"/><path d="m17 43 1 11m65-11-1 11M43 12h14M43 88h14" stroke="currentColor" strokeWidth="1.3"/></svg>;
}

export default function Home() {
  const [active, setActive] = useState<Menu>("Principais");
  const [choices, setChoices] = useState<Partial<Record<Menu, Dish>>>({});
  const selection = courseOrder.flatMap(category => choices[category] ? [{category, dish: choices[category]}] : []);
  const total = selection.reduce((sum, item) => sum + Number(item.dish?.[2] ?? 0), 0);
  function choose(category: Menu, dish: Dish) {
    setChoices(previous => {
      const updated = {...previous};
      if (updated[category]?.[0] === dish[0]) delete updated[category];
      else updated[category] = dish;
      return updated;
    });
  }
  const [party, setParty] = useState("2");
  const [shift, setShift] = useState("Jantar");
  const [summary, setSummary] = useState("");
  return <>
    <a className="skip" href="#conteudo">Ir ao conteúdo</a>
    <header className="frame nav"><a className="logo" href="#conteudo">Lume <i>à</i> Mesa<span>.</span></a><nav aria-label="Principal"><a href="#cozinha">Cozinha</a><a href="#menu">Menu</a><a className="nav-cta" href="#mesa">Sua mesa</a></nav></header>
    <main id="conteudo" tabIndex={-1}>
      <section className="frame hero">
        <div className="hero-copy"><p className="eyebrow">Cozinha de origem <span>•</span> Projeto conceitual</p><h1>Comida feita<br/>no tempo<br/><em>do fogo.</em></h1><p className="lead">Ingredientes da estação, preparo na brasa e mesa posta para conversar sem pressa.</p><a className="button" href="#menu">Explorar o menu</a></div>
        <figure><span className="seal"><Embers/></span><div className="food" role="img" aria-label="Prato de massa fresca com cogumelos e ervas"/><figcaption><span>À mesa</span><span>Ingredientes da estação</span></figcaption></figure>
      </section>
      <section id="cozinha" className="frame story"><p className="eyebrow">Nossa cozinha</p><div><h2>O ingrediente muda.<br/>O cuidado, não.</h2><p>O cardápio começa no que está bom na feira: abóbora, ervas frescas, tomate maduro. Daí vai para a brasa, para a panela ou direto ao prato.</p></div></section>
      <section className="frame editorial" aria-label="Da feira à mesa">
        <figure className="editorial-main"><div className="market-photo" role="img" aria-label="Legumes frescos, folhas e grãos em prato colorido"/><figcaption><b>Da feira</b><span>Folhas, legumes e ervas da estação.</span></figcaption></figure>
        <figure className="editorial-side"><div className="serve-photo" role="img" aria-label="Sobremesa cremosa servida em vidro"/><figcaption><b>À sobremesa</b><span>Um doce para esticar a conversa.</span></figcaption></figure>
        <p>O molho apura com o tomate assado. A massa fresca entra por último. O prato muda com a estação, mas esse cuidado fica.</p>
      </section>
      <section id="menu" className="menu"><div className="frame"><p className="eyebrow">Seleção ilustrativa</p><h2>O menu.</h2>
        <div className="menu-grid"><div>
          <div className="filters" role="group" aria-label="Categoria do menu">{courseOrder.map(item => <button key={item} type="button" aria-pressed={active===item} onClick={()=>setActive(item)}>{item}</button>)}</div>
          <p className="sr-only" role="status">Exibindo {menus[active].length} opções em {active}.</p>
          <ul className="dishes">{menus[active].map(dish => {const [title,text,price]=dish; return <li key={title}><div><h3>{title}</h3><p>{text}</p></div><span>{brl(Number(price))}</span><button type="button" className="dish-select" aria-label={`Escolher ${title} para a degustação`} aria-pressed={choices[active]?.[0]===title} onClick={()=>choose(active,dish)}>{choices[active]?.[0]===title?"Escolhido":"Escolher"}</button></li>;})}</ul>
        </div>
        <aside className="tasting" aria-labelledby="tasting-title">
          <p className="eyebrow">Monte sua sequência</p><h3 id="tasting-title">Seu menu de degustação</h3>
          <p>Combine até um prato de cada categoria. É só uma simulação, sem pedido ou pagamento.</p>
          <dl>{courseOrder.map(category=><div key={category}><dt>{category}</dt><dd>{choices[category]?.[0] ?? "Ainda não escolhido"}</dd></div>)}</dl>
          <p role="status" className="tasting-total">{selection.length} de 3 selecionados <strong>{brl(total)}</strong></p>
          {selection.length>0&&<button className="plain" type="button" onClick={()=>{setChoices({});document.querySelector<HTMLButtonElement>(".filters button[aria-pressed=true]")?.focus();}}>Limpar escolhas</button>}
        </aside></div>
      </div></section>
      <section className="room" aria-labelledby="room-title"><div className="room-photo" role="img" aria-label="Salão de restaurante com mesas de madeira e luz baixa"/><div className="room-copy"><p className="eyebrow">Da cozinha para o salão</p><h2 id="room-title">Senta. Come. Fica.</h2><p>No almoço, pratos leves para dividir. À noite, a brasa acende e o salão ganha outro ritmo.</p><ul><li><b>Almoço</b> 12h às 15h</li><li><b>Jantar</b> 19h às 22h</li></ul><p className="room-note">Horários ilustrativos deste projeto conceitual.</p></div></section>
      <section id="mesa" className="frame reserve"><div><p className="eyebrow">Demonstração interativa</p><h2>Uma mesa<br/>para você.</h2><p>Veja como seria a escolha de uma mesa. Não é uma reserva real.</p></div>
        <form onSubmit={event=>{event.preventDefault();setSummary(`${shift} para ${party} ${party==="1"?"pessoa":"pessoas"}. Nenhuma reserva foi enviada.`);}}>
          <label>Pessoas<select value={party} onChange={event=>{setParty(event.target.value);setSummary("");}}>{[1,2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select></label>
          <label>Turno<select value={shift} onChange={event=>{setShift(event.target.value);setSummary("");}}><option>Almoço</option><option>Jantar</option></select></label>
          <button className="button" type="submit">Simular escolha</button><p className="result" role="status">{summary}</p>
        </form>
      </section>
    </main>
    <footer className="frame"><span>Lume à Mesa.</span><p>Projeto conceitual de portfólio. Restaurante, menu e valores fictícios.</p><a href="https://toledo-felipe.vercel.app/portfolio">Portfólio de Toledo</a></footer>
  </>;
}
