"use strict";

/**
 * Light and dark mode
 */
const $themeBtn = document.querySelector("[data-theme-btn]");
const $HTML = document.documentElement;
let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (sessionStorage.getItem("theme")) {
    $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
    $HTML.dataset.theme = isDark ? "dark" : "light";
}

const changeTheme = () => {
    $HTML.dataset.theme =
        sessionStorage.getItem("theme") === "light" ? "dark" : "light";
    sessionStorage.setItem("theme", $HTML.dataset.theme);
};

$themeBtn.addEventListener("click", changeTheme);

/**
 * TAB LOGIC
 */
const $tabBtn = document.querySelectorAll("[data-tab-btn]");
let [lastActiveTab] = document.querySelectorAll("[data-tab-content]");
let [lastActiveTabBtn] = $tabBtn;

$tabBtn.forEach((i) => {
    i.addEventListener("click", function () {
        lastActiveTab.classList.remove("active");
        lastActiveTabBtn.classList.remove("active");

        const $tabContent = document.querySelector(
            `[data-tab-content="${i.dataset.tabBtn}"]`
        );
        $tabContent.classList.add("active");
        this.classList.add("active");
        lastActiveTab = $tabContent;
        lastActiveTabBtn = this;
    });
});

/**
 * ------------------------------------------------
 * #EMPTY STATE LOGIC (NEW)
 * ------------------------------------------------
 * Function to check if lists are empty and toggle the cartoon view
 */
function checkEmptyStates() {
    // Configuration for each tab:
    // - scope: The tab content container
    // - itemsToCheck: selector for items inside (to count them)
    // - container: The wrapper of the content (to hide if empty)
    // - emptyState: The empty state div (to show if empty)
    const checks = [
        {
            // Projects
            scope: document.querySelector('[data-tab-content="project"]'),
            itemsToCheck: ".card",
            container: ".content-container",
        },
        {
            // Resume
            scope: document.querySelector('[data-tab-content="resume"]'),
            itemsToCheck: ".resume-item, .resume-buttom-item",
            container: ".content-container",
        },
        {
            // Contact
            scope: document.querySelector('[data-tab-content="contact"]'),
            itemsToCheck: ".contact-info-item",
            container: ".content-container",
        },
    ];

    checks.forEach((check) => {
        if (!check.scope) return; // Guard clause if element missing

        const items = check.scope.querySelectorAll(check.itemsToCheck);
        const container = check.scope.querySelector(check.container);
        const emptyState = check.scope.querySelector(".empty-state");

        if (items.length === 0) {
            // It is empty
            if (container) container.style.display = "none";
            if (emptyState) emptyState.classList.add("visible");
        } else {
            // It has items
            if (container) container.style.display = "block"; // or grid/initial depending on layout
            if (emptyState) emptyState.classList.remove("visible");
        }
    });
}

// Run on load
window.addEventListener("DOMContentLoaded", checkEmptyStates);
