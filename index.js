const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// This is the final, corrected dictionary that matches the new database.
const diseaseMappings = {
  // ICD-10 -> NAMASTE Mappings
  "ICD To NAMASTE": {
    "E11": [{ "code": "NAM-T-008", "term": "Madhumeha/Prameha (Type 2 Diabetes)" }],
    "I10": [{ "code": "NAM-T-012", "term": "Raktagata Vata (Essential Hypertension)" }],
    "J06.9": [{ "code": "NAM-T-004", "term": "Urdhva Shvasanaka Roga (URI)" }],
    "M54.5": [{ "code": "NAM-T-010", "term": "Katishula (Low Back Pain)" }],
    "G43.9": [{ "code": "NAM-T-011", "term": "Ardhavabhedaka (Migraine)" }],
    "K21.9": [{ "code": "NAM-T-009", "term": "Amlapitta (GERD)" }],
    "N39.0": [{ "code": "NAM-T-006", "term": "Mutrakrichhra (UTI)" }],
    "F32.9": [{ "code": "NAM-T-005", "term": "Avasada (Depressive Episode)" }],
    "J45.9": [{ "code": "NAM-T-007", "term": "Tamaka Shwasa (Asthma)" }],
    "M79.1": [{ "code": "NAM-T-001", "term": "Mamsagata Vata (Myalgia)" }],
    "L03.9": [{ "code": "NAM-T-002", "term": "Sotha (Cellulitis/Inflammation)" }],
    "R50.9": [{ "code": "NAM-T-011", "term": "Jwara (Fever)" }],
    "M10.9": [{ "code": "NAM-T-003", "term": "Vatarakta (Gout)" }],
    "M19.9": [{ "code": "NAM-T-070", "term": "Sandhigata Vata (Osteoarthritis)" }],
    "K59.0": [{ "code": "NAM-T-055", "term": "Vibandha (Constipation)" }],
    "D64.9": [{ "code": "NAM-T-095", "term": "Pandu Roga (Anemia)" }],
    "E66": [{ "code": "NAM-T-031", "term": "Sthaulya (Obesity)" }],
    "L40": [{ "code": "NAM-T-060", "term": "Kitibha Kushtha (Psoriasis)" }],
    "K58": [{ "code": "NAM-T-101", "term": "Grahani (Irritable Bowel Syndrome)" }],
    "I84": [{ "code": "NAM-T-045", "term": "Arsha (Hemorrhoids)" }],
    "F41.9": [{ "code": "NAM-T-035", "term": "Chittodvega (Anxiety Disorder)" }],
    "F51.0": [{ "code": "NAM-T-036", "term": "Anidra (Insomnia)" }],
    "J30.3": [{ "code": "NAM-T-051", "term": "Vataja Pratishyaya (Allergic Rhinitis)" }],
    "M54.2": [{ "code": "NAM-T-072", "term": "Manyashula (Cervicalgia/Neck Pain)" }],
    "N94.6": [{ "code": "NAM-T-081", "term": "Kashtartava (Dysmenorrhoea)" }],
    "H60.9": [{ "code": "NAM-T-102", "term": "Karna Shula (Otitis Externa/Earache)" }],
    "K05.1": [{ "code": "NAM-T-103", "term": "Sheetada (Gingivitis)" }],
    "A09": [{ "code": "NAM-T-020", "term": "Atisara (Diarrhea/Gastroenteritis)" }],
    "G81": [{ "code": "NAM-T-040", "term": "Pakshaghata (Hemiplegia)" }],
    "M06.9": [{ "code": "NAM-T-001", "term": "Amavata (Rheumatoid Arthritis)" }],
    "L30.9": [{ "code": "NAM-T-025", "term": "Vicharchika (Eczema/Dermatitis)" }],
    "R51": [{ "code": "NAM-T-011", "term": "Shirashula (Headache)" }],
    "K30": [{ "code": "NAM-T-009", "term": "Agnimandya/Ajirna (Dyspepsia)" }],
    "R53": [{ "code": "NAM-T-090", "term": "Daurbalya (Malaise/Fatigue)" }],
    "N40": [{ "code": "NAM-T-080", "term": "Vatashteela (BPH)" }],
    "R11": [{ "code": "NAM-T-105", "term": "Chhardi (Nausea and Vomiting)" }],
    "L70.0": [{ "code": "NAM-T-061", "term": "Yauvanapidaka (Acne)" }],
    "M25.5": [{ "code": "NAM-T-071", "term": "Sandhishula (Arthralgia/Joint Pain)" }],
    "M54.3": [{ "code": "NAM-T-010", "term": "Gridhrasi (Sciatica)" }],
    "N92.1": [{ "code": "NAM-T-082", "term": "Asrigdara (Menorrhagia)" }],
    "J00": [{ "code": "NAM-T-004", "term": "Pratishyaya (Common Cold)" }],
    "B37.3": [{ "code": "NAM-T-108", "term": "Shweta Pradara (Candidiasis of vulva)" }],
    "B07": [{ "code": "NAM-T-109", "term": "Charmakeela (Viral Warts)" }],
    "H10.9": [{ "code": "NAM-T-110", "term": "Netra Abhishyanda (Conjunctivitis)" }],
    "E03.9": [{ "code": "NAM-T-030", "term": "Galaganda (Hypothyroidism)" }],
    "R10.4": [{ "code": "NAM-T-111", "term": "Udara Shula (Abdominal Pain)" }],
    "B02": [{ "code": "NAM-T-112", "term": "Visarpa (Herpes Zoster)" }],
    "M47": [{ "code": "NAM-T-113", "term": "Greeva graham (Cervical Spondylosis)" }],
    "K12.1": [{ "code": "NAM-T-114", "term": "Mukha paka (Stomatitis)" }],
    "R05": [{ "code": "NAM-T-004", "term": "Kasa (Cough)" }],
    "L21": [{ "code": "NAM-T-115", "term": "Darunaka (Seborrhoeic Dermatitis)" }]
  },

  // NAMASTE -> ICD-10 Mappings
  "NAMASTE To ICD": {
    "NAM-T-001": [{ "code": "M79.1", "term": "Amavata (Myalgia)" }, { "code": "M06.9", "term": "Amavata (Rheumatoid Arthritis)" }],
    "NAM-T-002": [{ "code": "L03.9", "term": "Sotha (Cellulitis/Inflammation)" }],
    "NAM-T-003": [{ "code": "M10.9", "term": "Vatarakta (Gout)" }],
    "NAM-T-004": [{ "code": "J06.9", "term": "Kasa (URI)" }, { "code": "J00", "term": "Pratishyaya (Common Cold)" }, { "code": "R05", "term": "Kasa (Cough)" }],
    "NAM-T-005": [{ "code": "F32.9", "term": "Avasada (Depressive Episode)" }],
    "NAM-T-006": [{ "code": "N39.0", "term": "Mutrakrichhra (UTI)" }],
    "NAM-T-007": [{ "code": "J45.9", "term": "Tamaka Shwasa (Asthma)" }],
    "NAM-T-008": [{ "code": "E11", "term": "Madhumeha (Type 2 Diabetes)" }],
    "NAM-T-009": [{ "code": "K21.9", "term": "Amlapitta (GERD)" }, { "code": "K30", "term": "Agnimandya (Dyspepsia)" }],
    "NAM-T-010": [{ "code": "M54.5", "term": "Katishula (Low Back Pain)" }, { "code": "M54.3", "term": "Gridhrasi (Sciatica)" }],
    "NAM-T-011": [{ "code": "G43.9", "term": "Ardhavabhedaka (Migraine)" }, { "code": "R50.9", "term": "Jwara (Fever)" }, { "code": "R51", "term": "Shirashula (Headache)" }],
    "NAM-T-012": [{ "code": "I10", "term": "Raktagata Vata (Hypertension)" }],
    "NAM-T-020": [{ "code": "A09", "term": "Atisara (Diarrhea/Gastroenteritis)" }],
    "NAM-T-025": [{ "code": "L30.9", "term": "Vicharchika (Eczema/Dermatitis)" }],
    "NAM-T-030": [{ "code": "E03.9", "term": "Galaganda (Hypothyroidism)" }],
    "NAM-T-031": [{ "code": "E66", "term": "Sthaulya (Obesity)" }],
    "NAM-T-035": [{ "code": "F41.9", "term": "Chittodvega (Anxiety Disorder)" }],
    "NAM-T-036": [{ "code": "F51.0", "term": "Anidra (Insomnia)" }],
    "NAM-T-040": [{ "code": "G81", "term": "Pakshaghata (Hemiplegia)" }],
    "NAM-T-045": [{ "code": "I84", "term": "Arsha (Hemorrhoids)" }],
    "NAM-T-051": [{ "code": "J30.3", "term": "Vataja Pratishyaya (Allergic Rhinitis)" }],
    "NAM-T-055": [{ "code": "K59.0", "term": "Vibandha (Constipation)" }],
    "NAM-T-060": [{ "code": "L40", "term": "Kitibha Kushtha (Psoriasis)" }],
    "NAM-T-061": [{ "code": "L70.0", "term": "Yauvanapidaka (Acne)" }],
    "NAM-T-070": [{ "code": "M19.9", "term": "Sandhigata Vata (Osteoarthritis)" }],
    "NAM-T-071": [{ "code": "M25.5", "term": "Sandhishula (Arthralgia/Joint Pain)" }],
    "NAM-T-072": [{ "code": "M54.2", "term": "Manyashula (Cervicalgia/Neck Pain)" }],
    "NAM-T-080": [{ "code": "N40", "term": "Vatashteela (BPH)" }],
    "NAM-T-081": [{ "code": "N94.6", "term": "Kashtartava (Dysmenorrhoea)" }],
    "NAM-T-082": [{ "code": "N92.1", "term": "Asrigdara (Menorrhagia)" }],
    "NAM-T-090": [{ "code": "R53", "term": "Daurbalya (Malaise/Fatigue)" }],
    "NAM-T-095": [{ "code": "D64.9", "term": "Pandu Roga (Anemia)" }],
    "NAM-T-101": [{ "code": "K58", "term": "Grahani (Irritable Bowel Syndrome)" }],
    "NAM-T-102": [{ "code": "H60.9", "term": "Karna Shula (Otitis Externa)" }],
    "NAM-T-103": [{ "code": "K05.1", "term": "Sheetada (Gingivitis)" }],
    "NAM-T-105": [{ "code": "R11", "term": "Chhardi (Nausea and Vomiting)" }],
    "NAM-T-108": [{ "code": "B37.3", "term": "Shweta Pradara (Vaginal Candidiasis)" }],
    "NAM-T-109": [{ "code": "B07", "term": "Charmakeela (Viral Warts)" }],
    "NAM-T-110": [{ "code": "H10.9", "term": "Netra Abhishyanda (Conjunctivitis)" }],
    "NAM-T-111": [{ "code": "R10.4", "term": "Udara Shula (Abdominal Pain)" }],
    "NAM-T-112": [{ "code": "B02", "term": "Visarpa (Herpes Zoster)" }],
    "NAM-T-113": [{ "code": "M47", "term": "Greeva graham (Cervical Spondylosis)" }],
    "NAM-T-114": [{ "code": "K12.1", "term": "Mukha paka (Stomatitis)" }],
    "NAM-T-115": [{ "code": "L21", "term": "Darunaka (Seborrhoeic Dermatitis)" }]
  }
};

let database = { doctors: [], patients: [] };
try {
    const dbPath = path.join(__dirname, 'database.json');
    if (fs.existsSync(dbPath)) { // Check if the file exists before reading
        const dbData = fs.readFileSync(dbPath, 'utf-8');
        database = JSON.parse(dbData);
        console.log("Database loaded successfully.");
    } else {
        console.log("database.json not found, starting with an empty database.");
    }
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

    let mappedData;

    // Determine which dictionary to search in based on the code format
    if (code.startsWith('NAM-')) {
        mappedData = diseaseMappings["NAMASTE To ICD"][code];
    } else {
        mappedData = diseaseMappings["ICD To NAMASTE"][code];
    }

    if (mappedData && mappedData.length > 0) {
        res.json(mappedData);
    } else {
        res.status(404).json({ error: 'Mapping not found for this code' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
