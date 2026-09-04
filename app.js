
const API_URL =
    "https://class-info-api.gangim2009.workers.dev";

const NEIS_API_URL =
    "https://school-class-api.gangim2009.workers.dev";


// ==============================
// 학교 정보
// ==============================

const SCHOOL = {
    officeCode: "E10",
    schoolCode: "7310036",
    grade: "2",
    className: "1"
};


// ==============================
// 시간표 과목명 변경
// ==============================

const SUBJECT_NAMES = {
    "경제수학": "A_경제수학",
    "도시의 미래 탐구": "B_도시의 미래 탐구",
    "경제": "D_경제",
    "윤리와 사상": "E_윤리와 사상"
};


// ==============================
// 공지사항 불러오기
// ==============================

async function loadAnnouncements() {

    const list =
        document.querySelector(".announcements .list");

    try {

        const response = await fetch(
            `${API_URL}/api/announcements`
        );

        if (!response.ok) {
            throw new Error(
                "공지사항을 불러오지 못했습니다."
            );
        }

        const announcements =
            await response.json();

        list.innerHTML = "";

        if (announcements.length === 0) {

            list.innerHTML = `
                <div class="empty-message">
                    등록된 공지사항이 없습니다.
                </div>
            `;

            return;
        }

        announcements
            .slice(0, 4)
            .forEach(announcement => {

                const button =
                    document.createElement("button");

                button.className =
                    "list-item";

                button.innerHTML = `
                    <span>
                        ${escapeHtml(announcement.title)}
                    </span>

                    <span>›</span>
                `;

                button.addEventListener(
                    "click",
                    () => {

                        openModal(
                            announcement.title,
                            announcement.content
                        );

                    }
                );

                list.appendChild(button);

            });

    } catch (error) {

        console.error(error);

        list.innerHTML = `
            <div class="empty-message">
                공지사항을 불러오지 못했습니다.
            </div>
        `;

    }
}


// ==============================
// 전체 공지사항 보기
// ==============================

async function showAllAnnouncements() {

    try {

        const response = await fetch(
            `${API_URL}/api/announcements`
        );

        if (!response.ok) {
            throw new Error(
                "공지사항을 불러오지 못했습니다."
            );
        }

        const announcements =
            await response.json();

        if (announcements.length === 0) {

            openModal(
                "📢 공지사항",
                "등록된 공지사항이 없습니다."
            );

            return;
        }

        let html = "";

        announcements.forEach(announcement => {

            html += `
                <div class="all-announcement">

                    <h3>
                        ${escapeHtml(announcement.title)}
                    </h3>

                    <p>
                        ${escapeHtml(announcement.content)}
                    </p>

                </div>
            `;

        });

        openModal(
            "📢 전체 공지사항",
            html,
            true
        );

    } catch (error) {

        console.error(error);

        openModal(
            "오류",
            "공지사항을 불러오지 못했습니다."
        );

    }
}


// ==============================
// 수행평가 불러오기
// ==============================

async function loadAssessments() {

    const list =
        document.querySelector(".assessments .list");

    try {

        const response = await fetch(
            `${API_URL}/api/assessments`
        );

        if (!response.ok) {
            throw new Error(
                "수행평가를 불러오지 못했습니다."
            );
        }

        const assessments =
            await response.json();

        list.innerHTML = "";

        if (assessments.length === 0) {

            list.innerHTML = `
                <div class="empty-message">
                    등록된 수행평가가 없습니다.
                </div>
            `;

            return;
        }

        assessments.sort((a, b) =>
            a.date.localeCompare(b.date)
        );

        assessments
            .slice(0, 4)
            .forEach(assessment => {

                const button =
                    document.createElement("button");

                button.className =
                    "list-item";

                const date =
                    formatAssessmentDate(
                        assessment.date
                    );

                button.innerHTML = `
                    <span>
                        <b>${date}</b>
                        　${escapeHtml(assessment.subject)}
                        　${escapeHtml(assessment.title)}
                    </span>

                    <span>›</span>
                `;

                button.addEventListener(
                    "click",
                    () => {

                        openModal(
                            `${assessment.subject} · ${assessment.title}`,

                            `평가 날짜: ${formatAssessmentDate(
                                assessment.date
                            )}

${assessment.content}`
                        );

                    }
                );

                list.appendChild(button);

            });

    } catch (error) {

        console.error(error);

        list.innerHTML = `
            <div class="empty-message">
                수행평가를 불러오지 못했습니다.
            </div>
        `;

    }
}


// ==============================
// 전체 수행평가 보기
// ==============================

async function showAllAssessments() {

    try {

        const response = await fetch(
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

            openModal(
                "📝 수행평가",
                "등록된 수행평가가 없습니다."
            );

            return;
        }

        assessments.sort((a, b) =>
            a.date.localeCompare(b.date)
        );

        let html = "";

        assessments.forEach(assessment => {

            html += `
                <div class="all-announcement">

                    <h3>
                        ${formatAssessmentDate(
                            assessment.date
                        )}
                        　${escapeHtml(
                             assessment.subject
                         )}
                        　${escapeHtml(
                             assessment.title
                         )}
                    </h3>

                    <p>
                        ${escapeHtml(
                            assessment.content
                        )}
                    </p>

                </div>
            `;

        });

        openModal(
            "📝 전체 수행평가",
            html,
            true
        );

    } catch (error) {

        console.error(error);

        openModal(
            "오류",
            "수행평가를 불러오지 못했습니다."
        );

    }
}


// ==============================
// 수행평가 날짜 표시
// ==============================

function formatAssessmentDate(dateString) {

    const parts =
        dateString.split("-");

    return `${Number(parts[1])}/${Number(parts[2])}`;

}


// ==============================
// 학사일정 불러오기
// ==============================

async function loadCalendar() {

    const list =
        document.querySelector(".calendar-list");

    try {

        const response = await fetch(
            `${API_URL}/api/calendar`
        );

        if (!response.ok) {
            throw new Error(
                "학사일정을 불러오지 못했습니다."
            );
        }

        const calendar =
            await response.json();

        list.innerHTML = "";

        if (calendar.length === 0) {

            list.innerHTML = `
                <div class="empty-message">
                    등록된 학사일정이 없습니다.
                </div>
            `;

            return;
        }

        calendar.sort((a, b) =>
            a.date.localeCompare(b.date)
        );

        calendar
            .slice(0, 4)
            .forEach(item => {

                const element =
                    document.createElement("div");

                element.className =
                    "calendar-item";

                element.innerHTML = `
                    <b>
                        ${formatCalendarDate(item.date)}
                    </b>

                    <span>
                        ${escapeHtml(item.title)}
                    </span>
                `;

                list.appendChild(element);

            });

    } catch (error) {

        console.error(error);

        list.innerHTML = `
            <div class="empty-message">
                학사일정을 불러오지 못했습니다.
            </div>
        `;

    }
}


// ==============================
// 학사일정 날짜 표시
// ==============================

function formatCalendarDate(dateString) {

    const parts =
        dateString.split("-");

    return `${Number(parts[1])}/${Number(parts[2])}`;

}


// ==============================
// 전체 학사일정 보기
// ==============================

async function showAllCalendar() {

    try {

        const response = await fetch(
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

            openModal(
                "📅 학사일정",
                "등록된 학사일정이 없습니다."
            );

            return;
        }

        calendar.sort((a, b) =>
            a.date.localeCompare(b.date)
        );

        let html = "";

        calendar.forEach(item => {

            html += `
                <div class="all-announcement">

                    <h3>
                        ${formatCalendarDate(item.date)}
                        　${escapeHtml(item.title)}
                    </h3>

                </div>
            `;

        });

        openModal(
            "📅 전체 학사일정",
            html,
            true
        );

    } catch (error) {

        console.error(error);

        openModal(
            "오류",
            "학사일정을 불러오지 못했습니다."
        );

    }
}


// ==============================
// 시험 D-DAY 불러오기
// ==============================

async function loadExam() {

    const dday =
        document.querySelector(".dday");

    try {

        const response = await fetch(
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

            dday.textContent =
                "📝 등록된 시험이 없습니다.";

            return;
        }

        const today =
            new Date();

        const todayDate =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            );

        const parts =
            exam.date.split("-");

        const examDate =
            new Date(
                Number(parts[0]),
                Number(parts[1]) - 1,
                Number(parts[2])
            );

        const diff =
            Math.round(
                (examDate - todayDate) /
                (1000 * 60 * 60 * 24)
            );

        let ddayText;

        if (diff > 0) {

            ddayText =
                `D-${diff}`;

        } else if (diff === 0) {

            ddayText =
                "D-DAY";

        } else {

            ddayText =
                `D+${Math.abs(diff)}`;

        }

        dday.innerHTML = `
            📝 ${escapeHtml(exam.name)}까지
            <strong>${ddayText}</strong>
        `;

    } catch (error) {

        console.error(error);

        dday.textContent =
            "📝 시험 정보를 불러오지 못했습니다.";

    }
}


// ==================================================
// 시간표 + 급식
// ==================================================


// ==============================
// 선택된 날짜
// ==============================

let selectedDate = new Date();


// ==============================
// 날짜 → YYYYMMDD
// ==============================

function formatDateForNEIS(date) {

    const year =
        date.getFullYear();

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(date.getDate())
            .padStart(2, "0");

    return `${year}${month}${day}`;
}


// ==============================
// 날짜 → 화면 표시
// ==============================

function formatDisplayDate(date) {

    const weekdays = [
        "일",
        "월",
        "화",
        "수",
        "목",
        "금",
        "토"
    ];

    return `${date.getMonth() + 1}월 ${date.getDate()}일 (${weekdays[date.getDay()]})`;
}


// ==============================
// 날짜 표시 업데이트
// ==============================

function updateDateDisplay() {

    const text =
        formatDisplayDate(selectedDate);

    const timetableDate =
        document.querySelector(
            ".timetable .date-selector span"
        );

    const mealDate =
        document.querySelector(
            ".meals .date-selector span"
        );

    if (timetableDate) {
        timetableDate.textContent = text;
    }

    if (mealDate) {
        mealDate.textContent = text;
    }
}


// ==============================
// 이전 날짜
// ==============================

function movePreviousDay() {

    selectedDate.setDate(
        selectedDate.getDate() - 1
    );

    updateDateDisplay();

    loadTimetable();
    loadMeals();
}


// ==============================
// 다음 날짜
// ==============================

function moveNextDay() {

    selectedDate.setDate(
        selectedDate.getDate() + 1
    );

    updateDateDisplay();

    loadTimetable();
    loadMeals();
}


// ==============================
// 시간표 불러오기
// ==============================

async function loadTimetable() {

    const list =
        document.querySelector(
            ".timetable-list"
        );

    if (!list) return;

    const date =
        formatDateForNEIS(selectedDate);

    list.innerHTML = `
        <div class="empty-message">
            시간표를 불러오는 중...
        </div>
    `;

    try {

        const url =
            `${NEIS_API_URL}/api/timetable` +
            `?date=${date}` +
            `&officeCode=${encodeURIComponent(
                SCHOOL.officeCode
            )}` +
            `&schoolCode=${encodeURIComponent(
                SCHOOL.schoolCode
            )}` +
            `&grade=${encodeURIComponent(
                SCHOOL.grade
            )}` +
            `&className=${encodeURIComponent(
                SCHOOL.className
            )}`;

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error(
                "시간표를 불러오지 못했습니다."
            );
        }

        const data =
            await response.json();

        const timetable =
            data.timetable || [];

        list.innerHTML = "";

        if (timetable.length === 0) {

            list.innerHTML = `
                <div class="empty-message">
                    해당 날짜의 시간표가 없습니다.
                </div>
            `;

            return;
        }

        timetable.forEach(
            (subject, index) => {

                const row =
                    document.createElement("div");

                const displaySubject =
                    SUBJECT_NAMES[subject] ||
                    subject;

                row.innerHTML = `
                    <span>
                        ${index + 1}교시
                    </span>

                    <b>
                        ${escapeHtml(
                            displaySubject
                        )}
                    </b>
                `;

                list.appendChild(row);

            }
        );

    } catch (error) {

        console.error(error);

        list.innerHTML = `
            <div class="empty-message">
                시간표를 불러오지 못했습니다.
            </div>
        `;
    }
}



// ==============================
// 급식 불러오기
// ==============================

async function loadMeals() {
    const date = formatDateForNEIS(selectedDate);

    const url =
        `${NEIS_API_URL}/api/meal` +
        `?date=${date}` +
        `&officeCode=${encodeURIComponent(SCHOOL.officeCode)}` +
        `&schoolCode=${encodeURIComponent(SCHOOL.schoolCode)}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("급식을 불러오지 못했습니다.");
        }

        const data = await response.json();

        renderMeal(0, "🌅 조식", data.meals?.["1"] || []);
        renderMeal(1, "☀️ 중식", data.meals?.["2"] || []);
        renderMeal(2, "🌙 석식", data.meals?.["3"] || []);

    } catch (error) {
        console.error(error);
        // 오류 표시
    }
}




// ==============================
// 한 끼 급식 표시
// ==============================

function renderMeal(
    index,
    title,
    menu
) {

    const meal =
        document.querySelectorAll(
            ".meal-grid .meal"
        )[index];

    if (!meal) return;

    if (!menu || menu.length === 0) {

        meal.innerHTML = `
            <h3>${title}</h3>
            <p>급식이 없습니다.</p>
        `;

        return;
    }

    meal.innerHTML = `
        <h3>${title}</h3>

        ${menu
            .map(
                item =>
                    `<p>${escapeHtml(item)}</p>`
            )
            .join("")
        }
    `;
}


// ==============================
// 팝업 열기
// ==============================

function openModal(
    title,
    content,
    isHtml = false
) {

    const modal =
        document.getElementById("modal");

    const modalTitle =
        document.getElementById("modal-title");

    const modalContent =
        document.getElementById("modal-content");

    modalTitle.textContent =
        title;

    if (isHtml) {

        modalContent.innerHTML =
            content;

    } else {

        modalContent.textContent =
            content;

    }

    modal.classList.remove("hidden");
}


// ==============================
// 팝업 닫기
// ==============================

function closeModal() {

    document
        .getElementById("modal")
        .classList.add("hidden");

}


// ==============================
// 팝업 닫기 버튼
// ==============================

document
    .querySelector(".modal-close")
    .addEventListener(
        "click",
        closeModal
    );


// ==============================
// 팝업 바깥쪽 클릭
// ==============================

document
    .getElementById("modal")
    .addEventListener(
        "click",
        event => {

            if (
                event.target.id === "modal"
            ) {

                closeModal();

            }

        }
    );


// ==============================
// HTML 특수문자 처리
// ==============================

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text ?? "";

    return div.innerHTML;

}


// ==============================
// 자세히 보기 버튼
// ==============================

// 공지사항

const announcementMoreButton =
    document.querySelector(
        ".announcements .more-button"
    );

if (announcementMoreButton) {

    announcementMoreButton.addEventListener(
        "click",
        showAllAnnouncements
    );

}


// 수행평가

const assessmentMoreButton =
    document.querySelector(
        ".assessments .more-button"
    );

if (assessmentMoreButton) {

    assessmentMoreButton.addEventListener(
        "click",
        showAllAssessments
    );

}


// 학사일정

const calendarMoreButton =
    document.querySelector(
        ".calendar .more-button"
    );

if (calendarMoreButton) {

    calendarMoreButton.addEventListener(
        "click",
        showAllCalendar
    );

}


// ==============================
// 시간표 날짜 버튼
// ==============================

const timetablePreviousButton =
    document.querySelector(
        ".timetable .date-selector button:first-child"
    );

const timetableNextButton =
    document.querySelector(
        ".timetable .date-selector button:last-child"
    );

if (timetablePreviousButton) {

    timetablePreviousButton.addEventListener(
        "click",
        movePreviousDay
    );

}

if (timetableNextButton) {

    timetableNextButton.addEventListener(
        "click",
        moveNextDay
    );

}


// ==============================
// 급식 날짜 버튼
// ==============================

const mealPreviousButton =
    document.querySelector(
        ".meals .date-selector button:first-child"
    );

const mealNextButton =
    document.querySelector(
        ".meals .date-selector button:last-child"
    );

if (mealPreviousButton) {

    mealPreviousButton.addEventListener(
        "click",
        movePreviousDay
    );

}

if (mealNextButton) {

    mealNextButton.addEventListener(
        "click",
        moveNextDay
    );

}


// ==============================
// 페이지 시작
// ==============================

updateDateDisplay();

loadAnnouncements();
loadAssessments();
loadCalendar();
loadExam();

loadTimetable();
loadMeals();
