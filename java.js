
onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };

  document.getElementById("start-btn").addEventListener("click", function() {
    window.location.href = "pagina.html"; // Redireciona para a página desejada
});