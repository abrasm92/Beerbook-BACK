El proyecto en back conectara con la data base de Beerbook para que los usuarios
tengan acceso a los diversos endpoints.

Endpoints:

/user

POST /register "para registrar usuario"
POST /login "para comprovar credenciales del user y permitir login"

////////////////////////////////////////////////

/beer

GET / "para recoger una lista de todas las cervezas"
GET /:id "para recoger una sola cerveza en base a su id"
DELETE /:id "para eliminar una cerveza de la base de datos"
POST /create "para crear una nueva cerveza en la base de datos"
PUT /edit "para editar una cerveza ya existente"
GET /owner "para recoger todas las cervezas propias del usuario"
GET /name/:name "para cervezas recoger segun su nombre"
GET /brewery/:brewery "para cervezas recoger segun su fabricante"
GET /country/:country "para cervezas recoger segun su pais"
GET /gredees/:greedes "para cervezas recoger segun su graduacion"
GET /style/:style "para cervezas recoger segun su estilo"
GET /ibu/:ibu "para cervezas recoger segun su ibu"

////////////////////////////////////////////////

/auth

controlará que el usuario realmente tenga un hash para poder hacer cualquier tipo de modificación.

////////////////////////////////////////////////
