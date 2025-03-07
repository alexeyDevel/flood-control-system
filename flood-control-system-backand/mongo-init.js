db = db.getSiblingDB('flood-control'); // Подключаемся к базе данных flood-control
// db.createUser(
//     {
//         user: "myUser",   // Замените на желаемое имя пользователя
//         pwd: "myPassword", // Замените на надежный пароль
//         roles: [ { role: "readWrite", db: "flood-control" } ]
//     }
// );

db.createCollection('users'); // Создаем коллекцию 'users'