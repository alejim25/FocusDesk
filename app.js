const form = document.querySelector('#session-form');
const subjectInput = document.querySelector('#subject');
const minutesInput = document.querySelector('#minutes');
const sessions = document.querySelector('#sessions');
const todayCount = document.querySelector('#today-count');
const storageKey = 'focusdesk-sessions';

let savedSessions = JSON.parse(localStorage.getItem(storageKey)) || [];

function showSessions() {
  sessions.innerHTML = '';

  savedSessions.forEach((savedSession) => {
    const session = document.createElement('div');
    session.className = 'session';
    session.textContent = `Estudiaste ${savedSession.subject} durante ${savedSession.minutes} minutos`;
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
