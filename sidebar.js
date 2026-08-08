(() => {
  const sidebar = document.querySelector(".site-sidebar");
  if (!sidebar) return;

  // Inject styles
  const style = document.createElement("style");
  style.textContent = `
    body.has-sidebar{
      margin:0!important;
      overflow-x:hidden;
    }

    .site-main{
      margin-left:0!important;
      width:100%!important;
    }

    .site-sidebar{
      position:fixed!important;
      top:0!important;
      left:0!important;
      bottom:0!important;
      width:min(78vw,300px)!important;
      height:100dvh!important;
      z-index:10001!important;
      transform:translateX(-105%)!important;
      transition:transform .28s cubic-bezier(.22,.8,.22,1)!important;
      box-shadow:16px 0 35px rgba(0,0,0,.28);
    }

    body.menu-open .site-sidebar{
      transform:translateX(0)!important;
    }

    .menu-toggle{
      position:fixed;
      top:16px;
      left:16px;
      width:44px;
      height:44px;
      border:none;
      border-radius:999px;
      background:#1b1513;
      color:#efe7d7;
      font-size:24px;
      cursor:pointer;
      z-index:10003;
      box-shadow:0 4px 15px rgba(0,0,0,.25);
    }
body.menu-open .menu-toggle {
  opacity: 0;
  pointer-events: none;
}
    .menu-backdrop{
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.35);
      opacity:0;
      pointer-events:none;
      transition:opacity .25s;
      z-index:10000;
    }

    body.menu-open .menu-backdrop{
      opacity:1;
      pointer-events:auto;
    }

    .menu-close{
      position:absolute;
      top:12px;
      right:12px;
      background:none;
      border:none;
      color:#efe7d7;
      font-size:30px;
      cursor:pointer;
    }

    body.menu-open{
      overflow:hidden;
    }
  `;
  document.head.appendChild(style);

  // Hamburger
  const button = document.createElement("button");
  button.className = "menu-toggle";

  button.innerHTML = `
  <span style="font-size:24px;">☰</span>
  <span style="
    font-size:8px;
    letter-spacing:2.5px;
    text-transform:uppercase;
    margin-top:4px;
    font-family:Georgia, 'Times New Roman', serif;
  ">Menu</span>
`;
  document.body.appendChild(button);

  // Dark overlay
  const backdrop = document.createElement("div");
  backdrop.className = "menu-backdrop";
  document.body.appendChild(backdrop);

  // Close button
  const close = document.createElement("button");
  close.className = "menu-close";
  close.innerHTML = "×";
  sidebar.appendChild(close);

  function openMenu(){
    document.body.classList.add("menu-open");
  }

  function closeMenu(){
    document.body.classList.remove("menu-open");
  }

  button.addEventListener("click",()=>{
    if(document.body.classList.contains("menu-open")){
      closeMenu();
    }else{
      openMenu();
    }
  });

  close.addEventListener("click",closeMenu);
  backdrop.addEventListener("click",closeMenu);

  document.addEventListener("keydown",(e)=>{
    if(e.key==="Escape"){
      closeMenu();
    }
  });

  sidebar.querySelectorAll("a").forEach(link=>{
    link.addEventListener("click",closeMenu);
  });
})();
