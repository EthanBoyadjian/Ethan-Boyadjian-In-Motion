function sendEmail(event) {
  event.preventDefault(); // Prevent the default form submission

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const mailtoLink = `mailto:boyadjian.ethan@gmail.com?subject=Contact%20Form%20Submission&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AMessage:%20${encodeURIComponent(message)}`;

  window.location = mailtoLink;
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
