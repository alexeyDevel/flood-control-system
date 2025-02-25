import { TPage } from "./HeaderNav.type";

export const PAGES: TPage[] = [
  {
    name: "Главная",
    path: "/",
  },
  {
    name: "О нас",
    path: "/about",
    subpages: [
      {
        name: "Миссия и цели",
        // path: "/about/mission",
      },
      {
        name: "История и развитие",
        // path: "/about/history",
      },
      {
        name: "Команда",
        // path: "/about/team",
      },
    ],
  },
  {
    name: "Услуги",
    path: "/services",
    subpages: [
      {
        name: "Оптимизация системы заводнения",
        path: "/services/optimization",
      },
      {
        name: "Автоматизация процессов РНМ",
        // path: "/services/automation-rnm",
      },
      {
        name: "Автоматизация процессов ГИС",
        // path: "/services/automation-gis",
      },
    ],
  },
  {
    name: "Технологии",
    path: "/technologies",
    subpages: [
      {
        name: "Искусственный интеллект и машинное обучение",
        // path: "/technologies/ai",
      },
      {
        name: "Биг Дата и аналитика",
        // path: "/technologies/big-data",
      },
      {
        name: "Автоматизированные системы управления",
        // path: "/technologies/automation",
      },
    ],
  },
  {
    name: "Кейсы и проекты",
    path: "/cases",
    subpages: [
      {
        name: "Успешные проекты",
        // path: "/cases/successful",
      },
      {
        name: "Технологические решения",
        // path: "/cases/technological",
      },
      {
        name: "Клиенты и отзывы",
        // path: "/cases/clients",
      },
    ],
  },
  {
    name: "Карьера",
    path: "/career",
    subpages: [
      {
        name: "Вакансии",
        // path: "/career/vacancies",
      },
      {
        name: "Преимущества работы в AI Lab",
        // path: "/career/benefits",
      },
      {
        name: "Отправить резюме",
        // path: "/career/send-resume",
      },
    ],
  },
  {
    name: "Контакты",
    path: "/contacts",
    subpages: [
      {
        name: "Контактная информация",
        // path: "/contacts/info",
      },
      {
        name: "Форма обратной связи",
        // path: "/contacts/feedback",
      },
      {
        name: "Карта расположения",
        // path: "/contacts/map",
      },
    ],
  },
];
