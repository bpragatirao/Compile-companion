# Compile Companion 🚀

**Compile Companion** is a unified web-based coding ecosystem designed to bridge the gap between classroom learning and hands-on programming. It provides a seamless interface for students to practice coding in a sandboxed playground and for faculties to manage, review, and grade assignments in real-time.

---

## 🌟 Core Features

### 🎓 For Students
* **Interactive Playground:** A browser-based IDE with syntax highlighting and multi-language support.
* **One-Click Submission:** Submit lab assignments directly from the editor without managing external files.
* **Instant Feedback:** Run code against pre-defined test cases to validate logic before final submission.
* **Real-time Sync:** Never lose progress thanks to Firebase’s real-time data persistence.

### 👩‍🏫 For Faculty
* **Automated Assessment:** Create assignments with hidden test cases for auto-grading.
* **Live Monitoring:** View student code as they write it via Firestore real-time listeners.
* **Role-Based Access:** Secure dashboards for faculty to manage grades and student rosters.
* **Class Analytics:** Visualize performance trends across the entire batch.

---

## 🏗️ Technical Architecture (Serverless via Firebase)

The platform leverages a serverless architecture to ensure high availability and real-time synchronization between students and educators.

| Service | Implementation | Purpose |
| :--- | :--- | :--- |
| **Authentication** | Firebase Auth | Secure login for Students and Faculty with Role-Based Access Control (RBAC). |
| **Database** | Cloud Firestore | Real-time NoSQL storage for code snippets, assignment data, and grading logs. |
| **Code Execution** | Firebase Functions | Securely triggers remote compilation APIs in a sandboxed environment. |
| **Hosting** | Firebase Hosting | Optimized global delivery of the React frontend application. |

---

## 💻 Code Highlight: Real-time Firebase Sync

Because we use **Firestore**, student code is automatically saved and synchronized across sessions.

```javascript
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase-config";

// Auto-save student progress to Firestore
const saveProgress = async (submissionId, currentCode) => {
  const submissionRef = doc(db, "submissions", submissionId);
  
  await updateDoc(submissionRef, {
    code: currentCode,
    updatedAt: serverTimestamp()
  });
};
```
