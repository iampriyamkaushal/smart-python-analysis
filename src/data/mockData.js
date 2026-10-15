export const SAMPLE_STUDENT_CSV = `Name,Age,Marks,Department
Aman,20,85,CSE
Riya,21,92,AIML
Rahul,20,78,CSE
Priya,22,88,AIML
Neha,21,95,CSE`;

export const SAMPLE_DIRTY_CSV = `Name,Age,Marks,Department
Aman,20,85,CSE
Riya,21,92,AIML
Rahul,20,78,CSE
Priya,22,,AIML
Neha,21,95,CSE
Aman,20,85,CSE`;

export const CERTIFICATES_DATABASE = [
  {
    id: "SPA-2026-001",
    student: "Demo Student",
    course: "Python Programming",
    issueDate: "15 September 2026",
    issuedBy: "Smart Python Analysis Academy",
    status: "VALID",
    grade: "Grade A+ (Distinction)",
    skills: ["Python Syntax", "Variables", "Data Types", "Control Flow", "Functions"]
  }
];

export const DEFAULT_USERS = [
  {
    id: "usr-001",
    name: "Demo Student",
    email: "student@smartpythonanalysis.com",
    password: "Password123!",
    role: "Active Learner",
    enrolledTrack: "Python Programming"
  },
  {
    id: "usr-002",
    name: "Aman Sharma",
    email: "aman@smartpythonanalysis.com",
    password: "Password123!",
    role: "Active Learner",
    enrolledTrack: "Python Programming"
  }
];
