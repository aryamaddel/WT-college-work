
# Hospital CRUD API

## Install dependencies

```bash
bun install
```

## Run the server

```bash
bun run app.js
```

Server runs on [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Doctors
| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| POST   | /doctors           | Add doctor          |
| GET    | /doctors           | List all doctors    |
| GET    | /doctors/:id       | Get doctor by id    |
| PUT    | /doctors/:id       | Update doctor       |
| DELETE | /doctors/:id       | Delete doctor       |

#### Example doctor JSON
```json
{
	"id": "d1",
	"name": "Dr. Smith",
	"specialty": "Cardiology"
}
```

### Patients
| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| POST   | /patients          | Add patient         |
| GET    | /patients          | List all patients   |
| GET    | /patients/:id      | Get patient by id   |
| PUT    | /patients/:id      | Update patient      |
| DELETE | /patients/:id      | Delete patient      |

#### Example patient JSON
```json
{
	"id": "p1",
	"name": "John Doe",
	"doctorId": "d1"
}
```

### Appointments
| Method | Endpoint              | Description            |
|--------|-----------------------|------------------------|
| POST   | /appointments         | Add appointment        |
| GET    | /appointments         | List all appointments  |
| GET    | /appointments/:id     | Get appointment by id  |
| PUT    | /appointments/:id     | Update appointment     |
| DELETE | /appointments/:id     | Delete appointment     |

#### Example appointment JSON
```json
{
	"id": "a1",
	"patientId": "p1",
	"doctorId": "d1",
	"date": "2025-09-17T10:00:00"
}
```

---
All data is stored in memory and will reset when the server restarts.
