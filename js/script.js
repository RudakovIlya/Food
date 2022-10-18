'use strict';

window.addEventListener('DOMContentLoaded', () => {

  // Tabs

  /* Подзадачи:

      1) Функция, которая будет скрывать табы.

      2) Функция, которая будет показывать нужный нам таб.

      3) Обработчик события на родителя табов. (Используем делегирование)

  */

  const tabs = document.querySelectorAll('.tabheader__item');

  const tabsContent = document.querySelectorAll('.tabcontent');

  const tabsParent = document.querySelector('.tabheader__items');

  const hideTabContent = () => {

    tabsContent.forEach(tabContent => {

      tabContent.classList.add('hide')        // Перебираем контент табов и вешаем им класс для скрытия всех элементов.

      tabContent.classList.remove('show', 'fade') // Удаляем классы, которые показываю контет, а так же добавляют анимацию.

    });

    tabs.forEach(tab => tab.classList.remove('tabheader__item_active')); // Перебираем наши табы и удаляем класс активности, который выделяет текущий таб

  };

  const showTabContent = (i = 0) => { // Устанавливаем значение по умолчанию, для того, что при перезагрузке страницы активным был всегда первый таб и его контент

    tabsContent[i].classList.remove('hide') // Удаляем класс скрывающий контент конкретно у этого таба.

    tabsContent[i].classList.add('show', 'fade') // Добавляем классы. которые показывают текущий слайд, а так же добавляют анимацию появления

    tabs[i].classList.add('tabheader__item_active'); // Добавляем на текущий таб класс активности

  };

  hideTabContent();

  showTabContent();

  tabsParent.addEventListener('click', e => { // Используем делегирование событий и навешиваем прослушку на родителя наших табов.

    const target = e.target; // e - это событие которое произошло на элементе,в данном случае это клик.

    if (target && target.closest('.tabheader__item')) { // Проверяем на то, если наш нажатый элемент имеет в себе класс tabheader__item

      tabs.forEach((item, i) => { // Перебираем наши табы.

        if (target == item) { // Проверяем, если нажатый текущий элемент == текущиму элементу таба, выполням функцию hideTabContent, затем вызываем функцию showTabContetn, котороая выполняет для текущего элемента.

          hideTabContent()

          showTabContent(i)

        }

      })

    }

  })

  // Timer

  const deadline = document.querySelector('.deadline').getAttribute('data-deadline'); // Deadline, та дата, когда таймер остановится;

  const getTimeRemaining = (endtime) => {

    const total = Date.parse(endtime) - Date.parse(new Date()); // Вычисляем разницу в миллисекундах, т.е. сколько миллисекунд осталось до deadline.

    let days = Math.floor(total / (1000 * 60 * 60 * 24)); // Получаем дни, где 1000 - это миллисекунды, 60 - секунды, 60 - минуты, 24 - часы. Выходит подобная формула ~ (3239971000 / (1000 * 60 * 60 * 24)) ~~ 37 дней.

    let hours = Math.floor(total / (1000 * 60 * 60) % 24); // Получаем часы, где 1000 - это миллисекунды, 60 - секунды, 60 минуты,  % 24 - это мы получаем, остаток от суток в часах. Выходит подобная формула ~ (3239971000 / (1000 * 60 * 60 ) % 24), в скобках 3 млн 600 тысяч миллисекуд, затем мы делим 3239971000 / 3600000 ~= 899.9919444444445 % 24 = 11.99194444444447

    let minutes = Math.floor((total / 1000 / 60) % 60);

    let seconds = Math.floor((total / 1000) % 60);

    if (total <= 0) {

      days = 0;

      hours = 0;

      minutes = 0;

      seconds = 0;


    }

    return {

      total,

      days,

      hours,

      minutes,

      seconds,

    }

  }

  const setClock = (selector, endtime) => {

    const timer = document.querySelector(selector);

    const days = timer.querySelector('#days');

    const hours = timer.querySelector('#hours');

    const minutes = timer.querySelector('#minutes');

    const seconds = timer.querySelector('#seconds');

    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {

      const total = getTimeRemaining(endtime);

      days.innerHTML = total.days.toString().padStart(2, "0");

      hours.innerHTML = total.hours.toString().padStart(2, "0");

      minutes.innerHTML = total.minutes.toString().padStart(2, "0");

      seconds.innerHTML = total.seconds.toString().padStart(2, "0");

      if (total.total <= 0) {

        clearInterval(timeInterval);

      }

    }

  }

  setClock('.timer', deadline)

  // Modal

  const modalTrigger = document.querySelectorAll('[data-modal]');

  const modal = document.querySelector('.modal');

  const closeTrigger = document.querySelector('[data-close]');

  const body = document.body;

  const showModal = () => {

    modal.classList.add('show', 'fade')

    body.style.overflow = 'hidden';

  }

  const closeModal = () => {

    modal.classList.remove('show', 'fade')

    body.style.overflow = '';

  }

  modalTrigger.forEach(item => {

    item.addEventListener('click', showModal)

  })

  modal.addEventListener('click', (e) => {

    const target = e.target;

    if (target && target == closeTrigger && modal.classList.contains('show') || target == modal) {

      closeModal();

    }

  });

  document.addEventListener('keydown', (e) => {

    if (e.code == "Escape" && modal.classList.contains('show')) {

      closeModal();

    }

  })

})
