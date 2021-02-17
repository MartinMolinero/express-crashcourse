# express-crashcourse

## Install
Prerrequisites:
- node 14.x

1. clone the repo
2. create a .env file at the root folder with the following env variables:
- MONGO_USER
- MONGO_PASSWORD
- MONGO_DB
- MONGO_TEST_USER
- MONGO_TEST_PASSWORD
- MONGO_TEST_DB
- NODE_ENV
3. Run `npm install` and `npm start`

## Usage
*Important*: AWS ip is `http://54.234.248.18:3000/`
Feel free to change it to localhost:3000 depending on the env you're running the project

- Create new video
```
curl --location --request POST 'localhost:3000/videos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"un titulo",
    "description":"una descripcion",
    "image": "una imagen",
    "youtubeLink": "un link"
}'
```
- Update a video
```
curl --location --request PUT 'localhost:3000/videos/:id' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"un nuevo titulo",
    "description":"una nueva descripcion",
    "image": "una nueva imagen",
    "youtubeLink": "un nuevo link"
}'
```

- Get a video
```
curl --location --request GET 'localhost:3000/videos/:id' \
--header 'Content-Type: application/json'
```

- Get all videos
```
curl --location --request GET 'localhost:3000/videos' \
--header 'Content-Type: application/json'
```

- Create a user
```
curl --location --request POST 'localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"un nombre",
    "job":"un trabajo"
}'
```

- Create a favorite
```
curl --location --request POST 'localhost:3000/favorites' \
--header 'Content-Type: application/json' \
--data-raw '{
    "video":":video_id",
    "user":":user_id",
}'
```

- Get a favorite
```
curl --location --request GET 'localhost:3000/favorites/:favorite_id' \
--header 'Content-Type: application/json'
```

- Get all favorites
```
curl --location --request GET 'localhost:3000/favorites' \
--header 'Content-Type: application/json'
```

- Delete a favorite
```
curl --location --request DELETE 'localhost:3000/favorites/:favorite_id' \
--header 'Content-Type: application/json'
```