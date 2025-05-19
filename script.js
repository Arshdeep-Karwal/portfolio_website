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

// Contact form script (sent to formspree.io) 
document.addEventListener('DOMContentLoaded', function() {
    
    // Variables to find elements by ID
    const contactForm = document.getElementById('contact_form');
    const thankYouMessage = document.getElementById('thank_you_message');
    const errorMessage = document.getElementById('error_message');

    // Prevent the default form submission loading page (occurs on submit)
    contactForm.addEventListener('submit', 
        function(event) {
        event.preventDefault(); 

        // Parses form data
        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
            'Accept': 'application/json' // Expect JSON response
            }
        })
        .then(response => response.json()) // Occurs after the fetch succeeds
            .then(data => {
                if (data.ok) { // Formspree sends { ok: "success" } on success
                thankYouMessage.style.display = 'flex'; // Show the thank you message
                contactForm.reset();

                // Reset the message after a few seconds
                setTimeout(() => {
                    thankYouMessage.style.display = 'none';
                }, 6000);

                } else {
                console.error('Formspree error:', data);
                errorMessage.style.display = 'flex'; // Show the error message

                // Reset the message after a few seconds
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 6000);
                }
            })
        .catch(error => {       // Occurs if the fetch does not succeed
            console.error('Fetch error:', error);
            errorMessage.style.display = 'flex';

            setTimeout(() => {
                    errorMessage.style.display = 'none';
            }, 6000);
        });
    });
});