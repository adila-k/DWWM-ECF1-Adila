const response = await fetch("../../assets/components/footer.html");
const htmlFooter = await response.text();

document.getElementById("footer").innerHTML = htmlFooter;
