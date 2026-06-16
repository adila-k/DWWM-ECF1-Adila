const response = await fetch("../../assets/components/header.html");
const htmlHeader = await response.text();

document.getElementById("header").innerHTML = htmlHeader;
