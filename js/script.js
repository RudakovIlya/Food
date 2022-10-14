'use strict';

window.addEventListener('DOMContentLoaded', () => {

  // Tabs

  /* Подзадачи:

      1) Функция, которая будет скрывать табы.

      2) Функция, которая будет показывать нужный нам таб.

      3) Обработчик события на родителя табов.

  */

  const tabs = document.querySelectorAll('.tabheader__item');

  const tabsContent = document.querySelectorAll('.tabcontent');

  const tabsParent = document.querySelector('.tabheader__items');

  const hideTabContent = () => {

    tabsContent.forEach(tabContent => {

      tabContent.classList.add('hide')

      tabContent.classList.remove('show', 'fade')

    });

    tabs.forEach(tab => tab.classList.remove('tabheader__item_active'))

  };

  const showTabContent = (i = 0) => {

    tabsContent[i].classList.remove('hide')

    tabsContent[i].classList.add('show', 'fade')

    tabs[i].classList.add('tabheader__item_active');

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
