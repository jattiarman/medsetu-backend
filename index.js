const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// This is the final, corrected dictionary that matches the new database.
const mappingDictionary = {
    // ICD -> NAMASTE
    "E11": [{ code: "NAM-T-008", term: "Prameha (Diabetes Mellitus)" }],
    "I10": [{ code: "NAM-T-012", term: "Hridaya roga (Hypertension correlation)" }],
    "J06.9": [{ code: "NAM-T-004", term: "Kaphaja Kasa (Upper respiratory infection)" }],
    "M54.5": [{ code: "NAM-T-010", term: "Shula (Low back pain / Gridhrasi)" }],
    "G43.0": [{ code: "NAM-T-011", term: "Shirashula (Migraine correlation)" }],
    "K21.9": [{ code: "NAM-T-009", term: "Agnimandya (GERD correlation)" }],
    "N39.0": [{ code: "NAM-T-006", term: "Mutrakrichhra (Urinary tract issues)" }],
    "F32.9": [{ code: "NAM-T-005", term: "Manasika Vikar (Depression correlation)" }],
    "J45.9": [{ code: "NAM-T-007", term: "Shwasa (Asthma)" }],
    "M79.1": [{ code: "NAM-T-001", term: "Amavata (Myalgia correlation)" }],
    "L03.90": [{ code: "NAM-T-002", term: "Sotha (Cellulitis / Inflammation)" }],
    "B34.9": [{ code: "NAM-T-011", term: "Jwara (Viral fever correlation)" }],

    // NAMASTE -> ICD
    "NAM-T-001": [{ code: "M79.1", term: "Amavata (Arthralgia / Myalgia)" }],
    "NAM-T-002": [{ code: "L03.90", term: "Sotha (Cellulitis / Inflammation)" }],
    "NAM-T-003": [{ code: "M10.9", term: "Vatarakta (Gout-like / Joint disease)" }],
    "NAM-T-004": [{ code: "J06.9", term: "Kaphaja Kasa (Upper respiratory infection)" }],
    "NAM-T-005": [{ code: "F32.9", term: "Manasika Vikar (Depression / mental health)" }],
    "NAM-T-006": [{ code: "N39.0", term: "Mutrakrichhra (Urinary tract issues)" }],
    "NAM-T-007": [{ code: "J45.9", term: "Shwasa (Asthma)" }],
    "NAM-T-008": [{ code: "E11", term: "Prameha (Diabetes Mellitus correlation)" }],
    "NAM-T-009": [{ code: "K21.9", term: "Agnimandya (GERD / Digestive weakness)" }],
    "NAM-T-010": [{ code: "M54.5", term: "Shula (Back pain / Gridhrasi)" }],
    "NAM-T-011": [
        { code: "G43.0", term: "Shirashula (Migraine correlation)" },
        { code: "B34.9", term: "Jwara (Viral fever correlation)" }
    ],
    "NAM-T-012": [{ code: "I10", term: "Hridaya roga (Hypertension correlation)" }]
};

let database = { doctors: [], patients: [] };
try {
    const dbPath = path.join(__dirname, 'database.json');
    const dbData = fs.readFileSync(dbPath, 'utf-8');
    database = JSON.parse(dbData);
    console.log("Database loaded successfully.");
} catch (error) {
    console.error("Error loading database:", error);
}

app.get('/api/doctors', (req, res) => res.json(database.doctors));
app.get('/api/patients', (req, res) => res.json(database.patients));

app.post('/api/map', (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }
    const mappedData = mappingDictionary[code];
    if (mappedData && mappedData.length > 0) {
        res.json(mappedData);
    } else {
        res.status(404).json({ error: 'Mapping not found for this code' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
