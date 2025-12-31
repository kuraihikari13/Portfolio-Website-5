# PROJECT SEV7NSECONDS

#### **Video Demo**: [https://youtu.be/Crs41sXmz6s](https://youtu.be/Crs41sXmz6s)

## 🎞️ Overview
**PROJECT SEV7NSECONDS** is a cinematic, frontend-only web project created as a final submission for **CS50x**. 

This project redefines the traditional digital portfolio. Instead of a static collection of links, it is designed as an *experience-first* narrative. It targets digital artists and creatives who want to leave a lasting impression by immersing the visitor in a sequence of transitions, glitch aesthetics, and timed reveals. The site behaves more like an interactive film intro than a conventional webpage, using motion and rhythm to guide the user into the creative world of the artist.

---

## 💡 Project Motivation: The Storytelling Portfolio
The core motivation was a simple question: *How can a portfolio feel like a story?*

Standard portfolios often feel like resumes in a browser. For this project, inspiration was drawn heavily from the visual language of **Cyberpunk: Edgerunners**. I wanted to capture the "digital fragility" found in that genre—where UI elements feel unstable, emotional, and alive. 

Key influences include:
* **Intentional Instability**: Using glitches not as technical errors, but as a design language representing memory and digital legacy.
* **Atmospheric Timing**: Using silence and deliberate delays to build anticipation before a reveal.
* **Cinematic Pacing**: Forcing the user to slow down and experience the transitions rather than just scrolling past the content.

---

## 🛠️ Technical Implementation & Logic
While the project appears visually complex, it is built on a streamlined stack of **HTML5, CSS3, JavaScript, and Vue.js**.

### 🧩 The Scramble Algorithm
The "heartbeat" of the project is the text-scrambling logic found in `app.js`. Unlike a simple random string generator, this algorithm works through a progressive "locking" mechanism. 
1. The script replaces the target text with random symbols from a predefined character set.
2. It uses an interval to cycle these symbols rapidly.
3. Gradually, it "resolves" the characters from left to right, locking the correct letters into place until the full string is revealed.
4. This creates the illusion of a computer system decrypting or recovering corrupted data.



### 🔄 Vue-Driven Phase Management
To handle the cinematic flow, I used **Vue.js** via CDN. Vue’s reactive state allows the site to move through different "Phases":
* **Phase 1 (Start)**: The initial quiet state.
* **Phase 2 (Intro)**: The trigger of the scramble animations.
* **Phase 3 (Glitch)**: The peak of visual disruption.
* **Phase 4 (Main)**: The transition into the portfolio interface.

By binding classes and visibility to these phases, I ensured that the DOM remains clean and that animations only fire when the user is ready for them.

### 🎨 CSS Animation Architecture
The visual "flicker" and "glitch" effects are handled entirely in `style.css` using `@keyframes`. 
* **The Glitch Effect**: I utilized the `clip-path` property to slice the text into layers, shifting them horizontally at micro-intervals to simulate a scanning error.
* **The Flicker**: By manipulating opacity levels (e.g., `0.9` to `1.0`) at irregular intervals, I created a "neon light" effect that prevents the site from feeling static.



---

## 🚧 Challenges and Debugging
Building a project that relies so heavily on timing presented unique challenges:

1. **The "Race Condition" of Animations**: In early builds, the scramble logic would sometimes finish before the CSS transitions were complete. I had to implement `setTimeout` logic within Vue's lifecycle hooks to ensure that the visual "handshake" between JavaScript and CSS was seamless.
2. **Audio Synchronization**: Integrating the audio cues required careful handling of browser auto-play policies. I resolved this by tethering the audio start to the initial user click ("ENTER"), ensuring the cinematic experience begins with both sound and vision in sync.
3. **Single-File Complexity**: To keep the project portable, I chose to keep the code in a single file structure. Organizing over 300 lines of CSS alongside complex JS logic required strict commenting and a modular approach to function naming to prevent the code from becoming unreadable.

---

## 📁 Project Structure
The repository is organized to highlight the logic-heavy nature of the frontend:
* **`index.html`**: The semantic skeleton. It includes the Vue mounting point and the layout for the different sequence phases.
* **`style.css`**: Contains all "cinematic" logic, including custom fonts, keyframe animations, and layout grids.
* **`app.js`**: The controller. It manages the scramble effects, timing, and the state-switching logic that drives the intro.

---

## 🚀 How to Run
1. **Clone** this repository to your local machine.
2. Open `index.html` in a modern web browser (Chrome or Firefox recommended for optimal animation performance).
3. **Important**: Turn on your volume. The project uses audio cues to complete the cinematic atmosphere.

---

## 🎓 Reflection: This was CS50
This project represents the culmination of my journey through CS50. It took the logical problem-solving skills I learned in C and SQL and applied them to a creative, frontend context. It proves that web development is not just about data and forms; it’s about creating an interface that feels human, flawed, and expressive.

**PROJECT SEV7NSECONDS** is a tribute to the "glitch" in the system—the reminder that behind every screen is a story.

**This was PROJECT SEV7NSECONDS. This was CS50.**
