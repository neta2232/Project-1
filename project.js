
function addmissionote(e) {
    let notesarr = JSON.parse(localStorage.getItem('missions')) || [];
    let datearr = JSON.parse(localStorage.getItem('dates')) || [];
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
    });

    if (document.querySelector('#missiondetails').value !== "" &&
        document.querySelector('#dateinput').value !== "" &&
        document.querySelector('#hourinput').value !== "") {

            document.addEventListener('DOMContentLoaded', () => {
                const dateInput = document.querySelector('#dateinput');
                const today = new Date();
                const yyyy = today.getFullYear();
                const mm = String(today.getMonth() + 1).padStart(2, '0'); 
                const dd = String(today.getDate()).padStart(2, '0'); 
                dateInput.value = `${yyyy}-${mm}-${dd}`;
            });

        let missiond = document.querySelector('#missiondetails').value;
        let deadlinedate = String(document.querySelector('#dateinput').value);
        let deadlinehour = document.querySelector('#hourinput').value;

        let updatdeadline = new Date(deadlinedate);
        let theday = updatdeadline.getDate();
        let themonth = updatdeadline.getMonth() + 1;
        let theyear = updatdeadline.getFullYear();
        let fulldate = `${String(theday).padStart(2, '0')}/${String(themonth).padStart(2, '0')}/${theyear}`;
        let notedate = `${deadlinedate}T${deadlinehour}`;

        let notes = document.querySelector('#notescontainer');
        let newnote = document.createElement('div');
        let thenote = document.createElement('div');
        thenote.classList.add('card');
        thenote.classList.add('fadeIn');
        newnote.style.display = 'flex';

        thenote.innerHTML = `
            <button class="closebtn"></button>
            <p id="notetitle"><strong>New Mission</strong></p>
            <p id="notedetails">${missiond}</p>
            <p class="notesetting card-footer">${fulldate} at ${deadlinehour}</p>
        `;

        notes.appendChild(newnote);
        newnote.appendChild(thenote);
        CloseButtonActions(newnote, notesarr.length);

        notesarr.push(newnote.innerHTML);
        datearr.push(notedate);
        localStorage.setItem('missions', JSON.stringify(notesarr));
        localStorage.setItem('dates', JSON.stringify(datearr));
    }
}

function clearform() {
    document.querySelector('#missiondetails').value = "";
    document.querySelector('#dateinput').value = "";
    document.querySelector('#hourinput').value = "";
}

function showmission() {
document.querySelector('input[type="date"]').setAttribute('lang', 'en');
    let notesarr = JSON.parse(localStorage.getItem('missions')) || [];
    let datearr = JSON.parse(localStorage.getItem('dates')) || [];
    const currentDateTime = new Date();
    const notesContainer = document.querySelector('#notescontainer');
    notesContainer.innerHTML = "";

    let validNotes = [];
    let validDates = [];

    notesarr.forEach((noteHTML, index) => {
            const deadline = new Date(datearr[index]);
            if (deadline != "Invalid Date" && deadline >= currentDateTime){
            if (deadline >= currentDateTime) {
                validNotes.push(noteHTML);
                validDates.push(datearr[index]);

                const noteElement = document.createElement('div');
                noteElement.innerHTML = noteHTML;
                notesContainer.appendChild(noteElement);
                CloseButtonActions(noteElement, validNotes.length - 1);
            }
        }
    });

    localStorage.setItem('missions', JSON.stringify(validNotes));
    localStorage.setItem('dates', JSON.stringify(validDates));
}

function CloseButtonActions(noteElement, index) {
    const btnclose = noteElement.querySelector('.closebtn');
    const thenote = noteElement.querySelector('.card');

    if (btnclose && thenote) {
        btnclose.addEventListener('click', () => {
            thenote.classList.add('fadeOut');
            setTimeout(() => {
                noteElement.remove();
                let notesarr = JSON.parse(localStorage.getItem('missions')) || [];
                let datearr = JSON.parse(localStorage.getItem('dates')) || [];
                notesarr.splice(index, 1);
                datearr.splice(index, 1);
                localStorage.setItem('missions', JSON.stringify(notesarr));
                localStorage.setItem('dates', JSON.stringify(datearr));
            }, 1000);
        });

        thenote.addEventListener('mouseover', () => {
            btnclose.style.display = 'block';
        });

        thenote.addEventListener('mouseleave', () => {
            btnclose.style.display = 'none';
        });
    }
}

function setmindate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    document.querySelector('#dateinput').min = today;
}















    






   


