import { detectColumnType, computeColumnStats, analyzeQuality } from './src/utils/analysisHelpers.js';
import { CERTIFICATES_DATABASE, DEFAULT_USERS, SAMPLE_STUDENT_CSV, SAMPLE_DIRTY_CSV } from './src/data/mockData.js';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failCount++;
  }
}

console.log("=== RUNNING UNIT & DATA PIPELINE TESTS ===");

// 1. Test detectColumnType
assert(detectColumnType(["1", "2", "3"]) === "Integer (Number)", "detectColumnType identifies Integer");
assert(detectColumnType(["1.5", "2.8", "3.0"]) === "Float (Number)", "detectColumnType identifies Float");
assert(detectColumnType(["2026-09-01", "2026-09-15"]) === "Date", "detectColumnType identifies Date");
assert(detectColumnType(["Aman", "Riya", "Rahul"]) === "String (Text)", "detectColumnType identifies Text");

// 2. Test computeColumnStats
const stats = computeColumnStats(["85", "92", "78", "88", "95"]);
assert(stats !== null, "computeColumnStats returns valid object");
assert(Number(stats.count) === 5, "computeColumnStats count is 5");
assert(Number(stats.min) === 78, "computeColumnStats min is 78");
assert(Number(stats.max) === 95, "computeColumnStats max is 95");
assert(Number(stats.mean) === 87.6, "computeColumnStats mean is 87.60");

// 3. Test analyzeQuality on clean data
const cleanRows = SAMPLE_STUDENT_CSV.trim().split(/\r?\n/).map(r => r.split(","));
const cleanQuality = analyzeQuality(cleanRows[0], cleanRows.slice(1));
assert(cleanQuality.totalMissing === 0, "Clean sample has 0 missing values");
assert(cleanQuality.duplicateRowsCount === 0, "Clean sample has 0 duplicates");
assert(cleanQuality.completeness === "100.0", "Clean sample has 100.0% completeness");

// 4. Test analyzeQuality on dirty data
const dirtyRows = SAMPLE_DIRTY_CSV.trim().split(/\r?\n/).map(r => r.split(","));
const dirtyQuality = analyzeQuality(dirtyRows[0], dirtyRows.slice(1));
assert(dirtyQuality.totalMissing > 0, "Dirty sample detects missing cells");
assert(dirtyQuality.duplicateRowsCount > 0, "Dirty sample detects duplicate rows");
assert(Number(dirtyQuality.completeness) < 100, "Dirty sample completeness is below 100%");

// 5. Test Certificate Registry
assert(CERTIFICATES_DATABASE.length === 1, "Only the available Python course certificate is listed");
const cert1 = CERTIFICATES_DATABASE.find(c => c.id === "SPA-2026-001");
assert(cert1 && cert1.status === "VALID" && cert1.course === "Python Programming", "SPA-2026-001 is a valid Python Programming certificate");
const fakeCert = CERTIFICATES_DATABASE.find(c => c.id === "SPA-999-FAKE");
assert(!fakeCert, "SPA-999-FAKE does not exist in registry (Invalid rejected)");

// 6. Test Default Users
assert(DEFAULT_USERS.length >= 2, "Default users database has at least 2 users");
assert(DEFAULT_USERS.some(u => u.email === "student@smartpythonanalysis.com"), "student demo user exists");

console.log(`\nTEST RESULTS: ${passCount} Passed, ${failCount} Failed.`);
if (failCount > 0) process.exit(1);
