

let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;
  // const eventForDay = events.find(e => e.date === clicked);
  fetch('/getDays')
  .then(response => response.json())
  .then(data => {
    var shifts = data;
    const eventForDay = shifts.find(e => e.date === clicked);
    console.log(eventForDay)
    
      if (eventForDay) {
        document.getElementById('deleteEventModalHeading').innerText = date;
    deleteEventModal.style.display = 'block';
  } else {
    document.getElementById('newEventModalHeading').innerText = date;
    newEventModal.style.display = 'block';
    fetch('/wagte')
    .then(response => response.json())
    .then(data => {
       const wagList = document.createElement('ul');
       wagList.classList.add('list-group');
       wagList.classList.add('mb-4');
        data.forEach(element => {
            let listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-around');
            //Dayshift Radio
            const radioInputDay = document.createElement('input');
            radioInputDay.setAttribute('type','radio');
            radioInputDay.setAttribute('name', `${element.wagname}`);
            radioInputDay.setAttribute('value', `Dag,${element.wagkleur}`);
            radioInputDay.setAttribute('autocomplete', 'off');
            radioInputDay.classList.add('btn-check');
            radioInputDay.setAttribute('id', `${element.wagname}-dag`);
            const radioLabelDay = document.createElement('label');
            radioLabelDay.classList.add('btn', 'btn-outline-warning');
            radioLabelDay.setAttribute('for', `${element.wagname}-dag`);
            radioLabelDay.innerText = "Dag";
            listItem.innerText = element.wagname;
            listItem.appendChild(radioInputDay);
            listItem.appendChild(radioLabelDay);
            //Nightshift Radio
            const radioInput = document.createElement('input');
            radioInput.setAttribute('type','radio');
            radioInput.setAttribute('name', `${element.wagname}`);
            radioInput.setAttribute('value', `Nag,${element.wagkleur}`);
            radioInput.setAttribute('autocomplete', 'off');
            radioInput.classList.add('btn-check');
            radioInput.setAttribute('id', `${element.wagname}-nag`);
            const radioLabel = document.createElement('label');
            radioLabel.classList.add('btn', 'btn-outline-dark');
            radioLabel.setAttribute('for', `${element.wagname}-nag`);
            radioLabel.innerText = "Nag";
            listItem.appendChild(radioInput);
            listItem.appendChild(radioLabel);
  
            //OffShift Radio
            const radioInputOff = document.createElement('input');
            radioInputOff.setAttribute('type','radio');
            radioInputOff.setAttribute('name', `${element.wagname}`);
            radioInputOff.setAttribute('value', `Off,${element.wagkleur}`);
            radioInputOff.setAttribute('autocomplete', 'off');
            radioInputOff.classList.add('btn-check');
            radioInputOff.setAttribute('id', `${element.wagname}-off`);
            const radioLabelOff = document.createElement('label');
            radioLabelOff.classList.add('btn', 'btn-outline-primary');
            radioLabelOff.setAttribute('for', `${element.wagname}-off`);
            radioLabelOff.innerText = "off";
            listItem.appendChild(radioInputOff);
            listItem.appendChild(radioLabelOff);
            
            wagList.appendChild(listItem)
        });
        const dateInput = document.createElement('input');
        dateInput.setAttribute('value', date)
        dateInput.setAttribute('name', 'date');
        dateInput.setAttribute('type', 'text');
        dateInput.setAttribute('id', 'date')
        wagList.appendChild(dateInput)
        document.querySelector('.wagte-pick-model').append(wagList);
    })
  }
})
  
  


  backDrop.style.display = 'block';
}

function load() {
  fetch('/getDays')
  .then(response => response.json())
  .then(data => {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) { 
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      const dayNumberSquare = document.createElement('p');
      dayNumberSquare.classList.add('day-numbers');
      dayNumberSquare.classList.add('day-number-square');
      dayNumberSquare.innerText = i - paddingDays;
      daySquare.append(dayNumberSquare);
    
      const eventForDay = data.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }
    
      if (eventForDay) {
        for (let key in eventForDay.wagte) {
          const eventDiv = document.createElement('div');
          const myArray = eventForDay.wagte[key].split(",");
          eventDiv.classList.add('event',myArray[1]);
          eventDiv.innerText = `${key} ${myArray[0]}`;
          daySquare.appendChild(eventDiv);
      }
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }

  })

}

function closeModal() {
  document.querySelector('.wagte-pick-model').innerHTML = ""; 
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  clicked = null;
  load();
}

function saveEvent() {

  fetch('/wagte')
  .then(response => response.json())
  .then(data => {
     const wagList = document.createElement('ul');
     wagList.classList.add('list-group');
     wagList.classList.add('mb-4');
      data.forEach(element => {

      });
      document.querySelector('.wagte-pick-model').append(wagList);
  })
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent(e) {
 
  let headingDate = document.getElementById('deleteEventModalHeading').innerText;
  const data = { date: headingDate};
  console.log(data)
  fetch('/deleteDay', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();
