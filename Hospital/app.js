
const express = require('express');
const path = require('path');
const { createClient } = require('redis');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// Redis setup
const redisClient = createClient({ url: 'redis://localhost:8000' });
redisClient.connect().catch(console.error);


// --- Doctor CRUD (Redis) ---
app.post('/doctors', async (req, res) => {
    const { id, name, specialty } = req.body;
    if (!id || !name || !specialty) return res.status(400).json({ error: 'Missing fields' });
    const exists = await redisClient.hExists('doctors', id);
    if (exists) return res.status(400).json({ error: 'Doctor ID exists' });
    await redisClient.hSet('doctors', id, JSON.stringify({ id, name, specialty }));
    res.json({ message: 'Doctor added' });
});
app.get('/doctors', async (req, res) => {
    const doctors = await redisClient.hGetAll('doctors');
    res.json(Object.values(doctors).map(JSON.parse));
});
app.get('/doctors/:id', async (req, res) => {
    const doctor = await redisClient.hGet('doctors', req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Not found' });
    res.json(JSON.parse(doctor));
});
app.put('/doctors/:id', async (req, res) => {
    const doctor = await redisClient.hGet('doctors', req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Not found' });
    const { name, specialty } = req.body;
    const docObj = JSON.parse(doctor);
    if (name) docObj.name = name;
    if (specialty) docObj.specialty = specialty;
    await redisClient.hSet('doctors', req.params.id, JSON.stringify(docObj));
    res.json({ message: 'Doctor updated' });
});
app.delete('/doctors/:id', async (req, res) => {
    const deleted = await redisClient.hDel('doctors', req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Doctor deleted' });
});


// --- Patient CRUD (Redis) ---
app.post('/patients', async (req, res) => {
    const { id, name, doctorId } = req.body;
    if (!id || !name || !doctorId) return res.status(400).json({ error: 'Missing fields' });
    const exists = await redisClient.hExists('patients', id);
    if (exists) return res.status(400).json({ error: 'Patient ID exists' });
    await redisClient.hSet('patients', id, JSON.stringify({ id, name, doctorId }));
    res.json({ message: 'Patient added' });
});
app.get('/patients', async (req, res) => {
    const patients = await redisClient.hGetAll('patients');
    res.json(Object.values(patients).map(JSON.parse));
});
app.get('/patients/:id', async (req, res) => {
    const patient = await redisClient.hGet('patients', req.params.id);
    if (!patient) return res.status(404).json({ error: 'Not found' });
    res.json(JSON.parse(patient));
});
app.put('/patients/:id', async (req, res) => {
    const patient = await redisClient.hGet('patients', req.params.id);
    if (!patient) return res.status(404).json({ error: 'Not found' });
    const { name, doctorId } = req.body;
    const patObj = JSON.parse(patient);
    if (name) patObj.name = name;
    if (doctorId) patObj.doctorId = doctorId;
    await redisClient.hSet('patients', req.params.id, JSON.stringify(patObj));
    res.json({ message: 'Patient updated' });
});
app.delete('/patients/:id', async (req, res) => {
    const deleted = await redisClient.hDel('patients', req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Patient deleted' });
});


// --- Appointment CRUD (Redis) ---
app.post('/appointments', async (req, res) => {
    const { id, patientId, doctorId, date } = req.body;
    if (!id || !patientId || !doctorId || !date) return res.status(400).json({ error: 'Missing fields' });
    const exists = await redisClient.hExists('appointments', id);
    if (exists) return res.status(400).json({ error: 'Appointment ID exists' });
    await redisClient.hSet('appointments', id, JSON.stringify({ id, patientId, doctorId, date }));
    res.json({ message: 'Appointment added' });
});
app.get('/appointments', async (req, res) => {
    const appointments = await redisClient.hGetAll('appointments');
    res.json(Object.values(appointments).map(JSON.parse));
});
app.get('/appointments/:id', async (req, res) => {
    const appt = await redisClient.hGet('appointments', req.params.id);
    if (!appt) return res.status(404).json({ error: 'Not found' });
    res.json(JSON.parse(appt));
});
app.put('/appointments/:id', async (req, res) => {
    const appt = await redisClient.hGet('appointments', req.params.id);
    if (!appt) return res.status(404).json({ error: 'Not found' });
    const { patientId, doctorId, date } = req.body;
    const apptObj = JSON.parse(appt);
    if (patientId) apptObj.patientId = patientId;
    if (doctorId) apptObj.doctorId = doctorId;
    if (date) apptObj.date = date;
    await redisClient.hSet('appointments', req.params.id, JSON.stringify(apptObj));
    res.json({ message: 'Appointment updated' });
});
app.delete('/appointments/:id', async (req, res) => {
    const deleted = await redisClient.hDel('appointments', req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Appointment deleted' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
