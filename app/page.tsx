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

export default function Home() {
  const [active, setActive] = useState<Menu>("Principais");
  const [party, setParty] = useState("2");
  const [shift, setShift] = useState("Jantar");
  const [summary, setSummary] = useState("");
  return <>
    <a className="skip" href="#conteudo">Ir ao conteúdo</a>
    <header className="frame nav"><a className="logo" href="#conteudo">Lume <i>à</i> Mesa<span>.</span></a><nav aria-label="Principal"><a href="#cozinha">Cozinha</a><a href="#menu">Menu</a><a className="nav-cta" href="#mesa">Sua mesa</a></nav></header>
    <main id="conteudo">
      <section className="frame hero">
        <div className="hero-copy"><p className="eyebrow">Cozinha de origem <span>•</span> Projeto conceitual</p><h1>Comida feita<br/>no tempo<br/><em>do fogo.</em></h1><p className="lead">Ingredientes da estação, preparo na brasa e mesa posta para conversar sem pressa.</p><a className="button" href="#menu">Explorar o menu</a></div>
        <figure><div className="food" role="img" aria-label="Prato de massa fresca com cogumelos e ervas"/><figcaption><span>À mesa</span><span>Ingredientes da estação</span></figcaption></figure>
      </section>
      <section id="cozinha" className="frame story"><p className="eyebrow">Nossa cozinha</p><div><h2>O ingrediente muda.<br/>O cuidado, não.</h2><p>O cardápio começa no que está bom na feira: abóbora, ervas frescas, tomate maduro. Daí vai para a brasa, para a panela ou direto ao prato.</p></div></section>
      <section id="menu" className="menu"><div className="frame"><p className="eyebrow">Seleção ilustrativa</p><h2>O menu.</h2>
        <div className="filters" role="group" aria-label="Categoria do menu">{(Object.keys(menus) as Menu[]).map(item => <button key={item} type="button" aria-pressed={active===item} onClick={()=>setActive(item)}>{item}</button>)}</div>
        <ul className="dishes" aria-live="polite">{menus[active].map(([title, text, price]) => <li key={title}><div><h3>{title}</h3><p>{text}</p></div><span>R$ {price}</span></li>)}</ul>
      </div></section>
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
