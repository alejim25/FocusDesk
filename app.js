const form = document.querySelector('#session-form');
const subjectInput = document.querySelector('#subject');
const minutesInput = document.querySelector('#minutes');
const sessions = document.querySelector('#sessions');
const todayCount = document.querySelector('#today-count');
const storageKey = 'focusdesk-sessions';

let savedSessions = JSON.parse(localStorage.getItem(storageKey)) || [];

function showSessions() {
  sessions.innerHTML = '';

  savedSessions.forEach((savedSession, index) => {
    const session = document.createElement('div');
    session.className = 'session';

    const sessionText = document.createElement('span');
    sessionText.textContent = `Estudiaste ${savedSession.subject} durante ${savedSession.minutes} minutos`;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => {
      savedSessions.splice(index, 1);
      localStorage.setItem(storageKey, JSON.stringify(savedSessions));
      showSessions();
    });

    session.appendChild(sessionText);
    session.appendChild(deleteButton);
    sessions.appendChild(session);
  });

  const today = new Date().toISOString().slice(0, 10);
  const savedToday = savedSessions.filter((savedSession) => savedSession.date === today).length;
  todayCount.textContent = `Sesiones guardadas hoy: ${savedToday}`;
}

showSessions();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  savedSessions.push({
    subject: subjectInput.value,
    minutes: minutesInput.value,
    date: new Date().toISOString().slice(0, 10)
  });

  localStorage.setItem(storageKey, JSON.stringify(savedSessions));
  showSessions();
  form.reset();
  subjectInput.focus();
});
