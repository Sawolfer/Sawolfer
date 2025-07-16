// Dark Mode Toggle
      const darkModeToggle = document.getElementById("darkModeToggle");
      const body = document.body;

      // Check for saved user preference
      if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }

      darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
          localStorage.setItem("darkMode", "enabled");
          darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
          localStorage.setItem("darkMode", "disabled");
          darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
      });

      // Intersection Observer for scroll animations
      const sections = document.querySelectorAll(".section");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      sections.forEach((section) => {
        observer.observe(section);
      });

      // Project Modal
      const projectCards = document.querySelectorAll(".project-card");
      const projectModal = document.getElementById("projectModal");
      const modalClose = document.getElementById("modalClose");
      const modalTitle = document.getElementById("modalTitle");
      const modalSubtitle = document.getElementById("modalSubtitle");
      const modalImage = document.getElementById("modalImage");
      const modalDescription = document.getElementById("modalDescription");
      const modalTechBadges = document.getElementById("modalTechBadges");

      // Project data
      const projects = {
        fluently: {
          title: "Fluently",
          subtitle: "AI-powered English learning app",
          image:
              // "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
              "assets/Fluently/screens.png",
          description:
            "Fluently is an innovative English learning application that creates personalized study programs based on user preferences and current knowledge level. The app features adaptive learning algorithms, interactive lessons, and progress tracking. I built the entire iOS application from scratch using SwiftUI for the interface, implementing Google Sign-In for authentication, URLSession for network requests, and KeyChain for secure credential storage. The app uses SwiftData for local persistence and UserDefaults for simple preference storage.",
          features: [
            "Personalized learning paths based on user level and goals",
            "Interactive exercises with speech recognition",
            "Progress tracking with detailed analytics",
            "Offline mode with synchronized data",
          ],
          tech: ["SwiftUI", , "VIPER", "KeyChain", "SwiftData", "URLSession"],
        },
        lumina: {
          title: "Lumina Tech",
          subtitle: "Calendar management with AI assistant",
          image:
              // "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
              "assets/Luminia/screens.png",
          description:
            "Lumina Tech is a smart calendar application developed for a startup that helps users manage their schedules with the assistance of an AI. The app analyzes your calendar patterns, suggests optimal meeting times, and can even draft email responses. I was responsible for the iOS development, creating the interface with SwiftUI and implementing EventKit for calendar integration. The app uses SwiftData for local caching and KeyChain for secure storage of credentials. Communication with the AI server is handled through URLSession with proper error handling and retry mechanisms.",
          features: [
            "AI-powered scheduling suggestions",
            "Natural language event creation",
            "Cross-platform calendar synchronization",
            "Smart reminders and follow-ups",
          ],
          tech: ["SwiftUI", "EventKit", "VIPER", "SwiftData", "URLSession"],
        },
        friends: {
          title: "Friends",
          subtitle: "Social app for managing meetups and debts",
          image:
              // "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            "assets/Friends/screens.png",
          description:
            "Friends is a social application developed during an intensive course by Yandex and Sirius. The app helps groups of friends organize meetups, track shared expenses, and maintain connections. I developed several UIKit-based screens including the friend list and expense tracking interfaces. The app connects to a Firebase backend for data storage and synchronization. I implemented the network layer for API communication and used Keychain for secure authentication token storage. For caching user data, I utilized FileManager with proper serialization.",
          features: [
            "Group expense tracking with automatic splits",
            "Event planning with RSVP functionality",
            "Friend connections and activity feed",
            "Push notifications for important updates",
          ],
          tech: ["UIKit", "Firebase", "Keychain", "FileManager"],
        },
        touchpad: {
          title: "Touchpad for MacBook",
          subtitle: "Use your iOS device as a wireless trackpad",
          image:
              // "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
            "assets/TouchPad/screens.png",
          description:
            "This innovative application transforms your iOS device into a wireless trackpad for your MacBook. I developed both the iOS app (using UIKit) and the companion macOS application. The two devices communicate seamlessly using MultipeerConnectivity, providing low-latency cursor control. The iOS app features customizable sensitivity settings, gesture support, and even includes optional keyboard functionality. I implemented smooth animations for cursor movement feedback and optimized the networking layer for minimal battery impact.",
          features: [
            "Precise cursor control with adjustable sensitivity",
            "Multi-touch gesture support (scroll, swipe, etc.)",
            "Optional on-screen keyboard mode",
            "Low-latency Bluetooth/WiFi connection",
          ],
          tech: ["UIKit", "MultipeerConnectivity"],
          },
        // todolist: {
        //   title: "ToDo-List",
        //   subtitle: "Simple and pretty notes app",
        //   image:
        //       // "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
        //     "assets/ToDo-List/screens.png",
        //   description:
        //     "This innovative application transforms your iOS device into a wireless trackpad for your MacBook. I developed both the iOS app (using UIKit) and the companion macOS application. The two devices communicate seamlessly using MultipeerConnectivity, providing low-latency cursor control. The iOS app features customizable sensitivity settings, gesture support, and even includes optional keyboard functionality. I implemented smooth animations for cursor movement feedback and optimized the networking layer for minimal battery impact.",
        //   features: [
        //     "Precise cursor control with adjustable sensitivity",
        //     "Multi-touch gesture support (scroll, swipe, etc.)",
        //     "Optional on-screen keyboard mode",
        //     "Low-latency Bluetooth/WiFi connection",
        //   ],
        //   tech: ["UIKit", "MultipeerConnectivity"],
        // },
      };

      // Open modal when project card is clicked
      projectCards.forEach((card) => {
        card.addEventListener("click", () => {
          const projectId = card.getAttribute("data-project");
          const project = projects[projectId];

          modalTitle.textContent = project.title;
          modalSubtitle.textContent = project.subtitle;
          modalImage.src = project.image;
          modalDescription.textContent = project.description;

          // Update features
          const featuresContainer = document.querySelector(".modal-features");
          featuresContainer.innerHTML = "<h3>Key Features:</h3>";

          project.features.forEach((feature) => {
            const featureElement = document.createElement("div");
            featureElement.className = "modal-feature";
            featureElement.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <span>${feature}</span>
                    `;
            featuresContainer.appendChild(featureElement);
          });

          // Update tech badges
          modalTechBadges.innerHTML = "";
          project.tech.forEach((tech) => {
            const badge = document.createElement("span");
            badge.className = "tech-badge";
            badge.textContent = tech;
            modalTechBadges.appendChild(badge);
          });

          projectModal.classList.add("active");
          document.body.style.overflow = "hidden";
        });
      });

      // Close modal
      modalClose.addEventListener("click", () => {
        projectModal.classList.remove("active");
        document.body.style.overflow = "auto";
      });

      // Close modal when clicking outside content
      projectModal.addEventListener("click", (e) => {
        if (e.target === projectModal) {
          projectModal.classList.remove("active");
          document.body.style.overflow = "auto";
        }
      });

      // Animate skill bars when they come into view
      const skillBars = document.querySelectorAll(".skill-progress");
      const skillBarObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const width = entry.target.style.width;
              entry.target.style.width = "0";
              setTimeout(() => {
                entry.target.style.width = width;
              }, 100);
            }
          });
        },
        {
          threshold: 0.5,
        }
      );

      skillBars.forEach((bar) => {
        skillBarObserver.observe(bar);
      });