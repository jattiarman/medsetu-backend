const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to only allow your Netlify frontend
const corsOptions = {
  origin: 'https://namaste01.netlify.app', // Your live frontend URL
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

// --- DATABASE EMBEDDED DIRECTLY ---
// This avoids any file system errors on the server.
const database = {
  "doctors": [
    { "id": "D001", "name": "Dr. Aarav Mehta", "specialty": "General Physician" },
    { "id": "D002", "name": "Dr. Sanya Rao", "specialty": "Cardiologist" },
    { "id": "D003", "name": "Dr. Vikram Patel", "specialty": "Pulmonologist" },
    { "id": "D004", "name": "Dr. Nisha Gupta", "specialty": "Neurologist" },
    { "id": "D005", "name": "Dr. Rohit Singh", "specialty": "Orthopedist" },
    { "id": "D006", "name": "Dr. Priya Sharma", "specialty": "Gastroenterologist" },
    { "id": "D007", "name": "Dr. Manoj Desai", "specialty": "Urologist" },
    { "id": "D008", "name": "Dr. Kavita Iyer", "specialty": "Psychiatrist" },
    { "id": "D009", "name": "Dr. Anil Kumar", "specialty": "Dermatologist" },
    { "id": "D010", "name": "Dr. Ritu Verma", "specialty": "Infectious Disease" },
    { "id": "D011", "name": "Dr. Sameer Khan", "specialty": "Rheumatologist" },
    { "id": "D012", "name": "Dr. Leela Nair", "specialty": "Pediatrician" },
    { "id": "D013", "name": "Dr. Karan Joshi", "specialty": "ENT Specialist" },
    { "id": "D014", "name": "Dr. Meera Rao", "specialty": "Endocrinologist" },
    { "id": "D015", "name": "Dr. Sanjay Bhatt", "specialty": "General Surgeon" },
    { "id": "D016", "name": "Dr. Pooja Patel", "specialty": "Physiotherapist" },
    { "id": "D017", "name": "Dr. Arjun Varma", "specialty": "Nephrologist" },
    { "id": "D018", "name": "Dr. Deepa Menon", "specialty": "Hematologist" },
    { "id": "D019", "name": "Dr. Farah Mirza", "specialty": "Ophthalmologist" },
    { "id": "D020", "name": "Dr. Aditya Kulkarni", "specialty": "Geriatric Medicine" }
  ],
  "patients": [
    { "id": "P001", "name": "Aanya Sharma", "age": 21, "gender": "F", "symptoms": ["polyuria", "polydipsia"], "doctorId": "D001", "visit": { "date": "2025-09-12", "diagnosis": { "system": "ICD-11", "code": "E11", "description": "Type 2 diabetes mellitus" } } },
    { "id": "P002", "name": "Vihaan Gupta", "age": 24, "gender": "M", "symptoms": ["headache", "dizziness"], "doctorId": "D001", "visit": { "date": "2025-09-11", "diagnosis": { "system": "ICD-11", "code": "I10", "description": "Essential (primary) hypertension" } } },
    { "id": "P003", "name": "Myra Singh", "age": 27, "gender": "F", "symptoms": ["cough", "nasal congestion"], "doctorId": "D001", "visit": { "date": "2025-09-10", "diagnosis": { "system": "ICD-11", "code": "J06.9", "description": "Acute upper respiratory infection, unspecified" } } },
    { "id": "P004", "name": "Advik Patel", "age": 30, "gender": "M", "symptoms": ["lower back pain"], "doctorId": "D001", "visit": { "date": "2025-09-09", "diagnosis": { "system": "ICD-11", "code": "M54.5", "description": "Low back pain" } } },
    { "id": "P005", "name": "Anika Reddy", "age": 33, "gender": "F", "symptoms": ["severe headache", "nausea"], "doctorId": "D001", "visit": { "date": "2025-09-08", "diagnosis": { "system": "ICD-11", "code": "G43.9", "description": "Migraine without aura" } } },
    { "id": "P006", "name": "Kabir Kumar", "age": 36, "gender": "M", "symptoms": ["heartburn", "acid reflux"], "doctorId": "D001", "visit": { "date": "2025-09-07", "diagnosis": { "system": "ICD-11", "code": "K21.9", "description": "Gastro-esophageal reflux disease" } } },
    { "id": "P007", "name": "Saanvi Joshi", "age": 39, "gender": "F", "symptoms": ["burning urination", "frequency"], "doctorId": "D002", "visit": { "date": "2025-09-06", "diagnosis": { "system": "ICD-11", "code": "N39.0", "description": "Urinary tract infection" } } },
    { "id": "P008", "name": "Aarav Desai", "age": 42, "gender": "M", "symptoms": ["low mood", "insomnia"], "doctorId": "D002", "visit": { "date": "2025-09-05", "diagnosis": { "system": "ICD-11", "code": "F32.9", "description": "Major depressive disorder" } } },
    { "id": "P009", "name": "Diya Verma", "age": 45, "gender": "F", "symptoms": ["wheezing", "shortness of breath"], "doctorId": "D002", "visit": { "date": "2025-09-04", "diagnosis": { "system": "ICD-11", "code": "J45.9", "description": "Asthma, unspecified" } } },
    { "id": "P010", "name": "Ishaan Sharma", "age": 48, "gender": "M", "symptoms": ["muscle pain", "aches"], "doctorId": "D002", "visit": { "date": "2025-09-03", "diagnosis": { "system": "ICD-11", "code": "M79.1", "description": "Myalgia" } } },
    { "id": "P011", "name": "Kiara Patel", "age": 51, "gender": "F", "symptoms": ["redness", "swelling"], "doctorId": "D002", "visit": { "date": "2025-09-02", "diagnosis": { "system": "ICD-11", "code": "L03.9", "description": "Cellulitis, unspecified" } } },
    { "id": "P012", "name": "Arjun Singh", "age": 54, "gender": "M", "symptoms": ["fever", "body aches"], "doctorId": "D002", "visit": { "date": "2025-09-01", "diagnosis": { "system": "ICD-11", "code": "R50.9", "description": "Fever, unspecified" } } },
    { "id": "P013", "name": "Zara Khan", "age": 20, "gender": "F", "symptoms": ["joint pain", "stiffness"], "doctorId": "D003", "visit": { "date": "2025-09-12", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-001", "description": "Amavata" } } },
    { "id": "P014", "name": "Reyansh Nair", "age": 23, "gender": "M", "symptoms": ["swelling", "warmth"], "doctorId": "D003", "visit": { "date": "2025-09-11", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-002", "description": "Sotha (inflammation/edema)" } } },
    { "id": "P015", "name": "Eva Menon", "age": 26, "gender": "F", "symptoms": ["joint pain", "redness"], "doctorId": "D003", "visit": { "date": "2025-09-10", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-003", "description": "Vatarakta" } } },
    { "id": "P016", "name": "Krishna Iyer", "age": 29, "gender": "M", "symptoms": ["cough", "phlegm"], "doctorId": "D003", "visit": { "date": "2025-09-09", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-004", "description": "Kaphaja kasa" } } },
    { "id": "P017", "name": "Pari Agarwal", "age": 32, "gender": "F", "symptoms": ["sadness", "loss of interest"], "doctorId": "D003", "visit": { "date": "2025-09-08", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-005", "description": "Manasika Vikar" } } },
    { "id": "P018", "name": "Sai Prasad", "age": 35, "gender": "M", "symptoms": ["painful urination", "frequency"], "doctorId": "D003", "visit": { "date": "2025-09-07", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-006", "description": "Mutrakrichhra" } } },
    { "id": "P019", "name": "Riya Das", "age": 38, "gender": "F", "symptoms": ["shortness of breath", "cough"], "doctorId": "D004", "visit": { "date": "2025-09-06", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-007", "description": "Shwasa" } } },
    { "id": "P020", "name": "Ayaan Jain", "age": 41, "gender": "M", "symptoms": ["polyuria", "increased thirst"], "doctorId": "D004", "visit": { "date": "2025-09-05", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-008", "description": "Prameha" } } },
    { "id": "P021", "name": "Amaira Shah", "age": 44, "gender": "F", "symptoms": ["indigestion", "bloating"], "doctorId": "D004", "visit": { "date": "2025-09-04", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-009", "description": "Agnimandya" } } },
    { "id": "P022", "name": "Vivaan Mehta", "age": 47, "gender": "M", "symptoms": ["colicky pain", "localized pain"], "doctorId": "D004", "visit": { "date": "2025-09-03", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-010", "description": "Shula" } } },
    { "id": "P023", "name": "Navya Reddy", "age": 50, "gender": "F", "symptoms": ["fever", "headache"], "doctorId": "D004", "visit": { "date": "2025-09-02", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-011", "description": "Jwara" } } },
    { "id": "P024", "name": "Aditya Kumar", "age": 53, "gender": "M", "symptoms": ["high blood pressure readings", "headache"], "doctorId": "D004", "visit": { "date": "2025-09-01", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-012", "description": "Hridaya roga" } } },
    { "id": "P025", "name": "Siya Singh", "age": 22, "gender": "F", "symptoms": ["polyuria", "polydipsia"], "doctorId": "D005", "visit": { "date": "2025-09-12", "diagnosis": { "system": "ICD-11", "code": "E11", "description": "Type 2 diabetes mellitus" } } },
    { "id": "P026", "name": "Rohan Patel", "age": 25, "gender": "M", "symptoms": ["headache", "dizziness"], "doctorId": "D005", "visit": { "date": "2025-09-11", "diagnosis": { "system": "ICD-11", "code": "I10", "description": "Essential (primary) hypertension" } } },
    { "id": "P027", "name": "Aadhya Joshi", "age": 28, "gender": "F", "symptoms": ["cough", "nasal congestion"], "doctorId": "D005", "visit": { "date": "2025-09-10", "diagnosis": { "system": "ICD-11", "code": "J06.9", "description": "Acute upper respiratory infection, unspecified" } } },
    { "id": "P028", "name": "Neel Desai", "age": 31, "gender": "M", "symptoms": ["lower back pain"], "doctorId": "D005", "visit": { "date": "2025-09-09", "diagnosis": { "system": "ICD-11", "code": "M54.5", "description": "Low back pain" } } },
    { "id": "P029", "name": "Ira Verma", "age": 34, "gender": "F", "symptoms": ["severe headache", "nausea"], "doctorId": "D005", "visit": { "date": "2025-09-08", "diagnosis": { "system": "ICD-11", "code": "G43.9", "description": "Migraine without aura" } } },
    { "id": "P030", "name": "Dhruv Sharma", "age": 37, "gender": "M", "symptoms": ["heartburn", "acid reflux"], "doctorId": "D005", "visit": { "date": "2025-09-07", "diagnosis": { "system": "ICD-11", "code": "K21.9", "description": "Gastro-esophageal reflux disease" } } },
    { "id": "P031", "name": "Aisha Patel", "age": 40, "gender": "F", "symptoms": ["burning urination", "frequency"], "doctorId": "D006", "visit": { "date": "2025-09-06", "diagnosis": { "system": "ICD-11", "code": "N39.0", "description": "Urinary tract infection" } } },
    { "id": "P032", "name": "Aryan Singh", "age": 43, "gender": "M", "symptoms": ["low mood", "insomnia"], "doctorId": "D006", "visit": { "date": "2025-09-05", "diagnosis": { "system": "ICD-11", "code": "F32.9", "description": "Major depressive disorder" } } },
    { "id": "P033", "name": "Ananya Kumar", "age": 46, "gender": "F", "symptoms": ["wheezing", "shortness of breath"], "doctorId": "D006", "visit": { "date": "2025-09-04", "diagnosis": { "system": "ICD-11", "code": "J45.9", "description": "Asthma, unspecified" } } },
    { "id": "P034", "name": "Shaurya Gupta", "age": 49, "gender": "M", "symptoms": ["muscle pain", "aches"], "doctorId": "D006", "visit": { "date": "2025-09-03", "diagnosis": { "system": "ICD-11", "code": "M79.1", "description": "Myalgia" } } },
    { "id": "P035", "name": "Avni Khan", "age": 52, "gender": "F", "symptoms": ["redness", "swelling"], "doctorId": "D006", "visit": { "date": "2025-09-02", "diagnosis": { "system": "ICD-11", "code": "L03.9", "description": "Cellulitis, unspecified" } } },
    { "id": "P036", "name": "Yuvan Reddy", "age": 55, "gender": "M", "symptoms": ["fever", "body aches"], "doctorId": "D006", "visit": { "date": "2025-09-01", "diagnosis": { "system": "ICD-11", "code": "R50.9", "description": "Fever, unspecified" } } },
    { "id": "P037", "name": "Shanaya Joshi", "age": 26, "gender": "F", "symptoms": ["joint pain", "stiffness"], "doctorId": "D007", "visit": { "date": "2025-09-12", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-001", "description": "Amavata" } } },
    { "id": "P038", "name": "Atharv Nair", "age": 29, "gender": "M", "symptoms": ["swelling", "warmth"], "doctorId": "D007", "visit": { "date": "2025-09-11", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-002", "description": "Sotha (inflammation/edema)" } } },
    { "id": "P039", "name": "Aarohi Menon", "age": 32, "gender": "F", "symptoms": ["joint pain", "redness"], "doctorId": "D007", "visit": { "date": "2025-09-10", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-003", "description": "Vatarakta" } } },
    { "id": "P040", "name": "Veer Iyer", "age": 35, "gender": "M", "symptoms": ["cough", "phlegm"], "doctorId": "D007", "visit": { "date": "2025-09-09", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-004", "description": "Kaphaja kasa" } } },
    { "id": "P041", "name": "Kavya Agarwal", "age": 38, "gender": "F", "symptoms": ["sadness", "loss of interest"], "doctorId": "D007", "visit": { "date": "2025-09-08", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-005", "description": "Manasika Vikar" } } },
    { "id": "P042", "name": "Zain Prasad", "age": 41, "gender": "M", "symptoms": ["painful urination", "frequency"], "doctorId": "D007", "visit": { "date": "2025-09-07", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-006", "description": "Mutrakrichhra" } } },
    { "id": "P043", "name": "Amelia Das", "age": 44, "gender": "F", "symptoms": ["shortness of breath", "cough"], "doctorId": "D008", "visit": { "date": "2025-09-06", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-007", "description": "Shwasa" } } },
    { "id": "P044", "name": "Abeer Jain", "age": 47, "gender": "M", "symptoms": ["polyuria", "increased thirst"], "doctorId": "D008", "visit": { "date": "2025-09-05", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-008", "description": "Prameha" } } },
    { "id": "P045", "name": "Khushi Shah", "age": 50, "gender": "F", "symptoms": ["indigestion", "bloating"], "doctorId": "D008", "visit": { "date": "2025-09-04", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-009", "description": "Agnimandya" } } },
    { "id": "P046", "name": "Mihir Mehta", "age": 53, "gender": "M", "symptoms": ["colicky pain", "localized pain"], "doctorId": "D008", "visit": { "date": "2025-09-03", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-010", "description": "Shula" } } },
    { "id": "P047", "name": "Inaya Reddy", "age": 56, "gender": "F", "symptoms": ["fever", "headache"], "doctorId": "D008", "visit": { "date": "2025-09-02", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-011", "description": "Jwara" } } },
    { "id": "P048", "name": "Parth Kumar", "age": 59, "gender": "M", "symptoms": ["high blood pressure readings", "headache"], "doctorId": "D008", "visit": { "date": "2025-09-01", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-012", "description": "Hridaya roga" } } },
    { "id": "P049", "name": "Yashvi Singh", "age": 28, "gender": "F", "symptoms": ["polyuria", "polydipsia"], "doctorId": "D009", "visit": { "date": "2025-09-12", "diagnosis": { "system": "ICD-11", "code": "E11", "description": "Type 2 diabetes mellitus" } } },
    { "id": "P050", "name": "Dev Patel", "age": 31, "gender": "M", "symptoms": ["headache", "dizziness"], "doctorId": "D009", "visit": { "date": "2025-09-11", "diagnosis": { "system": "ICD-11", "code": "I10", "description": "Essential (primary) hypertension" } } },
    { "id": "P051", "name": "Nora Joshi", "age": 34, "gender": "F", "symptoms": ["cough", "nasal congestion"], "doctorId": "D009", "visit": { "date": "2025-09-10", "diagnosis": { "system": "ICD-11", "code": "J06.9", "description": "Acute upper respiratory infection, unspecified" } } },
    { "id": "P052", "name": "Kabir Desai", "age": 37, "gender": "M", "symptoms": ["lower back pain"], "doctorId": "D009", "visit": { "date": "2025-09-09", "diagnosis": { "system": "ICD-11", "code": "M54.5", "description": "Low back pain" } } },
    { "id": "P053", "name": "Tara Verma", "age": 40, "gender": "F", "symptoms": ["severe headache", "nausea"], "doctorId": "D009", "visit": { "date": "2025-09-08", "diagnosis": { "system": "ICD-11", "code": "G43.9", "description": "Migraine without aura" } } },
    { "id": "P054", "name": "Arnav Sharma", "age": 43, "gender": "M", "symptoms": ["heartburn", "acid reflux"], "doctorId": "D009", "visit": { "date": "2025-09-07", "diagnosis": { "system": "ICD-11", "code": "K21.9", "description": "Gastro-esophageal reflux disease" } } },
    { "id": "P055", "name": "Vanya Patel", "age": 46, "gender": "F", "symptoms": ["burning urination", "frequency"], "doctorId": "D010", "visit": { "date": "2025-09-06", "diagnosis": { "system": "ICD-11", "code": "N39.0", "description": "Urinary tract infection" } } },
    { "id": "P056", "name": "Leo Singh", "age": 49, "gender": "M", "symptoms": ["low mood", "insomnia"], "doctorId": "D010", "visit": { "date": "2025-09-05", "diagnosis": { "system": "ICD-11", "code": "F32.9", "description": "Major depressive disorder" } } },
    { "id": "P057", "name": "Hazel Kumar", "age": 52, "gender": "F", "symptoms": ["wheezing", "shortness of breath"], "doctorId": "D010", "visit": { "date": "2025-09-04", "diagnosis": { "system": "ICD-11", "code": "J45.9", "description": "Asthma, unspecified" } } },
    { "id": "P058", "name": "Ryan Gupta", "age": 55, "gender": "M", "symptoms": ["muscle pain", "aches"], "doctorId": "D010", "visit": { "date": "2025-09-03", "diagnosis": { "system": "ICD-11", "code": "M79.1", "description": "Myalgia" } } },
    { "id": "P059", "name": "Fatima Khan", "age": 58, "gender": "F", "symptoms": ["redness", "swelling"], "doctorId": "D010", "visit": { "date": "2025-09-02", "diagnosis": { "system": "ICD-11", "code": "L03.9", "description": "Cellulitis, unspecified" } } },
    { "id": "P060", "name": "Ibrahim Reddy", "age": 61, "gender": "M", "symptoms": ["fever", "body aches"], "doctorId": "D010", "visit": { "date": "2025-09-01", "diagnosis": { "system": "ICD-11", "code": "R50.9", "description": "Fever, unspecified" } } },
    { "id": "P061", "name": "Anvi Joshi", "age": 23, "gender": "F", "symptoms": ["joint pain", "stiffness"], "doctorId": "D011", "visit": { "date": "2025-09-12", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-001", "description": "Amavata" } } },
    { "id": "P062", "name": "Kian Nair", "age": 26, "gender": "M", "symptoms": ["swelling", "warmth"], "doctorId": "D011", "visit": { "date": "2025-09-11", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-002", "description": "Sotha (inflammation/edema)" } } },
    { "id": "P063", "name": "Mirha Menon", "age": 29, "gender": "F", "symptoms": ["joint pain", "redness"], "doctorId": "D011", "visit": { "date": "2025-09-10", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-003", "description": "Vatarakta" } } },
    { "id": "P064", "name": "Aarush Iyer", "age": 32, "gender": "M", "symptoms": ["cough", "phlegm"], "doctorId": "D011", "visit": { "date": "2025-09-09", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-004", "description": "Kaphaja kasa" } } },
    { "id": "P065", "name": "Zoya Agarwal", "age": 35, "gender": "F", "symptoms": ["sadness", "loss of interest"], "doctorId": "D011", "visit": { "date": "2025-09-08", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-005", "description": "Manasika Vikar" } } },
    { "id": "P066", "name": "Omar Prasad", "age": 38, "gender": "M", "symptoms": ["painful urination", "frequency"], "doctorId": "D011", "visit": { "date": "2025-09-07", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-006", "description": "Mutrakrichhra" } } },
    { "id": "P067", "name": "Alina Das", "age": 41, "gender": "F", "symptoms": ["shortness of breath", "cough"], "doctorId": "D012", "visit": { "date": "2025-09-06", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-007", "description": "Shwasa" } } },
    { "id": "P068", "name": "Armaan Jain", "age": 44, "gender": "M", "symptoms": ["polyuria", "increased thirst"], "doctorId": "D012", "visit": { "date": "2025-09-05", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-008", "description": "Prameha" } } },
    { "id": "P069", "name": "Sara Shah", "age": 47, "gender": "F", "symptoms": ["indigestion", "bloating"], "doctorId": "D012", "visit": { "date": "2025-09-04", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-009", "description": "Agnimandya" } } },
    { "id": "P070", "name": "Imran Mehta", "age": 50, "gender": "M", "symptoms": ["colicky pain", "localized pain"], "doctorId": "D012", "visit": { "date": "2025-09-03", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-010", "description": "Shula" } } },
    { "id": "P071", "name": "Alia Reddy", "age": 53, "gender": "F", "symptoms": ["fever", "headache"], "doctorId": "D012", "visit": { "date": "2025-09-02", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-011", "description": "Jwara" } } },
    { "id": "P072", "name": "Rizwan Kumar", "age": 56, "gender": "M", "symptoms": ["high blood pressure readings", "headache"], "doctorId": "D012", "visit": { "date": "2025-09-01", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-012", "description": "Hridaya roga" } } },
    { "id": "P073", "name": "Maryam Singh", "age": 29, "gender": "F", "symptoms": ["polyuria", "polydipsia"], "doctorId": "D013", "visit": { "date": "2025-09-12", "diagnosis": { "system": "ICD-11", "code": "E11", "description": "Type 2 diabetes mellitus" } } },
    { "id": "P074", "name": "Haris Patel", "age": 32, "gender": "M", "symptoms": ["headache", "dizziness"], "doctorId": "D013", "visit": { "date": "2025-09-11", "diagnosis": { "system": "ICD-11", "code": "I10", "description": "Essential (primary) hypertension" } } },
    { "id": "P075", "name": "Elif Joshi", "age": 35, "gender": "F", "symptoms": ["cough", "nasal congestion"], "doctorId": "D013", "visit": { "date": "2025-09-10", "diagnosis": { "system": "ICD-11", "code": "J06.9", "description": "Acute upper respiratory infection, unspecified" } } },
    { "id": "P076", "name": "Bilal Desai", "age": 38, "gender": "M", "symptoms": ["lower back pain"], "doctorId": "D013", "visit": { "date": "2025-09-09", "diagnosis": { "system": "ICD-11", "code": "M54.5", "description": "Low back pain" } } },
    { "id": "P077", "name": "Ayla Verma", "age": 41, "gender": "F", "symptoms": ["severe headache", "nausea"], "doctorId": "D013", "visit": { "date": "2025-09-08", "diagnosis": { "system": "ICD-11", "code": "G43.9", "description": "Migraine without aura" } } },
    { "id": "P078", "name": "Yusuf Sharma", "age": 44, "gender": "M", "symptoms": ["heartburn", "acid reflux"], "doctorId": "D013", "visit": { "date": "2025-09-07", "diagnosis": { "system": "ICD-11", "code": "K21.9", "description": "Gastro-esophageal reflux disease" } } },
    { "id": "P079", "name": "Esra Patel", "age": 47, "gender": "F", "symptoms": ["burning urination", "frequency"], "doctorId": "D014", "visit": { "date": "2025-09-06", "diagnosis": { "system": "ICD-11", "code": "N39.0", "description": "Urinary tract infection" } } },
    { "id": "P080", "name": "Hamza Singh", "age": 50, "gender": "M", "symptoms": ["low mood", "insomnia"], "doctorId": "D014", "visit": { "date": "2025-09-05", "diagnosis": { "system": "ICD-11", "code": "F32.9", "description": "Major depressive disorder" } } },
    { "id": "P081", "name": "Leyla Kumar", "age": 53, "gender": "F", "symptoms": ["wheezing", "shortness of breath"], "doctorId": "D014", "visit": { "date": "2025-09-04", "diagnosis": { "system": "ICD-11", "code": "J45.9", "description": "Asthma, unspecified" } } },
    { "id": "P082", "name": "Mustafa Gupta", "age": 56, "gender": "M", "symptoms": ["muscle pain", "aches"], "doctorId": "D014", "visit": { "date": "2025-09-03", "diagnosis": { "system": "ICD-11", "code": "M79.1", "description": "Myalgia" } } },
    { "id": "P083", "name": "Zehra Khan", "age": 59, "gender": "F", "symptoms": ["redness", "swelling"], "doctorId": "D014", "visit": { "date": "2025-09-02", "diagnosis": { "system": "ICD-11", "code": "L03.9", "description": "Cellulitis, unspecified" } } },
    { "id": "P084", "name": "Ahmed Reddy", "age": 62, "gender": "M", "symptoms": ["fever", "body aches"], "doctorId": "D014", "visit": { "date": "2025-09-01", "diagnosis": { "system": "ICD-11", "code": "R50.9", "description": "Fever, unspecified" } } },
    { "id": "P085", "name": "Amara Joshi", "age": 30, "gender": "F", "symptoms": ["joint pain", "stiffness"], "doctorId": "D015", "visit": { "date": "2025-09-12", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-001", "description": "Amavata" } } },
    { "id": "P086", "name": "Samir Nair", "age": 33, "gender": "M", "symptoms": ["swelling", "warmth"], "doctorId": "D015", "visit": { "date": "2025-09-11", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-002", "description": "Sotha (inflammation/edema)" } } },
    { "id": "P087", "name": "Lila Menon", "age": 36, "gender": "F", "symptoms": ["joint pain", "redness"], "doctorId": "D015", "visit": { "date": "2025-09-10", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-003", "description": "Vatarakta" } } },
    { "id": "P088", "name": "Jamal Iyer", "age": 39, "gender": "M", "symptoms": ["cough", "phlegm"], "doctorId": "D015", "visit": { "date": "2025-09-09", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-004", "description": "Kaphaja kasa" } } },
    { "id": "P089", "name": "Nadia Agarwal", "age": 42, "gender": "F", "symptoms": ["sadness", "loss of interest"], "doctorId": "D015", "visit": { "date": "2025-09-08", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-005", "description": "Manasika Vikar" } } },
    { "id": "P090", "name": "Farid Prasad", "age": 45, "gender": "M", "symptoms": ["painful urination", "frequency"], "doctorId": "D015", "visit": { "date": "2025-09-07", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-006", "description": "Mutrakrichhra" } } },
    { "id": "P091", "name": "Hana Das", "age": 48, "gender": "F", "symptoms": ["shortness of breath", "cough"], "doctorId": "D016", "visit": { "date": "2025-09-06", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-007", "description": "Shwasa" } } },
    { "id": "P092", "name": "Tariq Jain", "age": 51, "gender": "M", "symptoms": ["polyuria", "increased thirst"], "doctorId": "D016", "visit": { "date": "2025-09-05", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-008", "description": "Prameha" } } },
    { "id": "P093", "name": "Yasmin Shah", "age": 54, "gender": "F", "symptoms": ["indigestion", "bloating"], "doctorId": "D016", "visit": { "date": "2025-09-04", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-009", "description": "Agnimandya" } } },
    { "id": "P094", "name": "Khalid Mehta", "age": 57, "gender": "M", "symptoms": ["colicky pain", "localized pain"], "doctorId": "D016", "visit": { "date": "2025-09-03", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-010", "description": "Shula" } } },
    { "id": "P095", "name": "Amina Reddy", "age": 60, "gender": "F", "symptoms": ["fever", "headache"], "doctorId": "D016", "visit": { "date": "2025-09-02", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-011", "description": "Jwara" } } },
    { "id": "P096", "name": "Rashid Kumar", "age": 63, "gender": "M", "symptoms": ["high blood pressure readings", "headache"], "doctorId": "D016", "visit": { "date": "2025-09-01", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-012", "description": "Hridaya roga" } } },
    { "id": "P097", "name": "Sofia Singh", "age": 31, "gender": "F", "symptoms": ["polyuria", "polydipsia"], "doctorId": "D017", "visit": { "date": "2025-09-12", "diagnosis": { "system": "ICD-11", "code": "E11", "description": "Type 2 diabetes mellitus" } } },
    { "id": "P098", "name": "Zayd Patel", "age": 34, "gender": "M", "symptoms": ["headache", "dizziness"], "doctorId": "D017", "visit": { "date": "2025-09-11", "diagnosis": { "system": "ICD-11", "code": "I10", "description": "Essential (primary) hypertension" } } },
    { "id": "P099", "name": "Mila Joshi", "age": 37, "gender": "F", "symptoms": ["cough", "nasal congestion"], "doctorId": "D017", "visit": { "date": "2025-09-10", "diagnosis": { "system": "ICD-11", "code": "J06.9", "description": "Acute upper respiratory infection, unspecified" } } },
    { "id": "P100", "name": "Karim Desai", "age": 40, "gender": "M", "symptoms": ["lower back pain"], "doctorId": "D017", "visit": { "date": "2025-09-09", "diagnosis": { "system": "ICD-11", "code": "M54.5", "description": "Low back pain" } } },
    { "id": "P101", "name": "Dalia Verma", "age": 43, "gender": "F", "symptoms": ["severe headache", "nausea"], "doctorId": "D017", "visit": { "date": "2025-09-08", "diagnosis": { "system": "ICD-11", "code": "G43.9", "description": "Migraine without aura" } } },
    { "id": "P102", "name": "Nasir Sharma", "age": 46, "gender": "M", "symptoms": ["heartburn", "acid reflux"], "doctorId": "D017", "visit": { "date": "2025-09-07", "diagnosis": { "system": "ICD-11", "code": "K21.9", "description": "Gastro-esophageal reflux disease" } } },
    { "id": "P103", "name": "Salma Patel", "age": 49, "gender": "F", "symptoms": ["burning urination", "frequency"], "doctorId": "D018", "visit": { "date": "2025-09-06", "diagnosis": { "system": "ICD-11", "code": "N39.0", "description": "Urinary tract infection" } } },
    { "id": "P104", "name": "Idris Singh", "age": 52, "gender": "M", "symptoms": ["low mood", "insomnia"], "doctorId": "D018", "visit": { "date": "2025-09-05", "diagnosis": { "system": "ICD-11", "code": "F32.9", "description": "Major depressive disorder" } } },
    { "id": "P105", "name": "Nyla Kumar", "age": 55, "gender": "F", "symptoms": ["wheezing", "shortness of breath"], "doctorId": "D018", "visit": { "date": "2025-09-04", "diagnosis": { "system": "ICD-11", "code": "J45.9", "description": "Asthma, unspecified" } } },
    { "id": "P106", "name": "Malik Gupta", "age": 58, "gender": "M", "symptoms": ["muscle pain", "aches"], "doctorId": "D018", "visit": { "date": "2025-09-03", "diagnosis": { "system": "ICD-11", "code": "M79.1", "description": "Myalgia" } } },
    { "id": "P107", "name": "Jana Khan", "age": 61, "gender": "F", "symptoms": ["redness", "swelling"], "doctorId": "D018", "visit": { "date": "2025-09-02", "diagnosis": { "system": "ICD-11", "code": "L03.9", "description": "Cellulitis, unspecified" } } },
    { "id": "P108", "name": "Zahir Reddy", "age": 64, "gender": "M", "symptoms": ["fever", "body aches"], "doctorId": "D018", "visit": { "date": "2025-09-01", "diagnosis": { "system": "ICD-11", "code": "R50.9", "description": "Fever, unspecified" } } },
    { "id": "P109", "name": "Layan Joshi", "age": 33, "gender": "F", "symptoms": ["joint pain", "stiffness"], "doctorId": "D019", "visit": { "date": "2025-09-12", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-001", "description": "Amavata" } } },
    { "id": "P110", "name": "Rayan Nair", "age": 36, "gender": "M", "symptoms": ["swelling", "warmth"], "doctorId": "D019", "visit": { "date": "2025-09-11", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-002", "description": "Sotha (inflammation/edema)" } } },
    { "id": "P111", "name": "Dalal Menon", "age": 39, "gender": "F", "symptoms": ["joint pain", "redness"], "doctorId": "D019", "visit": { "date": "2025-09-10", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-003", "description": "Vatarakta" } } },
    { "id": "P112", "name": "Azlan Iyer", "age": 42, "gender": "M", "symptoms": ["cough", "phlegm"], "doctorId": "D019", "visit": { "date": "2025-09-09", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-004", "description": "Kaphaja kasa" } } },
    { "id": "P113", "name": "Yara Agarwal", "age": 45, "gender": "F", "symptoms": ["sadness", "loss of interest"], "doctorId": "D019", "visit": { "date": "2025-09-08", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-005", "description": "Manasika Vikar" } } },
    { "id": "P114", "name": "Zainab Prasad", "age": 48, "gender": "F", "symptoms": ["painful urination", "frequency"], "doctorId": "D019", "visit": { "date": "2025-09-07", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-006", "description": "Mutrakrichhra" } } },
    { "id": "P115", "name": "Meher Das", "age": 51, "gender": "F", "symptoms": ["shortness of breath", "cough"], "doctorId": "D020", "visit": { "date": "2025-09-06", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-007", "description": "Shwasa" } } },
    { "id": "P116", "name": "Ayan Jain", "age": 54, "gender": "M", "symptoms": ["polyuria", "increased thirst"], "doctorId": "D020", "visit": { "date": "2025-09-05", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-008", "description": "Prameha" } } },
    { "id": "P117", "name": "Aayat Shah", "age": 57, "gender": "F", "symptoms": ["indigestion", "bloating"], "doctorId": "D020", "visit": { "date": "2025-09-04", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-009", "description": "Agnimandya" } } },
    { "id": "P118", "name": "Emir Mehta", "age": 60, "gender": "M", "symptoms": ["colicky pain", "localized pain"], "doctorId": "D020", "visit": { "date": "2025-09-03", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-010", "description": "Shula" } } },
    { "id": "P119", "name": "Hoorain Reddy", "age": 63, "gender": "F", "symptoms": ["fever", "headache"], "doctorId": "D020", "visit": { "date": "2025-09-02", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-011", "description": "Jwara" } } },
    { "id": "P120", "name": "Daniyal Kumar", "age": 66, "gender": "M", "symptoms": ["high blood pressure readings", "headache"], "doctorId": "D020", "visit": { "date": "2025-09-01", "diagnosis": { "system": "NAMASTE", "code": "NAM-T-012", "description": "Hridaya roga" } } }
  ]
};

// --- MAPPING DICTIONARY ---
const diseaseMappings = {
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


// --- API ENDPOINTS ---

// Endpoint to get all doctors
app.get('/api/doctors', (req, res) => {
  res.json(database.doctors);
});

// Endpoint to get all patients
app.get('/api/patients', (req, res) => {
  res.json(database.patients);
});

// Endpoint to map/translate a medical code
app.post('/api/map', (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  let mappedData;
  const upperCaseCode = code.toUpperCase(); // Ensure code is uppercase for matching

  // Determine which dictionary to search in
  if (upperCaseCode.startsWith('NAM-')) {
    mappedData = diseaseMappings["NAMASTE To ICD"][upperCaseCode];
  } else {
    mappedData = diseaseMappings["ICD To NAMASTE"][upperCaseCode];
  }

  if (mappedData && mappedData.length > 0) {
    res.json(mappedData);
  } else {
    res.status(404).json({ error: 'Mapping not found for this code' });
  }
});


// --- SERVER START ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
