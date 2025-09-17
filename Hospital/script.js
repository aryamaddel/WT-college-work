// Helper to fetch and update lists
async function fetchAndRender(endpoint, listId, renderFn) {
  const res = await fetch(endpoint);
  const data = await res.json();
  const list = document.getElementById(listId);
  list.innerHTML = '';
  data.forEach(item => list.appendChild(renderFn(item)));
}

// Render doctor item
function renderDoctor(doctor) {
  const li = document.createElement('li');
  li.textContent = `${doctor.id}: ${doctor.name} (${doctor.specialty})`;
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.onclick = async () => {
    await fetch(`/doctors/${doctor.id}`, { method: 'DELETE' });
    fetchAndRender('/doctors', 'doctor-list', renderDoctor);
  };
  li.appendChild(delBtn);
  return li;
}

// Render patient item
function renderPatient(patient) {
  const li = document.createElement('li');
  li.textContent = `${patient.id}: ${patient.name} (Doctor: ${patient.doctorId})`;
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.onclick = async () => {
    await fetch(`/patients/${patient.id}`, { method: 'DELETE' });
    fetchAndRender('/patients', 'patient-list', renderPatient);
  };
  li.appendChild(delBtn);
  return li;
}

// Render appointment item
function renderAppointment(appt) {
  const li = document.createElement('li');
  li.textContent = `${appt.id}: Patient ${appt.patientId}, Doctor ${appt.doctorId}, Date: ${appt.date}`;
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.onclick = async () => {
    await fetch(`/appointments/${appt.id}`, { method: 'DELETE' });
    fetchAndRender('/appointments', 'appointment-list', renderAppointment);
  };
  li.appendChild(delBtn);
  return li;
}

// Form handlers

document.getElementById('doctor-form').onsubmit = async e => {
  e.preventDefault();
  const id = document.getElementById('doctor-id').value;
  const name = document.getElementById('doctor-name').value;
  const specialty = document.getElementById('doctor-specialty').value;
  await fetch('/doctors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, specialty })
  });
  fetchAndRender('/doctors', 'doctor-list', renderDoctor);
  e.target.reset();
};

document.getElementById('patient-form').onsubmit = async e => {
  e.preventDefault();
  const id = document.getElementById('patient-id').value;
  const name = document.getElementById('patient-name').value;
  const doctorId = document.getElementById('patient-doctorId').value;
  await fetch('/patients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, doctorId })
  });
  fetchAndRender('/patients', 'patient-list', renderPatient);
  e.target.reset();
};

document.getElementById('appointment-form').onsubmit = async e => {
  e.preventDefault();
  const id = document.getElementById('appointment-id').value;
  const patientId = document.getElementById('appointment-patientId').value;
  const doctorId = document.getElementById('appointment-doctorId').value;
  const date = document.getElementById('appointment-date').value;
  await fetch('/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, patientId, doctorId, date })
  });
  fetchAndRender('/appointments', 'appointment-list', renderAppointment);
  e.target.reset();
};

// Initial render
fetchAndRender('/doctors', 'doctor-list', renderDoctor);
fetchAndRender('/patients', 'patient-list', renderPatient);
fetchAndRender('/appointments', 'appointment-list', renderAppointment);
