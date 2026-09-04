const API_URL =
    "https://class-info-api.gangim2009.workers.dev";


// ==============================
// 공지사항 불러오기
// ==============================

async function loadNotices() {

    const noticeList =
        document.getElementById("notice-list");

    noticeList.textContent =
        "불러오는 중...";

    try {

        const response =
            await fetch(
                `${API_URL}/api/announcements`
            );

        if (!response.ok) {
            throw new Error(
                "공지사항을 불러오지 못했습니다."
            );
        }

        const notices =
            await response.json();

        if (notices.length === 0) {

            noticeList.textContent =
                "등록된 공지사항이 없습니다.";

            return;
        }

        noticeList.innerHTML = "";

        notices.forEach(notice => {

            const item =
                document.createElement("div");

            item.className =
                "admin-list-item";

            item.innerHTML = `
                <div>
                    <strong>
                        ${escapeHtml(notice.title)}
                    </strong>

                    <p>
                        ${escapeHtml(notice.content)}
                    </p>
                </div>

                <button
                    class="delete-button"
                    data-id="${notice.id}"
                    data-type="announcement"
                >
                    🗑️ 삭제
                </button>
            `;

            noticeList.appendChild(item);

        });

        addDeleteListeners();

    } catch (error) {

        console.error(error);

        noticeList.textContent =
            "공지사항을 불러오는 중 오류가 발생했습니다.";

    }
}


// ==============================
// 공지사항 저장
// ==============================

async function saveNotice() {

    const titleInput =
        document.getElementById("notice-title");

    const contentInput =
        document.getElementById("notice-content");

    const message =
        document.getElementById("notice-message");

    const title =
        titleInput.value.trim();

    const content =
        contentInput.value.trim();


    if (!title) {

        message.textContent =
            "제목을 입력해주세요.";

        return;
    }

    if (!content) {

        message.textContent =
            "내용을 입력해주세요.";

        return;
    }


    message.textContent =
        "저장 중...";


    try {

        const response =
            await fetch(
                `${API_URL}/api/announcements`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        title: title,
                        content: content
                    })
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "저장에 실패했습니다."
            );

        }


        message.textContent =
            "✅ 공지사항이 저장되었습니다.";


        titleInput.value = "";
        contentInput.value = "";


        await loadNotices();


    } catch (error) {

        console.error(error);

        message.textContent =
            `❌ ${error.message}`;

    }
}


// ==============================
// 수행평가 불러오기
// ==============================

async function loadAssessments() {

    const assessmentList =
        document.getElementById(
            "assessment-list"
        );

    assessmentList.textContent =
        "불러오는 중...";


    try {

        const response =
            await fetch(
                `${API_URL}/api/assessments`
            );


        if (!response.ok) {

            throw new Error(
                "수행평가를 불러오지 못했습니다."
            );

        }


        const assessments =
            await response.json();


        if (assessments.length === 0) {

            assessmentList.textContent =
                "등록된 수행평가가 없습니다.";

            return;
        }


        assessmentList.innerHTML = "";


        assessments.forEach(assessment => {

            const item =
                document.createElement("div");

            item.className =
                "admin-list-item";


            item.innerHTML = `
                <div>

                    <strong>
                        ${escapeHtml(
                            assessment.subject
                        )}
                        ·
                        ${escapeHtml(
                            assessment.title
                        )}
                    </strong>

                    <p>
                        날짜:
                        ${escapeHtml(
                            assessment.date
                        )}
                    </p>

                    <p>
                        ${escapeHtml(
                            assessment.content
                        )}
                    </p>

                </div>

                <button
                    class="delete-button"
                    data-id="${assessment.id}"
                    data-type="assessment"
                >
                    🗑️ 삭제
                </button>
            `;


            assessmentList.appendChild(item);

        });


        addDeleteListeners();


    } catch (error) {

        console.error(error);

        assessmentList.textContent =
            "수행평가를 불러오는 중 오류가 발생했습니다.";

    }

}


// ==============================
// 수행평가 저장
// ==============================

async function saveAssessment() {

    const subjectInput =
        document.getElementById(
            "assessment-subject"
        );

    const titleInput =
        document.getElementById(
            "assessment-title"
        );

    const dateInput =
        document.getElementById(
            "assessment-date"
        );

    const contentInput =
        document.getElementById(
            "assessment-content"
        );

    const message =
        document.getElementById(
            "assessment-message"
        );


    const subject =
        subjectInput.value.trim();

    const title =
        titleInput.value.trim();

    const date =
        dateInput.value;

    const content =
        contentInput.value.trim();


    if (!subject) {

        message.textContent =
            "과목을 입력해주세요.";

        return;
    }

    if (!title) {

        message.textContent =
            "제목을 입력해주세요.";

        return;
    }

    if (!date) {

        message.textContent =
            "날짜를 선택해주세요.";

        return;
    }

    if (!content) {

        message.textContent =
            "내용을 입력해주세요.";

        return;
    }


    message.textContent =
        "저장 중...";


    try {

        const response =
            await fetch(
                `${API_URL}/api/assessments`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        subject: subject,
                        title: title,
                        date: date,
                        content: content
                    })
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "저장에 실패했습니다."
            );

        }


        message.textContent =
            "✅ 수행평가가 저장되었습니다.";


        subjectInput.value = "";
        titleInput.value = "";
        dateInput.value = "";
        contentInput.value = "";


        await loadAssessments();


    } catch (error) {

        console.error(error);

        message.textContent =
            `❌ ${error.message}`;

    }

}


// ==============================
// 학사일정 불러오기
// ==============================

async function loadCalendar() {

    const calendarList =
        document.getElementById(
            "calendar-list"
        );

    calendarList.textContent =
        "불러오는 중...";


    try {

        const response =
            await fetch(
                `${API_URL}/api/calendar`
            );


        if (!response.ok) {

            throw new Error(
                "학사일정을 불러오지 못했습니다."
            );

        }


        const calendar =
            await response.json();


        if (calendar.length === 0) {

            calendarList.textContent =
                "등록된 학사일정이 없습니다.";

            return;
        }


        calendarList.innerHTML = "";


        calendar.forEach(item => {

            const element =
                document.createElement("div");

            element.className =
                "admin-list-item";


            element.innerHTML = `
                <div>

                    <strong>
                        ${formatCalendarDate(
                            item.date
                        )}
                    </strong>

                    <p>
                        ${escapeHtml(
                            item.title
                        )}
                    </p>

                </div>

                <button
                    class="delete-button"
                    data-id="${item.id}"
                    data-type="calendar"
                >
                    🗑️ 삭제
                </button>
            `;


            calendarList.appendChild(element);

        });


        addDeleteListeners();


    } catch (error) {

        console.error(error);

        calendarList.textContent =
            "학사일정을 불러오는 중 오류가 발생했습니다.";

    }

}


// ==============================
// 학사일정 저장
// ==============================

async function saveCalendar() {

    const dateInput =
        document.getElementById(
            "calendar-date"
        );

    const titleInput =
        document.getElementById(
            "calendar-title"
        );

    const message =
        document.getElementById(
            "calendar-message"
        );


    const date =
        dateInput.value;

    const title =
        titleInput.value.trim();


    if (!date) {

        message.textContent =
            "날짜를 선택해주세요.";

        return;
    }


    if (!title) {

        message.textContent =
            "일정 제목을 입력해주세요.";

        return;
    }


    message.textContent =
        "저장 중...";


    try {

        const response =
            await fetch(
                `${API_URL}/api/calendar`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        date: date,
                        title: title
                    })
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "저장에 실패했습니다."
            );

        }


        message.textContent =
            "✅ 학사일정이 저장되었습니다.";


        dateInput.value = "";
        titleInput.value = "";


        await loadCalendar();


    } catch (error) {

        console.error(error);

        message.textContent =
            `❌ ${error.message}`;

    }

}


// ==============================
// 시험 D-DAY 불러오기
// ==============================

async function loadExam() {

    const examInfo =
        document.getElementById(
            "exam-info"
        );

    examInfo.textContent =
        "불러오는 중...";


    try {

        const response =
            await fetch(
                `${API_URL}/api/exam`
            );


        if (!response.ok) {

            throw new Error(
                "시험 정보를 불러오지 못했습니다."
            );

        }


        const exam =
            await response.json();


        if (!exam) {

            examInfo.textContent =
                "등록된 시험이 없습니다.";

            document.getElementById(
                "exam-name"
            ).value = "";

            document.getElementById(
                "exam-date"
            ).value = "";

            return;
        }


        examInfo.innerHTML = `
            <div class="admin-list-item">

                <div>

                    <strong>
                        ${escapeHtml(
                            exam.name
                        )}
                    </strong>

                    <p>
                        시험 날짜:
                        ${escapeHtml(
                            exam.date
                        )}
                    </p>

                </div>

                <button
                    class="delete-button"
                    data-id="1"
                    data-type="exam"
                >
                    🗑️ 삭제
                </button>

            </div>
        `;


        document.getElementById(
            "exam-name"
        ).value = exam.name;

        document.getElementById(
            "exam-date"
        ).value = exam.date;


        addDeleteListeners();


    } catch (error) {

        console.error(error);

        examInfo.textContent =
            "시험 정보를 불러오는 중 오류가 발생했습니다.";

    }

}


// ==============================
// 시험 D-DAY 저장
// ==============================

async function saveExam() {

    const nameInput =
        document.getElementById(
            "exam-name"
        );

    const dateInput =
        document.getElementById(
            "exam-date"
        );

    const message =
        document.getElementById(
            "exam-message"
        );


    const name =
        nameInput.value.trim();

    const date =
        dateInput.value;


    if (!name) {

        message.textContent =
            "시험 이름을 입력해주세요.";

        return;
    }


    if (!date) {

        message.textContent =
            "시험 날짜를 선택해주세요.";

        return;
    }


    message.textContent =
        "저장 중...";


    try {

        const response =
            await fetch(
                `${API_URL}/api/exam`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        date: date
                    })
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "저장에 실패했습니다."
            );

        }


        message.textContent =
            "✅ 시험 정보가 저장되었습니다.";


        await loadExam();


    } catch (error) {

        console.error(error);

        message.textContent =
            `❌ ${error.message}`;

    }

}


// ==============================
// 삭제
// ==============================

async function deleteItem(id, type) {

    const names = {
        announcement: "공지사항",
        assessment: "수행평가",
        calendar: "학사일정",
        exam: "시험 D-Day"
    };

    const name =
        names[type] || "항목";


    const confirmed =
        confirm(
            `정말 이 ${name}을(를) 삭제하시겠습니까?`
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/${getApiName(type)}/${id}`,
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "삭제에 실패했습니다."
            );

        }


        alert(
            `✅ ${name}이(가) 삭제되었습니다.`
        );


        if (type === "announcement") {
            await loadNotices();
        }

        if (type === "assessment") {
            await loadAssessments();
        }

        if (type === "calendar") {
            await loadCalendar();
        }

        if (type === "exam") {
            await loadExam();
        }


    } catch (error) {

        console.error(error);

        alert(
            `❌ ${error.message}`
        );

    }

}


function getApiName(type) {

    const names = {
        announcement: "announcements",
        assessment: "assessments",
        calendar: "calendar",
        exam: "exam"
    };

    return names[type];

}


// ==============================
// 삭제 버튼 연결
// ==============================

function addDeleteListeners() {

    document
        .querySelectorAll(".delete-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.id;

                    const type =
                        button.dataset.type;

                    deleteItem(
                        id,
                        type
                    );

                }
            );

        });

}


// ==============================
// 날짜 표시
// ==============================

function formatCalendarDate(dateString) {

    const parts =
        dateString.split("-");

    return `${Number(parts[1])}/${Number(parts[2])}`;

}


// ==============================
// HTML 특수문자 처리
// ==============================

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


// ==============================
// 버튼 연결
// ==============================

// 공지사항

document
    .getElementById("notice-save-button")
    .addEventListener(
        "click",
        saveNotice
    );

document
    .getElementById("refresh-notices")
    .addEventListener(
        "click",
        loadNotices
    );


// 수행평가

document
    .getElementById("assessment-save-button")
    .addEventListener(
        "click",
        saveAssessment
    );

document
    .getElementById("refresh-assessments")
    .addEventListener(
        "click",
        loadAssessments
    );


// 학사일정

document
    .getElementById("calendar-save-button")
    .addEventListener(
        "click",
        saveCalendar
    );

document
    .getElementById("refresh-calendar")
    .addEventListener(
        "click",
        loadCalendar
    );


// 시험 D-DAY

document
    .getElementById("exam-save-button")
    .addEventListener(
        "click",
        saveExam
    );

document
    .getElementById("refresh-exam")
    .addEventListener(
        "click",
        loadExam
    );


// ==============================
// 페이지 시작
// ==============================

loadNotices();
loadAssessments();
loadCalendar();
loadExam();