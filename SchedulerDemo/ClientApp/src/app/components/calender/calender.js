// // Import the CalendarComponent class if it's in a separate module
// // import { CalendarComponent } from './calendarComponent';

// const myCalendar = new CalendarComponent();
// const eventsContainer = document.getElementById('events');
// const addEventButton = document.getElementById('add-event');

// addEventButton.addEventListener('click', () => {
//     const title = prompt('Event Title:');
//     const dateStr = prompt('Event Date (YYYY-MM-DD):');
//     const description = prompt('Event Description:');

//     if (title && dateStr && description) {
//         const date = new Date(dateStr);
//         myCalendar.addEvent(title, date, description);
//         updateEventsList();
//     }
// });

// function updateEventsList() {
//     eventsContainer.innerHTML = '';
//     for (const event of myCalendar.events) {
//         const eventElement = document.createElement('div');
//         eventElement.innerHTML = `
//             <h3>${event.title}</h3>
//             <p>Date: ${event.date.toDateString()}</p>
//             <p>Description: ${event.description}</p>
//         `;
//         eventsContainer.appendChild(eventElement);
//     }
// }
