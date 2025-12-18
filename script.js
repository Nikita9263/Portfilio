const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');

  if (menuToggle.innerHTML === "&#9776;") {
    menuToggle.innerHTML = "&times;";
  } else {
    menuToggle.innerHTML = "&#9776;";
  }
});

// Jab link pe click kare to menu band ho jaye
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    menuToggle.innerHTML = "&#9776;";
  });
});


const professions = ["Student", "Web Development Learner", "Life Skills Coordinator"];
let i = 0; // which profession
let j = 0; // which letter
let current = "";
let deleting = false;

function typeEffect() {
  const element = document.getElementById("profession");

  if (!deleting) {
    // Typing
    current = professions[i].substring(0, j + 1);
    element.textContent = current;
    j++;

    if (j === professions[i].length) {
      deleting = true;
      setTimeout(typeEffect, 1000); // pause before deleting
      return;
    }
  } else {
    // Deleting
    current = professions[i].substring(0, j - 1);
    element.textContent = current;
    j--;

    if (j === 0) {
      deleting = false;
      i = (i + 1) % professions.length; // next word
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();


// Contact form message
const form = document.getElementById("contactForm");
const message = document.getElementById("contactMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  message.textContent = "Aapka sandesh bhej diya gaya hai!";
  message.style.color = "green";
  form.reset();
});


function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([new Date(), data.name, data.email, data.message]);

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let formData = {
    name: this.name.value,
    email: this.email.value,
    message: this.message.value
  };

  fetch("PASTE_YOUR_WEB_APP_URL_HERE", {
    method: "POST",
    body: JSON.stringify(formData)
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("contactMessage").innerText = "✅ Message sent successfully!";
    this.reset();
  })
  .catch(err => {
    document.getElementById("contactMessage").innerText = "❌ Failed to send. Try again.";
  });
});

