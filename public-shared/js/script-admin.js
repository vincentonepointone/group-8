window.addEventListener('DOMContentLoaded', (event) => {
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const addWagButton = document.getElementById('addWagButton');
const wagKleurSelectValue = document.getElementById('wagKleurSelect').value;

if(!localStorage.getItem('nav')) {
  localStorage.setItem('nav', 0)
} else {
  nav = parseInt(localStorage.getItem('nav'), 10);
}
function loadWagteList() {
  fetch('/wagte')
  .then(response => response.json())
  .then(data => {
    const wagList = document.createElement('ul');
    wagList.classList.add('list-group');
    wagList.classList.add('mb-4');
    
    data.forEach(element => {
      const wagDeleteButton = document.createElement('button');
      wagDeleteButton.classList.add('btn', 'btn-outline-danger');
      wagDeleteButton.setAttribute('id','wag-delete-button')
      wagDeleteButton.setAttribute('type', 'button');
      wagDeleteButton.innerText = "X";
      wagDeleteButton.addEventListener('click', deleteWag);
      wagDeleteButton.setAttribute('value', element.wagname)
      let listItem = document.createElement('li');
      listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');
      const ptag = document.createElement('p');
      ptag.innerText = element.wagname;
      ptag.classList.add('waglist-name')
      listItem.appendChild(ptag);
      listItem.appendChild(wagDeleteButton);
      wagList.appendChild(listItem)
    });
      document.querySelector('.wagte-display').innerHTML = "";
      document.querySelector('.wagte-display').append(wagList)
  })

  let deleteWag = (e) => {
      const data = { wagnaam: e.target.value};
      fetch('/deleteWag', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response)
        .then(data => {
          loadWagteList();
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }
}
loadWagteList();


//Adding Wagte Upload From spa modding 
addWagButton.addEventListener('click', (e) => {
  e.preventDefault();

  const wagKleurSelectValue = document.getElementById('wagKleurSelect').value;
  const wagnaamInputvalue = document.getElementById('wagnaamInput').value;
  if(wagKleurSelectValue == "Kleur" || wagnaamInputvalue == "") {
    const wagteAddForm = document.querySelector('.wagte-add-form');

    wagteAddFormErrorMessage = document.createElement('h6');
    wagteAddFormErrorMessage.innerText = "Choose a Color and add a name";
    wagteAddFormErrorMessage.classList.add('bg-warning');
    wagteAddForm.append(wagteAddFormErrorMessage)
  } else {
    const data = { 
      wagnaam: wagnaamInputvalue,
      wagKleur: wagKleurSelectValue,
    };
    fetch('/newWag', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response)
    .then(data => {
      loadWagteList();
      getWagte();
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });    
  }
})


function getWagte(){
  fetch('/wagte')
    .then(response => response.json())
    .then(data => {

      console.log(data,'getwagfunction')
      localStorage.setItem('wagte', JSON. stringify(data))
    })
}

getWagte();

function openModal(date,e,el) {
  console.log(e.target.previousSibling)
  clicked = date;
  // const eventForDay = events.find(e => e.date === clicked);
  fetch('/getDays')
  .then(response => response.json())
  .then(data => {
    var shifts = data;
    console.log(clicked)
    const eventForDay = shifts.find(e => e.date === clicked);
    
    const clickedDayArray = clicked.split("/");
    const previousDay = `${clickedDayArray[0]}/${clickedDayArray[1] -1}/${clickedDayArray[2]}`;
   const previousNightShiftGuards = shifts.find(e => e.date === previousDay);
   const disableGuard = [];
   if(previousNightShiftGuards){
        
      for (const key in previousNightShiftGuards.wagte) {
      previousNightShiftGuards.wagte[key]
      if (previousNightShiftGuards.wagte[key].includes('Nag')) {
          disableGuard.push(key)
      }   
   }

}

 
  if (eventForDay) {
    document.getElementById('deleteEventModalHeading').innerText = date;
    deleteEventModal.style.display = 'block';
  } else {
    document.getElementById('newEventModalHeading').innerText = date;
    newEventModal.style.display = 'block';

    const wagte = JSON.parse(localStorage.getItem('wagte'));
    console.log(typeof wagte)
    // fetch('/wagte')
    // .then(response => response.json())
    // .then(data => {
       const wagList = document.createElement('ul');
       wagList.classList.add('list-group');
       wagList.classList.add('mb-4');
        wagte.forEach(element => {
            let listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-around');
            //Dayshift Radio
            const radioInputDay = document.createElement('input');
            if(disableGuard.includes(element.wagname)){
              radioInputDay.setAttribute('disabled','');
            }
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
    // })
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

        const dayShiftDiv = document.createElement('div');
        dayShiftDiv.classList.add('dayShiftDiv','border-bottom');
        const dayIcon= document.createElement('div');
        dayIcon.classList.add('day-Icon')
        dayIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16">
                                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                                  </svg>`
        dayShiftDiv.append(dayIcon);
        dayShiftDiv.classList.add('d-flex','flex-row');


        const nightShiftDiv = document.createElement('div');
        nightShiftDiv.classList.add('nightShiftDiv','border-bottom');
        const nightIcon = document.createElement('div');
        nightIcon.classList.add('night-Icon')
        nightIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
                                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                                </svg>`
  
        nightShiftDiv.append(nightIcon);
        nightShiftDiv.classList.add('d-flex','flex-row');

        const offShiftDiv = document.createElement('div');
        offShiftDiv.classList.add('offShiftDiv');
        const offIcon = document.createElement('div');
        offIcon.classList.add('off-Icon');
        offIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-heart" viewBox="0 0 16 16">
                                <path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982Z"/>
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                              </svg>`
    
        offShiftDiv.append(offIcon);
        offShiftDiv.classList.add('d-flex','flex-row');

        const errShiftDiv = document.createElement('div');
        errShiftDiv.classList.add('errShiftDiv');
        const errIcon = document.createElement('div');
        errIcon.innerText = 'Err'
        errShiftDiv.append(errIcon);

        const dayNamesDiv = document.createElement('div');
        dayNamesDiv.classList.add('w-100')
        const nightNamesDiv = document.createElement('div');
        nightNamesDiv.classList.add('w-100')
        const offNamesDiv = document.createElement('div');
        offNamesDiv.classList.add('w-100')
      
 
        daySquare.append(dayShiftDiv);
        daySquare.append(nightShiftDiv);
        daySquare.append(offShiftDiv);
        for (let key in eventForDay.wagte) {
          const eventParent = document.createElement('div');
          eventParent.classList.add('eventParent');

          const eventDiv = document.createElement('div');
          const myArray = eventForDay.wagte[key].split(",");
          eventDiv.classList.add('event',myArray[1]);
          eventDiv.innerText = `${key}`;
          
          switch (myArray[0]) {
            case "Dag":
              dayNamesDiv.append(eventDiv);
              dayShiftDiv.append(dayNamesDiv);
              
              break;
            case "Nag":
              nightNamesDiv.append(eventDiv);
              nightShiftDiv.append(nightNamesDiv);
              
              break;
            case "Off":
              offNamesDiv.append(eventDiv);
              offShiftDiv.append(offNamesDiv);
              
              break;          
            default: 
              errShiftDiv.append(eventDiv);
              errShiftDiv.innerText += "err";
              daySquare.appendChild(errShiftDiv);
              break;
          }

          // daySquare.appendChild(eventDiv);
      }
      }

      daySquare.addEventListener('click', (e) => openModal(dayString,e));
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
    load();
    closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    localStorage.setItem('nav', nav);
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    localStorage.setItem('nav', nav);
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();
});