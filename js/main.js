"use strict";
(() => {
  const cfg = Object.assign({name:"TrollWeen",ticker:"TROLLWEEN",chain:"ethereum",contract:"",telegram:"",x:"",buyUrl:"",chartUrl:""},window.TROLLWEEN_CONFIG||{});
  const isETH=cfg.chain.toLowerCase()==="ethereum";
  const address=(cfg.contract||"").trim();
  const hasCA=isETH?/^0x[a-fA-F0-9]{40}$/.test(address):/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  const urlAllowed=u=>{try{const x=new URL(u);return (x.protocol==="https:"||x.protocol==="http:")&&!!x.hostname}catch{return false}};
  const buyUrl=urlAllowed(cfg.buyUrl)?cfg.buyUrl:(hasCA?(isETH?`https://app.uniswap.org/swap?chain=mainnet&outputCurrency=${encodeURIComponent(address)}`:`https://jup.ag/swap/SOL-${encodeURIComponent(address)}`):"");
  const chartUrl=urlAllowed(cfg.chartUrl)?cfg.chartUrl:(hasCA?`https://dexscreener.com/${isETH?'ethereum':'solana'}/${encodeURIComponent(address)}`:"");
  const urls={buy:hasCA?buyUrl:"",telegram:urlAllowed(cfg.telegram)?cfg.telegram:"",x:urlAllowed(cfg.x)?cfg.x:"",chart:hasCA?chartUrl:""};
  const toast=document.getElementById("toast");
  let timer;
  function notify(msg){toast.textContent=msg;toast.classList.add("is-visible");clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove("is-visible"),3200)}
  document.querySelectorAll("[data-link]").forEach(a=>{
    const kind=a.dataset.link;const link=urls[kind];
    if(link){a.href=link;a.target="_blank";a.rel="noopener noreferrer";a.removeAttribute("aria-disabled");}
    else{
      a.href="#";a.target="_self";a.classList.add("is-unavailable");a.setAttribute("aria-disabled","true");
      a.addEventListener("click",ev=>{ev.preventDefault();notify(kind==="buy"||kind==="chart"?"Add your contract address in js/config.js first.":"Add your official social link in js/config.js first.")});
    }
    if(kind==="buy") a.textContent=hasCA?"Buy the Treat 🍬":"Launching Soon 🎃";
  });
  // Replace no-CA placeholders and render full contract in footer; shorten only in hero.
  document.querySelectorAll("[data-copy-ca]").forEach(btn=>{
    const isFooter=!!btn.closest("footer");
    if(hasCA){
      if(isFooter){const v=btn.querySelector("span");if(v)v.textContent=address;}
      else btn.textContent=`CA: ${address.slice(0,7)}…${address.slice(-6)} · tap to copy`;
      btn.title="Click to copy contract address";
    }else{
      if(isFooter){const v=btn.querySelector("span");if(v)v.textContent="CONTRACT ADDRESS COMING SOON";}
      else btn.textContent="CA: COMING SOON · set in config.js";
      btn.title="Edit js/config.js to add your contract address";
    }
    btn.addEventListener("click",async()=>{
      if(!hasCA){notify("Add your actual contract address in js/config.js first.");return;}
      try{await navigator.clipboard.writeText(address);notify("Contract address copied!")}
      catch{const el=document.createElement("textarea");el.value=address;el.style.position="fixed";el.style.opacity="0";document.body.appendChild(el);el.select();try{document.execCommand("copy");notify("Contract address copied!")}catch{notify("Copy the CA from the footer.")}el.remove()}
    });
  });
  const titles=document.querySelectorAll("[data-buy-title]");titles.forEach(t=>t.textContent=`Buy $${cfg.ticker}`);
  // Network-aware 4-step buying guide (Ethereum default, Solana optional).
  const steps=document.querySelectorAll("#how-to-buy h3");
  const descs=document.querySelectorAll("#how-to-buy .text-muted-foreground");
  const words=isETH?["Get ETH","Open Uniswap",`Buy $${cfg.ticker}`,"Hold till dawn"]:["Get SOL","Open Jupiter",`Buy $${cfg.ticker}`,"Hold till dawn"];
  const helps=isETH?["MetaMask or Rabby. Keep a little ETH for gas.","Open Uniswap and double-check the contract address.","Only swap after verifying the token and network.","Only risk what you can afford to lose."]:["Phantom wallet, some SOL for gas.","Open Jupiter and double-check the contract address.","Only swap after verifying the token and network.","Only risk what you can afford to lose."];
  steps.forEach((t,i)=>{if(words[i])t.textContent=words[i]});
  descs.forEach((t,i)=>{if(helps[i])t.textContent=helps[i]});
  const disclaim=document.querySelector("footer p:last-child");
  if(disclaim)disclaim.textContent=`$${cfg.ticker} is a meme token with no intrinsic value or expectation of financial return. Not financial advice. Never spend money you cannot afford to lose. Not affiliated with Pepeween or the creator of Trollface.`;
  // Background ambience is local (original synthesised clip) and only starts on click.
  const sound=document.getElementById("soundToggle"), audio=document.getElementById("ambientAudio");
  if(sound&&audio){audio.volume=0.30;sound.addEventListener("click",async()=>{
    if(audio.paused){try{await audio.play();sound.textContent="🔊 night on";sound.setAttribute("aria-pressed","true")}catch{notify("Your browser blocked audio. Try again.")}}
    else{audio.pause();sound.textContent="🔇 night off";sound.setAttribute("aria-pressed","false")}
  });}
  // Decorative movement is CSS-only, avoids JS timers and heavy dependencies.
  document.querySelectorAll("img[loading=lazy]").forEach(img=>img.addEventListener("error",()=>console.warn("Missing image:",img.src)));
})();
