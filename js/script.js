"use strict";

window.addEventListener("DOMContentLoaded", () => {
  // Tabs

  /* Подзадачи:

    1) Функция, которая будет скрывать табы.

    2) Функция, которая будет показывать нужный нам таб.

    3) Обработчик события на родителя табов. (Используем делегирование)

*/

  const tabs = document.querySelectorAll(".tabheader__item");

  const tabsContent = document.querySelectorAll(".tabcontent");

  const tabsParent = document.querySelector(".tabheader__items");

  const hideTabContent = () => {
    tabsContent.forEach(tabContent => {
      tabContent.classList.add("hide"); // Перебираем контент табов и вешаем им класс для скрытия всех элементов.

      tabContent.classList.remove("show", "fade"); // Удаляем классы, которые показываю контет, а так же добавляют анимацию.
    });

    tabs.forEach(tab => tab.classList.remove("tabheader__item_active")); // Перебираем наши табы и удаляем класс активности, который выделяет текущий таб
  };

  const showTabContent = (i = 0) => {
    // Устанавливаем значение по умолчанию, для того, что при перезагрузке страницы активным был всегда первый таб и его контент

    tabsContent[i].classList.remove("hide"); // Удаляем класс скрывающий контент конкретно у этого таба.

    tabsContent[i].classList.add("show", "fade"); // Добавляем классы. которые показывают текущий слайд, а так же добавляют анимацию появления

    tabs[i].classList.add("tabheader__item_active"); // Добавляем на текущий таб класс активности
  };

  hideTabContent();

  showTabContent();

  tabsParent.addEventListener("click", e => {
    // Используем делегирование событий и навешиваем прослушку на родителя наших табов.

    const target = e.target; // e - это событие которое произошло на элементе,в данном случае это клик.

    if (target && target.closest(".tabheader__item")) {
      // Проверяем на то, если наш нажатый элемент имеет в себе класс tabheader__item

      tabs.forEach((item, i) => {
        // Перебираем наши табы.

        if (target == item) {
          // Проверяем, если нажатый текущий элемент == текущиму элементу таба, выполням функцию hideTabContent, затем вызываем функцию showTabContetn, котороая выполняет для текущего элемента.

          hideTabContent();

          showTabContent(i);
        }
      });
    }
  });

  // Timer

  const deadline = document.querySelector(".deadline").getAttribute("data-deadline"); // Deadline, та дата, когда таймер остановится;

  const getTimeRemaining = endtime => {
    const totalTimeRemainig = Date.parse(endtime) - Date.parse(new Date()); // Вычисляем разницу в миллисекундах, т.е. сколько миллисекунд осталось до deadline.

    let totalDays = Math.floor(totalTimeRemainig / (1000 * 60 * 60 * 24)); // Получаем дни, где 1000 - это миллисекунды, 60 - секунды, 60 - минуты, 24 - часы. Выходит подобная формула ~ (3239971000 / (1000 * 60 * 60 * 24)) ~~ 18 дней.

    let totalHours = Math.floor((totalTimeRemainig / (1000 * 60 * 60)) % 24); // Получаем часы, где 1000 - это миллисекунды, 60 - секунды, 60 минуты,  % 24 - это мы получаем, остаток от суток в часах. Выходит подобная формула ~ (3239971000 / (1000 * 60 * 60 ) % 24), в скобках 3 млн 600 тысяч миллисекуд, затем мы делим 3239971000 / 3600000 ~= 899.9919444444445 % 24 = 11.99194444444447

    let totalMinutes = Math.floor((totalTimeRemainig / (1000 * 60)) % 60);

    let totalSeconds = Math.floor((totalTimeRemainig / 1000) % 60);

    if (totalTimeRemainig <= 0) {
      totalDays = 0;

      totalHours = 0;

      totalMinutes = 0;

      totalSeconds = 0;
    }

    return {
      totalTimeRemainig,

      totalDays,

      totalHours,

      totalMinutes,

      totalSeconds,
    };
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector);

    const days = timer.querySelector("#days");

    const hours = timer.querySelector("#hours");

    const minutes = timer.querySelector("#minutes");

    const seconds = timer.querySelector("#seconds");

    const timerId = setInterval(updateClock, 1000);

    function updateClock() {
      const total = getTimeRemaining(endtime);

      days.innerHTML = total.totalDays.toString().padStart(2, "0");

      hours.innerHTML = total.totalHours.toString().padStart(2, "0");

      minutes.innerHTML = total.totalMinutes.toString().padStart(2, "0");

      seconds.innerHTML = total.totalSeconds.toString().padStart(2, "0");

      if (total <= 0) {
        clearInterval(timerId);
      }
    }

    updateClock();
  };

  setClock(".timer", deadline);

  // Modal

  const modalTrigger = document.querySelectorAll("[data-modal]");

  const modal = document.querySelector(".modal");

  const body = document.body;

  const showModal = () => {
    modal.classList.add("show", "fade");

    body.style.overflow = "hidden";

    clearInterval(timerModal);
  };

  const closeModal = () => {
    modal.classList.remove("show", "fade");

    body.style.overflow = "";
  };

  modalTrigger.forEach(trigger => {
    trigger.addEventListener("click", showModal);
  });

  modal.addEventListener("click", e => {
    const target = e.target;
    if (target == modal || target.getAttribute("data-close") === "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.code == "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const timerModal = setTimeout(showModal, 500000);

  const showModalByScroll = () => {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal();

      window.removeEventListener("scroll", showModalByScroll);
    }
  };
  window.addEventListener("scroll", showModalByScroll);

  // Используем классы для карточек.

  class Menu {
    constructor(
      src /*src img*/,
      alt /*alt img*/,
      title /*title card*/,
      descr /*descr card*/,
      price,
      parentSelector /*parent card*/,
      ...classes /*default class*/
    ) {
      this.src = src;

      this.alt = alt;

      this.title = title;

      this.price = price;

      this.descr = descr;

      this.parentSelector = document.querySelector(parentSelector);

      this.classes = classes;

      this.transfer = 60;

      this.changeToRU();
    }

    changeToRU() {
      this.price = this.price * this.transfer; // Метод конвертации доллара в рубли
    }

    render() {
      const element = document.createElement("div");

      if (!this.classes.length) {
        this.classes = "menu__item";

        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
      `;

      this.parentSelector.append(element);
    }
  }

  new Menu(
    "img/tabs/vegy.webp",

    "vegy",

    'Меню "Фитнес"',

    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',

    9,

    ".menu .container"
  ).render();

  new Menu(
    "img/tabs/elite.webp",

    "elite",

    "Меню “Премиум”",

    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",

    15,

    ".menu .container"
  ).render();

  new Menu(
    "img/tabs/post.webp",

    "post",

    'Меню "Постное"',

    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",

    6,

    ".menu .container"
  ).render();

  // Forms

  const forms = document.querySelectorAll("form");

  const status = {
    loading: "icons/spinner.svg",
    success: "Спасибо! Мы скоро с Вами свяжемся!",
    failure: "Упс...Что-то пошло не так...",
  };

  forms.forEach(form => postForm(form));

  function postForm(form) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = status.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const request = new XMLHttpRequest();

      request.open("POST", "server.php");

      request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

      const formData = new FormData(form);

      const object = {};

      formData.forEach((value, key) => {
        object[key] = value;
      });

      request.send(JSON.stringify(object));

      request.addEventListener("load", () => {
        if (request.status === 200) {
          showThanksModal(status.success);
          form.reset();
          setTimeout(() => statusMessage.remove(), 2000);
        } else {
          showThanksModal(status.failure);
        }
      });
    });
  }

  const showThanksModal = message => {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");

    showModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add(".modal__dialog", "show");

    thanksModal.innerHTML = `
    <div class="modal__content">
        <form action="#">
          <div data-close class="modal__close">&times;</div>
          <div class="modal__title">${message}</div>
        </form>
      </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  };
});
