// The window load event runs when the entire web page has been loaded.
window.addEventListener('DOMContentLoaded', () => {

    const tabList = document.querySelector('[role="tablist"]'); // Gets tabList element from HTML
    const tabs = tabList.querySelectorAll(':scope > [role="tab"]'); // Gets all tabs from the tabList

    tabs.forEach((tab) => {tab.addEventListener("click", changeTabs)}); // Creates an event for each tab when clicked
})

// Change Tab function
function changeTabs(e) {
    const targetTab = e.target; // Sets target tab to default 
    const tabList = targetTab.parentNode;   // Sets tabList to the parent element of the tab
    const tabPanel = tabList.parentNode;    // Sets tabPanel to the parent element of the tabList
    
    // Removes all current selected tabs
    tabList
        .querySelectorAll(':scope > [aria-selected="true"]')
        .forEach((t) => t.setAttribute("aria-selected", false));

    // Sets the clicked tab as selected
    targetTab
        .setAttribute("aria-selected", true)

    // Hides all tab panels
    tabPanel
        .querySelectorAll(':scope > [role="tabpanel"]')
        .forEach((p) => p.setAttribute("hidden", true));

    // Displays the selected panel on Click
    tabPanel
        .querySelector(`#${targetTab.getAttribute("aria-controls")}`)
        .removeAttribute("hidden");
}