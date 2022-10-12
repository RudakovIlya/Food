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

  tabsParent.addEventListener('click', e => {

    const target = e.target;

    if (target && target.closest('.tabheader__item')) {

      tabs.forEach((item, i) => {

        if (target == item) {

          hideTabContent()

          showTabContent(i)

        }

      })

    }

  })

})
