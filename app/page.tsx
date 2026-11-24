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
const shifts = {"Almoço":["12:00","13:15","14:30"],"Jantar":["19:00","20:15","21:30"]} as const;
type Shift = keyof typeof shifts;
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
    setSummary("");
    setChoices(previous => {
      const updated = {...previous};
      if (updated[category]?.[0] === dish[0]) delete updated[category];
      else updated[category] = dish;
      return updated;
    });
  }
  const [party, setParty] = useState("2");
  const [shift, setShift] = useState<Shift>("Jantar");
  const [time, setTime] = useState<string>(shifts.Jantar[0]);
  const [summary, setSummary] = useState("");
  return <>
    <a className="skip" href="#conteudo">Ir ao conteúdo</a>
    <header className="frame nav"><a className="logo brand-masthead" href="#conteudo"><img className="brand-image" src={(process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/brand-lockup.webp"} alt="Lume à Mesa" width="640" height="160" decoding="async" /></a><nav aria-label="Principal"><a href="#cozinha">Cozinha</a><a href="#menu">Menu</a><a className="nav-cta" href="#mesa">Sua mesa</a></nav></header>
    <main id="conteudo" tabIndex={-1}>
      <section className="frame hero">
        <div className="hero-copy"><p className="eyebrow">Cozinha de origem <span>•</span> Projeto conceitual</p><h1>Comida feita<br/>no tempo<br/><em>do fogo.</em></h1><p className="lead">Ingredientes da estação, preparo na brasa e mesa posta para conversar sem pressa.</p><div className="callouts"><a className="button" href="#menu">Montar minha degustação</a><a className="soft-link" href="#mesa">Simular uma mesa</a></div><p className="hero-note">Menu à la carte · Valores visíveis antes de escolher</p></div>
        <figure><span className="seal"><Embers/></span><div className="food" role="img" aria-label="Prato de massa fresca com cogumelos e ervas"/><figcaption><span>À mesa</span><span>Ingredientes da estação</span></figcaption></figure>
      </section>
      <section id="cozinha" className="frame story"><p className="eyebrow">Nossa cozinha</p><div><h2>O ingrediente muda.<br/>O cuidado, não.</h2><p>O cardápio começa no que está bom na feira: abóbora, ervas frescas, tomate maduro. Daí vai para a brasa, para a panela ou direto ao prato.</p></div></section>
      <section className="frame editorial" aria-label="Da feira à mesa">
        <figure className="editorial-main"><div className="market-photo" role="img" aria-label="Legumes frescos, folhas e grãos em prato colorido"/><figcaption><b>Da feira</b><span>Folhas, legumes e ervas da estação.</span></figcaption></figure>
        <figure className="editorial-side"><div className="serve-photo" role="img" aria-label="Sobremesa cremosa servida em vidro"/><figcaption><b>À sobremesa</b><span>Um doce para esticar a conversa.</span></figcaption></figure>
        <p>O molho apura com o tomate assado. A massa fresca entra por último. O prato muda com a estação, mas esse cuidado fica.</p>
      </section>
      <section id="menu" className="menu"><div className="frame"><p className="eyebrow">Seleção ilustrativa</p><h2>O menu.</h2>
        <p className="menu-instructions">Escolha entrada, principal e doce no seu ritmo. Os preços abaixo são por pessoa e não incluem bebidas.</p><div className="menu-grid"><div>
          <div className="filters" role="group" aria-label="Categoria do menu">{courseOrder.map(item => <button key={item} type="button" aria-pressed={active===item} onClick={()=>setActive(item)}>{item}</button>)}</div>
          <p className="sr-only" role="status">Exibindo {menus[active].length} opções em {active}.</p>
          <ul className="dishes">{menus[active].map(dish => {const [title,text,price]=dish; return <li key={title}><div><h3>{title}</h3><p>{text}</p></div><span>{brl(Number(price))}</span><button type="button" className="dish-select" aria-label={`Escolher ${title} para a degustação`} aria-pressed={choices[active]?.[0]===title} onClick={()=>choose(active,dish)}>{choices[active]?.[0]===title?"Escolhido":"Escolher"}</button></li>;})}</ul>
        </div>
        <aside className="tasting" aria-labelledby="tasting-title">
          <p className="eyebrow">Monte sua sequência</p><h3 id="tasting-title">Seu menu de degustação</h3>
          <p>Combine até um prato de cada categoria. É só uma simulação, sem pedido ou pagamento.</p>
          <dl>{courseOrder.map(category=><div key={category}><dt>{category}</dt><dd>{choices[category]?.[0] ?? "Ainda não escolhido"}</dd></div>)}</dl>
          <p role="status" className="tasting-total">{selection.length} de 3 selecionados <strong>{brl(total)}</strong></p>
          {selection.length>0&&<div className="tasting-actions"><a className="button" href="#mesa">Levar seleção à mesa</a><button className="plain" type="button" onClick={()=>{setChoices({});setSummary("");document.querySelector<HTMLButtonElement>(".filters button[aria-pressed=true]")?.focus();}}>Limpar escolhas</button></div>}
        </aside></div>
      </div></section>
      <section className="room" aria-labelledby="room-title"><div className="room-photo" role="img" aria-label="Salão de restaurante com mesas de madeira e luz baixa"/><div className="room-copy"><p className="eyebrow">Da cozinha para o salão</p><h2 id="room-title">Senta. Come. Fica.</h2><p>No almoço, pratos leves para dividir. À noite, a brasa acende e o salão ganha outro ritmo.</p><ul><li><b>Almoço</b> 12h às 15h</li><li><b>Jantar</b> 19h às 22h</li></ul><p className="room-note">Horários ilustrativos deste projeto conceitual.</p></div></section>
      <section id="mesa" className="frame reserve"><div><p className="eyebrow">Demonstração interativa</p><h2>Uma mesa<br/>para você.</h2><p>Escolha o turno e um horário para ver como a mesa ficaria. Não pedimos nome, telefone nem cartão.</p><p className="reserve-note"><strong>Quer só ver o menu?</strong> Você pode simular a mesa sem escolher nenhum prato antes.</p></div>
        <form onSubmit={event=>{
          event.preventDefault();
          const label = party==="1"?"pessoa":"pessoas";
          const menu = selection.length ? ` Seleção ilustrativa: ${selection.map(item=>item.dish?.[0]).join(", ")}. Estimativa para a mesa: ${brl(total*Number(party))}, sem bebidas.` : "";
          setSummary(`${shift} às ${time} para ${party} ${label}.${menu} Nenhuma reserva foi enviada.`);
        }}>
          <label>Pessoas<select value={party} onChange={event=>{setParty(event.target.value);setSummary("");}}>{[1,2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select></label>
          <label>Turno<select value={shift} onChange={event=>{const selected=event.target.value as Shift;setShift(selected);setTime(shifts[selected][0]);setSummary("");}}><option>Almoço</option><option>Jantar</option></select></label>
          <label className="times">Horário ilustrativo<select value={time} onChange={event=>{setTime(event.target.value);setSummary("");}}>{shifts[shift].map(slot=><option key={slot}>{slot}</option>)}</select></label>
          <p className="menu-carry" role="status">{selection.length ? `${selection.length} prato${selection.length===1?"":"s"} por pessoa na degustação. Estimativa para a mesa: ${brl(total*Number(party))}.` : "Nenhuma degustação incluída."}</p>
          <button className="button" type="submit">Simular escolha</button><p className="result" role="status">{summary}</p>
        </form>
      </section>
    </main>
    <footer className="frame"><img className="brand-image brand-footer" src={(process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/brand-lockup.webp"} alt="Lume à Mesa" width="640" height="160" decoding="async" /><p>Projeto conceitual de portfólio. Restaurante, menu e valores fictícios.</p><a href="https://toledo-felipe.vercel.app/portfolio">Portfólio de Toledo</a></footer>
  </>;
}
