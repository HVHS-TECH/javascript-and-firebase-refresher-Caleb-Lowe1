function start() {

buttonPressed.innerHTML = "you pressed the button"
messageSpace.innerHTML = "You've connected to the JavaScript!";
}
function getFormInput() {
 const OUTPUT = document.getElementById("javaScriptOutput");
 const NAME = document.getElementById("name");
 let userName = NAME.value;
 OUTPUT.innerHTML = "<p>Your name is "+userName+"</p>";
}