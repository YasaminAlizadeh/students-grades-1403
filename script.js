import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEUw-OipwA2thQTsfXFNwbKMwvt8BTrn0",
  authDomain: "students-grades-1403.firebaseapp.com",
  projectId: "students-grades-1403",
  storageBucket: "students-grades-1403.firebasestorage.app",
  messagingSenderId: "480078436570",
  appId: "1:480078436570:web:0a5bd51ae3d2b5a59eade3",
  measurementId: "G-HSTBCR1VL5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const codeSInput = document.querySelector("#code_input");
  const codeSubmitBtn = document.querySelector("#code_btn");
  const errorMsg = document.querySelector("#error_msg");

  const dataTable = document.querySelector("#data-table");
  const nameCell = document.querySelector("#name");
  const codeMelliCell = document.querySelector("#code");
  const lesson1 = document.querySelector("#lesson_1");
  const grade1 = document.querySelector("#lesson_1_grade");
  const lesson2 = document.querySelector("#lesson_2");
  const grade2 = document.querySelector("#lesson_2_grade");

  codeSubmitBtn.addEventListener("click", () => {
    const inputCode = codeSInput.value;

    if (!inputCode) showError("⚠ ورود کد ملی الزامی است.");
    else if (inputCode.length !== 10)
      showError("⚠ کد ملی وارد شده معتبر نمی‌باشد.");
    else {
      displayGrades(inputCode);
    }
  });

  const showError = (str) => {
    errorMsg.innerText = str;
  };

  const displayGrades = (code) => {
    getStudent(code)
      .then((student) => {
        dataTable.classList.remove("data__table--disabled");
        nameCell.innerText = `${student.name}`;
        codeMelliCell.innerText = `${code}`;
        lesson1.innerText =
          student.grade === "دهم"
            ? "گرافیک رایانه دهم"
            : "گرافیک رایانه یازدهم";
        grade1.innerText =
          student.score_1 > 17
            ? `${student.score_1} 🌟`
            : student.score_1 < 14 || student.score_1 === "غایب"
            ? `${student.score_1} ⚠`
            : student.score_1;
        grade1.classList = `lesson__grade ${
          student.score_1 > 17
            ? "grade--success"
            : student.score_1 < 14 || student.score_1 === "غایب"
            ? "grade--error"
            : ""
        }`;

        lesson2.innerText =
          student.grade === "دهم" ? "طراحی گرافیک سیاه و سفید" : "تایپ رایانه";
        grade2.innerText =
          student.score_2 > 17
            ? `${student.score_2} 🌟`
            : student.score_2 < 14 || student.score_2 === "غایب"
            ? `${student.score_2} ⚠`
            : student.score_2;
        grade2.classList = `lesson__grade ${
          student.score_2 > 17
            ? "grade--success"
            : student.score_2 < 14 || student.score_2 === "غایب"
            ? "grade--error"
            : ""
        }`;
      })
      .catch((err) => console.error(err));
  };
});

async function getStudent(studentCode) {
  const docRef = doc(db, "students", studentCode);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such student!");
    return null;
  }
}
