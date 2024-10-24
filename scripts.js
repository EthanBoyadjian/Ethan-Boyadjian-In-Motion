function sendEmail(event) {
  event.preventDefault(); // Prevent the default form submission

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "send_email.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        alert("Message sent successfully!");
      } else {
        alert("Failed to send message.");
      }
    }
  };

  const params = `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`;
  xhr.send(params);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
  document.querySelector("main").classList.add("loaded");

  const popup = document.getElementById("popup");
  if (popup) {
    popup.addEventListener("mouseleave", () => {
      popup.style.display = "none";
    });
  }

  const navLinks = document.querySelectorAll("nav ul li a");
  const underline = document.querySelector(".underline");

  function updateUnderline() {
    const activeLink = document.querySelector("nav ul li a.active");
    if (activeLink) {
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = activeLink.closest("nav").getBoundingClientRect();
      underline.style.width = `${linkRect.width}px`;
      underline.style.left = `${linkRect.left - navRect.left}px`;
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      navLinks.forEach((link) => link.classList.remove("active"));
      event.target.classList.add("active");
      updateUnderline();
    });
  });

  // Initial update
  updateUnderline();

  // Attach the sendEmail function to the form submit event
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", sendEmail);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-content");
  const popup = document.getElementById("popup");
  const popupContent = popup.querySelector(".popup-content");
  const closeBtn = popup.querySelector(".close");

  timelineItems.forEach((item) => {
    item.addEventListener("click", () => {
      const title = item.getAttribute("data-title");
      const date = item.getAttribute("data-date");
      const description = item.getAttribute("data-description");
      const image = item.getAttribute("data-image");
      const logo = item.getAttribute("data-logo");
      const courses = item.getAttribute("data-courses");

      popupContent.querySelector("h2").innerText = title;
      popupContent.querySelector(".date").innerText = date;
      popupContent.querySelector(".description").innerText = description;
      popupContent.querySelector(".popup-image").src = image;
      popupContent.querySelector(".popup-logo").src = logo;

      // Parse and display the courses if available
      const coursesContainer = popupContent.querySelector(".courses");
      coursesContainer.innerHTML = ""; // Clear previous content
      if (courses) {
        const sections = courses.split("|");
        sections.forEach((section) => {
          const [sectionTitle, sectionCourses] = section.split(":");
          const sectionElement = document.createElement("div");
          const sectionTitleElement = document.createElement("h3");
          sectionTitleElement.innerText = sectionTitle.trim();
          sectionElement.appendChild(sectionTitleElement);

          const courseList = document.createElement("ul");
          sectionCourses.split(",").forEach((course) => {
            const courseItem = document.createElement("li");
            courseItem.innerText = course.trim();
            courseList.appendChild(courseItem);
          });
          sectionElement.appendChild(courseList);
          coursesContainer.appendChild(sectionElement);
        });
      }

      popup.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});

const translations = {
  en: {
    siteTitle: "My Website",
    navHome: "Home",
    navEducation: "Education",
    navWork: "Work Experience",
    navExtracurricular: "Extracurricular Activities",
    navCv: "CV",
    navContact: "Contact",
    sectionTitle: "Education",
    sectionDescription: "(Click on section to learn more)"
  },
  fr: {
    siteTitle: "Mon Site Web",
    navHome: "Accueil",
    navEducation: "Éducation",
    navWork: "Expérience Professionnelle",
    navExtracurricular: "Activités Extracurriculaires",
    navCv: "CV",
    navContact: "Contact",
    sectionTitle: "Éducation",
    sectionDescription: "(Cliquez sur la section pour en savoir plus)"
  }
};

function switchLanguage(lang) {
  document.getElementById("site-title").textContent = translations[lang].siteTitle;
  document.getElementById("nav-home").textContent = translations[lang].navHome;
  document.getElementById("nav-education").textContent = translations[lang].navEducation;
  document.getElementById("nav-work").textContent = translations[lang].navWork;
  document.getElementById("nav-extracurricular").textContent = translations[lang].navExtracurricular;
  document.getElementById("nav-cv").textContent = translations[lang].navCv;
  document.getElementById("nav-contact").textContent = translations[lang].navContact;
  document.getElementById("section-title").textContent = translations[lang].sectionTitle;
  document.getElementById("section-description").textContent = translations[lang].sectionDescription;
}

document.addEventListener("DOMContentLoaded", () => {
  // Set default language to English
  switchLanguage('en');
});