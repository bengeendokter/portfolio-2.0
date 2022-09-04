// TODO add third state "os default" and use some of the example code below

let lightModeState = false;

const button = document.querySelector(".btn")!;

// MediaQueryList object
const useLight = window.matchMedia("(prefers-color-scheme: light)");

// Toggles the "light_mode" class
function toggleLightMode(state: boolean)
{
    document.documentElement.classList.toggle("light_mode", state);
    lightModeState = state;
}

// Sets localStorage state
function setLightModeLocalStorage(state: boolean)
{
    localStorage.setItem("light_mode", state.toString());
}

// Initial setting
toggleLightMode(localStorage.getItem("light_mode") == "true");

// Listen for changes in the OS settings.
useLight.addEventListener("change", (evt) => toggleLightMode(evt.matches));

// Toggles the "light_mode" class on click and sets localStorage state
button.addEventListener("click", () =>
{
    lightModeState = !lightModeState;

    toggleLightMode(lightModeState);
    setLightModeLocalStorage(lightModeState);
});

export {};