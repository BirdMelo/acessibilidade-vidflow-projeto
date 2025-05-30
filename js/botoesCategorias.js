const botoesCategorias = document.querySelectorAll(".botao-categoria");

botoesCategorias.forEach((botao) => {
  botao.addEventListener("click", () => {
    const categoriaSelecionada = botao.getAttribute("name");
    associarPainel(categoriaSelecionada)
    filtrarPorCategoria(categoriaSelecionada);
    atualizarEstadosDosBotoes(categoriaSelecionada);
  });

  botao.addEventListener("keydown", mudarFocoPorTeclado)
});

function associarPainel(categoriaSelecionada) {
  const painelVideos = document.querySelector('[role="tabpanel"]')
  const idBotao = document.querySelector(`[name = "${categoriaSelecionada}"]`).id
  painelVideos.setAttribute("aria-labelledby", idBotao)
}

function filtrarPorCategoria(filtro) {
  const videos = document.querySelectorAll(".videos__item");

  for (const video of videos) {
    const categoria = video.querySelector(".categoria").textContent.toLowerCase();
    const valorFiltro = filtro.toLowerCase();

    const mostrarVideo = valorFiltro === 'tudo' || categoria.includes(valorFiltro);

    video.classList.toggle("escondido", !mostrarVideo);
  }
}

function atualizarEstadosDosBotoes(categoriaSelecionada) {
  botoesCategorias.forEach((botao) => {
    const botaoFoiSelecionado = botao.getAttribute("name") === categoriaSelecionada;

    botao.ariaSelected = botaoFoiSelecionado;
    botao.setAttribute("tabindex", botaoFoiSelecionado ? 0: -1)
  })
}

const tablist = document.querySelector('[role="tablist"]')
function mudarFocoPorTeclado(event) {
  const botaoAtual = event.target
  switch(event.key) {
    case "ArrowRight":
      if(botaoAtual == tablist.lastElementChild){
        tablist.firstElementChild.focus();
      } else{
        botaoAtual.nextElementSibling.focus();
      }
    break;
    case "ArrowLeft":
      if(botaoAtual === tablist.firstElementChild){
        tablist.lastElementChild.focus();
      }else {
        botaoAtual.previousElementSibling.focus()
      }
    break;
    case "Home":
      tablist.firstElementChild.focus();
    break;
    case "End":
      tablist.lastElementChild.focus();
  }
}