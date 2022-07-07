window.addEventListener('DOMContentLoaded', (event) => {
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
        document.querySelector('.wagte-display').append(wagList)
    })

    let deleteWag = (e) => {
        const data = { wagnaam: e.target.value};
        console.log(data)
        
        fetch('deleteWag', {
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
});

