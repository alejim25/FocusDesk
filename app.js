const form = document.querySelector("#session-form");
const subjectInput = document.querySelector("#subject");
const minutesInput = document.querySelector("#minutes");
const sessions = document.querySelector("#sessions");
const todayCount = document.querySelector("#today-count");
const weeklyChart = document.querySelector("#weekly-chart");
const storageKey = "focusdesk-sessions";

let savedSessions = JSON.parse(localStorage.getItem(storageKey)) || [];

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getLastSevenDays() {
  const today = new Date();

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - (6 - index),
    );

    return {
      date: formatLocalDate(date),
      label: date.toLocaleDateString("es-MX", {
        weekday: "short",
        day: "numeric",
      }),
    };
  });
}

function showWeeklyChart() {
  const days = getLastSevenDays();
  const minutesByDate = Object.fromEntries(days.map((day) => [day.date, 0]));

  savedSessions.forEach((savedSession) => {
    if (minutesByDate[savedSession.date] !== undefined) {
      minutesByDate[savedSession.date] += Number(savedSession.minutes) || 0;
    }
  });

  const minutes = days.map((day) => minutesByDate[day.date]);
  const maximum = Math.max(...minutes, 1);
  weeklyChart.innerHTML = "";

  days.forEach((day) => {
    const column = document.createElement("div");
    column.className = "chart-column";

    const value = document.createElement("span");
    value.className = "chart-value";
    value.textContent = `${minutesByDate[day.date]} min`;

    const bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.style.height = `${(minutesByDate[day.date] / maximum) * 100}%`;
    bar.title = `${day.label}: ${minutesByDate[day.date]} minutos`;

    const label = document.createElement("span");
    label.className = "chart-label";
    label.textContent = day.label;

    column.append(value, bar, label);
    weeklyChart.appendChild(column);
  });
}

function showSessions() {
  sessions.innerHTML = "";

  savedSessions.forEach((savedSession, index) => {
    const session = document.createElement("div");
    session.className = "session";

    const sessionText = document.createElement("span");
    sessionText.textContent = `Estudiaste ${savedSession.subject} durante ${savedSession.minutes} minutos`;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => {
      savedSessions.splice(index, 1);
      localStorage.setItem(storageKey, JSON.stringify(savedSessions));
      showSessions();
    });

    session.appendChild(sessionText);
    session.appendChild(deleteButton);
    sessions.appendChild(session);
  });

  const today = formatLocalDate(new Date());
  const savedToday = savedSessions.filter(
    (savedSession) => savedSession.date === today,
  ).length;
  todayCount.textContent = `Sesiones guardadas hoy: ${savedToday}`;
  showWeeklyChart();
}

showSessions();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  savedSessions.push({
    subject: subjectInput.value,
    minutes: minutesInput.value,
    date: formatLocalDate(new Date()),
  });

  localStorage.setItem(storageKey, JSON.stringify(savedSessions));
  showSessions();
  form.reset();
  subjectInput.focus();
});
