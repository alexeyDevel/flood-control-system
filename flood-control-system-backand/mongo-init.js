db = db.getSiblingDB('flood-control'); // Подключаемся к базе данных flood-control

db.createCollection('users'); // Создаем коллекцию 'users'
db.createCollection('tasks');
// const createUser = async (login, password) => {
//   try {
//     const response = await fetch('/users/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ login, password }),
//     });

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// Пример использования
// createUser('login', 'password');
