document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.getElementById("nav-menu");

  // Toggle navigation menu on mobile
  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Search Logic – only runs on Home page
  const searchBtn = document.querySelector(".search-btn");
  const clearBtn = document.querySelector(".clear-btn");
  const searchInput = document.querySelector("input[type='text']");
  const resultsContainer = document.querySelector("#results");

  if (searchBtn && clearBtn && searchInput && resultsContainer) {
    // Search button click
    searchBtn.addEventListener("click", () => {
      const keyword = searchInput.value.trim().toLowerCase();

    // Clear old results
      resultsContainer.innerHTML = "";

    // Fetch JSON data
      fetch("travel_recommendation_api.json")
        .then((res) => res.json())
        .then((data) => {
          let matches = [];

        // Check countries
          data.countries.forEach((country) => {
            if (country.name.toLowerCase().includes(keyword)) {
              matches = matches.concat(country.cities);
            }
          });

        // Check temples
          if (keyword.includes("temple")) {
            matches = matches.concat(data.temples);
          }

        // Check beaches
          if (keyword.includes("beach")) {
            matches = matches.concat(data.beaches);
          }

          if (matches.length === 0) {
            resultsContainer.innerHTML = "<p>No results found.</p>";
          } else {
            matches.forEach((place) => {
              const card = document.createElement("div");
              card.className = "card";
              card.innerHTML = `
                <img src="${place.imageUrl}" alt="${place.name}" class="place-img" />
                <div class="place-info">
                  <h3>${place.name}</h3>
                  <p>${place.description}</p>
                  <button class="visit-btn">Visit</button>
                </div>
              `;
              resultsContainer.appendChild(card);
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });

    

    // Clear button click
    clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    resultsContainer.innerHTML = "";

    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  
    // This is the new function to display the time
    function displayNewYorkTime() {
        const options = { 
            timeZone: 'America/New_York', 
            hour12: true, 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric' 
        };

        const newYorkTime = new Date().toLocaleTimeString('en-US', options);
        
        // Find the element by its ID and update its content
        const timeElement = document.getElementById('new-york-time');
        if (timeElement) {
            timeElement.textContent = newYorkTime;
        }
    }

    // Call the function once to display the time immediately
    displayNewYorkTime();

    // Update the time every second
    setInterval(displayNewYorkTime, 1000);
});






