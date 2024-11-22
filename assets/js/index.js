// JavaScript files are compiled and minified during the build process to the assets/built folder. See available scripts in the package.json file.

// Import CSS
import "../css/index.css";

function handleAdvantages() {
    const advantages = document.querySelector(".js-advantages");

    if (!advantages) {
        return;
    }

    const buttons = advantages.querySelectorAll(".advantages__titles button");
    const paragraphs = advantages.querySelectorAll(
        ".advantages__descriptions .paragraph"
    );

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons and paragraphs
            buttons.forEach((btn) => btn.classList.remove("active"));
            paragraphs.forEach((p) => p.classList.remove("active"));

            // Add active class to the clicked button and corresponding paragraph
            button.classList.add("active");
            paragraphs[index].classList.add("active");
        });
    });
}

handleAdvantages();

function handleDynamicIconsSwitch() {
    const section = document.querySelector(".how-we-work");
    const cards = document.querySelectorAll(".how-we-work__card");
    const icons = document.querySelectorAll(".how-we-work__icon");

    if (!section || cards.length !== icons.length) {
        console.error("Section or number of cards/icons is mismatched!");
        return;
    }

    const setActiveIcon = () => {
        const sectionRect = section.getBoundingClientRect();

        // Before the section: Always show the first icon
        if (sectionRect.top > 0) {
            icons.forEach((icon, index) => {
                icon.classList.toggle("active", index === 0);
            });
            return;
        }

        // After the section: Always show the last icon
        if (sectionRect.bottom <= window.innerHeight) {
            icons.forEach((icon, index) => {
                icon.classList.toggle("active", index === icons.length - 1);
            });
            return;
        }

        // Inside the section: Activate the appropriate icon
        let activeIndex = -1;

        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (
                rect.top <= window.innerHeight / 2 &&
                rect.bottom >= window.innerHeight / 2
            ) {
                activeIndex = index;
            }
        });

        // Update active states for icons
        icons.forEach((icon, index) => {
            if (activeIndex !== -1) {
                icon.classList.toggle("active", index === activeIndex);
            } else {
                icon.classList.remove("active");
            }
        });
    };

    // Attach scroll event
    window.addEventListener("scroll", setActiveIcon);

    // Initialize on load
    setActiveIcon();
}

handleDynamicIconsSwitch();
