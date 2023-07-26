//________________Функция, отвечающая за списочек услуг_______________
document.querySelectorAll('.dropdown').forEach(function (dropdownWrapper){

    const dropDownBtn = dropdownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropdownWrapper.querySelector('.dropdown__list');
    const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropdownInput = dropdownWrapper.querySelector('.dropdown__input-hidden');

	// Клик по кнопке. Открыть/Закрыть select
    dropDownBtn.addEventListener('click',function(){
        dropDownList.classList.toggle('dropdown__list--visible');
        this.classList.add('.dropdown__button--active');
    });

    // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
    dropDownListItems.forEach(function (listItem) {
            listItem.addEventListener('click', function (e) {
            dropDownBtn.innerText = this.innerText;
            dropdownInput.value = this.innerText; // Передает название услуги
            e.stopPropagation();
            dropDownBtn.focus();
            console.log(dropdownInput.value)
            dropDownList.classList.remove('dropdown__list--visible');
        });
    });

    // Клик снаружи дропдауна. Закрыть дропдаун
    document.addEventListener('click',function(e){
        if(e.target !== dropDownBtn){
            dropDownBtn.classList.remove('.dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
        }
    });

    // Нажатие на Tab или Escape. Закрыть дропдаун
    document.addEventListener('keydown',function(e) {
        if(e.key === 'Tab' || e.key === 'Escape'){
            dropDownBtn.classList.remove('.dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
        }
    });
});

//________________Функция, отвечающая за выбор мастера_______________
var MasterInput = document.querySelector('.Master-input-hidden');
const MasterButton = document.querySelectorAll('.person');
console.log(MasterButton)
MasterButton.forEach(function (pers){
    pers.onclick = () => {
    pers.style.background = '#F0A24D';
    for (let i = 0; i <= MasterButton.length - 1; i++) {
        if (MasterButton[i] != pers){
            MasterButton[i].style.background = 'none';
        }
    }
    MasterInput.value = pers.value; // Передает код Мастера (напр. Master1)
    };
});


//________________Функции, отвечающие за календарь_______________
const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
};

const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
};

let calendar = document.querySelector('.calendar');
const month_names = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');
let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };

const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_month = document.querySelector('#month');
    let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    calendar_header_month.innerHTML = month_names[month];

    let first_day = new Date(year, month);
    first_day = first_day.getDay();

    console.log(month_names[month])
    console.log(first_day)
    if (first_day == 0){
        first_day = 7;
        console.log(first_day);
    }
    for (let i = 0; i <= days_of_month[month] + first_day - 2; i++) {

      let day = document.createElement('div');
      day.className = "day_day_current_month";
      let rec = document.createElement('div');
      rec.className = "day_current_month";
      let day_past = document.createElement('div');
      day_past.className = "day_day_past_month";
      let rec_past = document.createElement('div');
      rec_past.className = "day_past_month";

      if (i >= first_day - 1) {
        day.innerHTML = i - first_day + 2;

        if (i - first_day + 1 === currentDate.getDate() &&
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth()
        ) {
          day.classList.add('current-date');
        }
        if (day.innerHTML < 10){
            day.innerHTML = "0" + day.innerHTML;
        }
        calendar_days.appendChild(rec);
        rec.appendChild(day);
      }
      else {
        if(month == 0) {
            day_past.innerHTML = days_of_month[11] + (i - first_day + 2)
        }
        else {
            day_past.innerHTML = days_of_month[month-1] + (i - first_day + 2);
        }
        calendar_days.appendChild(rec_past);
        rec_past.appendChild(day_past);
      }
    }
};

generateCalendar(currentMonth.value, currentYear.value);

//________________Функция, отвечающая за выбор даты_______________
const DateInput = (MONTH,YEAR) => {
    if (MONTH < 10){
            MONTH = "0" + MONTH;
    }
    let CalendarInput = document.querySelector('.Calendar-input-hidden');
    let calendar_days = document.querySelectorAll('.day_day_current_month');
    calendar_days.forEach(function (day){
        day.onclick = () => {
        day.style.background = '#F0A24D';
        for (let i = 0; i <= calendar_days.length - 1; i++) {
            if (calendar_days[i] != day){
                calendar_days[i].style.background = 'none';
            }
            calendar_days[i].style.borderRadius = '15px';
        }
        DAY = day.innerHTML;
        CalendarInput.value = String(DAY) + '.' + String(MONTH) + '.' + String(YEAR) // Записывает дату
        console.log(CalendarInput.value)
        };
    });
}

DateInput(currentMonth.value, currentYear.value);

document.querySelector('#pre-month').onclick = () => {
    if (currentMonth.value == 0){
        currentMonth.value = 11;
        --currentYear.value;
    }
    else {
        --currentMonth.value;
    }
    generateCalendar(currentMonth.value, currentYear.value);
    DateInput(currentMonth.value, currentYear.value);
};

document.querySelector('#next-month').onclick = () => {
    if (currentMonth.value == 11){
        currentMonth.value = 0;
        ++currentYear.value;
    }
    else {
        ++currentMonth.value;
    }
    generateCalendar(currentMonth.value, currentYear.value);
    DateInput(currentMonth.value, currentYear.value);
};

//________________Функция, отвечающая за выбор времени_______________
var TimeInput = document.querySelector('.Time-input-hidden');
const TimeButton = document.querySelectorAll('.time-button');
TimeButton.forEach(function (timeb){
    timeb.onclick = () => {
    timeb.style.background = '#F0A24D';
    timeb.style.border = '1px solid #F0A24D';
    for (let i = 0; i <= TimeButton.length - 1; i++) {
        if (TimeButton[i] != timeb){
            TimeButton[i].style.background = 'none';
            TimeButton[i].style.border = '1px solid #fff';
        }
//        calendar_days[i].style.borderRadius = '15px';
    }
    TimeInput.value = timeb.value;
    };
});
