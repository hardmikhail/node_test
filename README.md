# Тестовое задание
#### Написать маршрут API на Node.js без фреймворков, при обращении на маршрут должен происходить запрос к сторонней API (https://jsonplaceholder.typicode.com/todos/1), полученный ответ записать в таблицу базы данных PostgreSQL
### Запуск проекта

Клонировать репозиторий и перейти в него:

```
git clone git@github.com:hardmikhail/node_test.git
```

```
cd node_test
```

Добавить `.env` файл с параметрами необходимыми для запуска:

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
DB_DIALECT=

POSTGRESDB_LOCAL_PORT=
POSTGRESDB_DOCKER_PORT=

NODE_LOCAL_PORT=
NODE_DOCKER_PORT=
```

Тестовые данные представлены в `.env.example`

После выполнить `docker compose up` для скачивания образов с профиля DockerHub и запуска контейнеров.
