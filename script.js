function toggleMenu(){

  const nav = document.getElementById("nav");

  nav.classList.toggle("open");

}


function sendMessage(event){

  event.preventDefault();

  const name =
    document.getElementById("name").value;

  const email =
    document.getElementById("email").value;

  const message =
    document.getElementById("message").value;


  const subject =
    encodeURIComponent(
      "Website enquiry from " + name
    );


  const body =
    encodeURIComponent(
      "Name: " + name +
      "\nEmail: " + email +
      "\n\nMessage:\n" + message
    );


  window.location.href =
    "mailto:Akannifolawiyo5@gmail.com" +
    "?subject=" + subject +
    "&body=" + body;
}
