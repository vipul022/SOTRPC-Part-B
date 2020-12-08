# Backend functionality and technical details



## Users

### Routes:

get /users - show all users (admin only) 

post /users - add a new user

delete /users/id - delete a user

get /users/id - show one user

put /users/id - edit a user

post /users/login - user logs in

get /users/logout - user logs out

### DB:

name: string

address: string

phone: string

email: string

password: string (bcrypt)

paid: string

role: string




## Gallery

### Routes:

get /photos - show all photos

get /photos/id - show one photo

delete /photos/id - delete one photo

post /photos - add new photo

### DB:

title:

date:



## Minutes

### Routes:

get /minutes - list all minutes files

get /minutes/id - download one minute file

delete /minutes/id - delete one minute file

post /minutes - upload new minute file



### DB:

title:

date:



## Newsletter

### Routes:

get /newsletter - list all newsletter files

get /newsletter/id - download one newsletter file

delete /newsletter/id - delete one newsletter file

post /newsletter - upload new newsletter file

### DB:

title:

date:



## Classes

get /classes - list all classes

delete /classes/id - delete one class

post /classes - add one class

put /classes/id - edit one class

get /classes/id - get one class


### DB:

title:

description:

time:

maxNumber:


