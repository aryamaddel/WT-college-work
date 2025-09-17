// Generic fetch + render
async function fetchAndRender(endpoint, listId, renderFn) {
  const res = await fetch(endpoint);
  const data = await res.json();
  const list = document.getElementById(listId);
  list.innerHTML = '';
  data.forEach(item => list.appendChild(renderFn(item, endpoint, listId, renderFn)));
}

// Create list item with delete button
function makeItem(text, endpoint, id, refreshFn, listId) {
  const li = document.createElement('li');
  li.textContent = text;
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.onclick = async () => {
    await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
    fetchAndRender(endpoint, listId, refreshFn);
  };
  li.appendChild(delBtn);
  return li;
}

// Renderers
const renderDoctor = d => makeItem(
  `${d.id}: ${d.name} (${d.specialty})`,
  '/doctors', d.id, renderDoctor, 'doctor-list'
);

const renderPatient = p => makeItem(
  `${p.id}: ${p.name} (Doctor: ${p.doctorId})`,
  '/patients', p.id, renderPatient, 'patient-list'
);

const renderAppointment = a => makeItem(
  `${a.id}: Patient ${a.patientId}, Doctor ${a.doctorId}, Date: ${a.date}`,
  '/appointments', a.id, renderAppointment, 'appointment-list'
);

// Generic form handler
function handleForm(formId, endpoint, listId, renderFn, fields) {
  document.getElementById(formId).onsubmit = async e => {
    e.preventDefault();
    const body = Object.fromEntries(fields.map(f => [f, document.getElementById(`${formId}-${f}`).value]));
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    fetchAndRender(endpoint, listId, renderFn);
    e.target.reset();
  };
}

// Bind forms
handleForm('doctor-form', '/doctors', 'doctor-list', renderDoctor, ['id','name','specialty']);
handleForm('patient-form', '/patients', 'patient-list', renderPatient, ['id','name','doctorId']);
handleForm('appointment-form', '/appointments', 'appointment-list', renderAppointment, ['id','patientId','doctorId','date']);

// Initial render
fetchAndRender('/doctors', 'doctor-list', renderDoctor);
fetchAndRender('/patients', 'patient-list', renderPatient);
fetchAndRender('/appointments', 'appointment-list', renderAppointment);
