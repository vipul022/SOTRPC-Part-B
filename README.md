# T3A2-A - Full Stack App (Part A)

A Joint Venture by Jason Stacy and Vipul Seth for Coder Academy Melbourne.

### Description of your website

This is a Website for the South of the River Potters Club which is a pottery club in Alfred Cove, Western Australia.

##### Purpose

The South of the River Potters Club (SOTRPC) is undergoing some renovations to significantly improve and expand their premises in 2021. In line with this they plan on offering new classes for members and additional features such as kiln hiring. They currently have a [website](http://members.iinet.net.au/~atwelart/SORPC/index.html) but were looking to make it better with additional features. This website will meet that need.

##### Functionality / features

###### Must haves:

- Members - signup, login, logout, members authorization (Mongo DB).

- Admin access for some members - edit/remove members, add/edit/remove classes (Mongo DB).

- Class scheduling - Starting with a simple add/edit/remove event with information for prospective students. (Mongo DB).

- Club History - Information on the history of the club with photos if possible.

- Links to Facebook, Instagram

- Gallery of photos - displays art work from the club.

  ###### Nice to haves:

- Class Scheduling version v2 - members are able to 'signup' for a class.

- Class Scheduling version v3 - members are able to 'signup' for a class and receive email notification.

- Gallery of photos v2 - displays art work from the club. Admin able to add/edit/remove via AWS S3.

- Newsletter archive - Admin able to add/remove. Viewable by members.

- Newsletter archive v2 - Admin able to add/remove via AWS S3. Viewable by members.

- Meeting minutes archive - Admin able to add/remove. Viewable by members.

- Meeting minutes archive v2 - Admin able to add/remove via AWS S3. Viewable by members.

- Kiln bookings - Admin able to add/edit/remove kiln availability. Members are able to book kiln time.

- Event scheduling - Admin able to add/edit/remove events such as exhibitions (Mongo DB)

- Calendar of events - All upcoming events and classes displayed in a calendar type arrangement.

- Kiln bookings - Admin able to add/edit/remove kiln availability. Members are able to book kiln time. (Mongo DB)

- Event scheduling - Admin able to add/edit/remove events such as exhibitions (Mongo DB)

- Calendar of events - All upcoming events and classes displayed in a calendar type arrangement.

- Kiln bookings - Admin able to add/edit/remove kiln availability. Members are able to book kiln time. (Mongo DB)

##### Target audience

Primarily SOTRPC members and prospective members as well as anyone interested in Pottery.

##### Tech stack GENERAL

###### Backend:

- Mongo DB (Database with 5 collections)


- Mongodb Atlas (Online hosting site for the DB)
- Mongoose (Object Data Modeling library)
- AWS S3 (Buckets for persistent storage of photos and files)
- Axios (API connection for S3 Buckets)
- Express (Node JS Framework)
- Node JS  (Runtime environment)
- Dotenv (Storing environment variables)
- Passport (Authentication)
- Express-session (Cookie storage middleware)
- Nodemon (Development Server restarter)
- Heroku (Online host for back-end)



###### Frontend:

- React (Front end library)
- Cors (Allows cross origin whitelisting)
- Netlify (Online host for Front-end)



###### Testing:

- Jest (Back-end unit testing)
- React testing library (Front end unit testing)



###### Documentation and Planning:

- Trello (Project planning)
- Miro (Wireframe drawing application)
- Lucid Chart (Dataflow and Architecture diagrams)


###### Workflow

- Git (Version Control)
- GitHub (Version Control Hosting)



### Dataflow Diagram

![DataFlow Diagram](./docs/DFD.png)

###### 

### Application Architecture Diagram

![Application Architecture Diagram](./docs/AAD.png)

###### 

### User Stories

#### Mark (Admin)

Mark is a 60 year old man, who has been living in Alfred Cove, Western Australia with his wife for the last 30 years. He works part-time as a handyman. He has been an active member of South of the River Potters Club for 10 years. He has been recently elected as the president of the club. He is currently working on upgrading the club premises. He wants more people from the local community to join the club so that they can avail all the services offered by the club and this will also lead to empowering the club financially.

Mark's son gave him an idea of having a good website for the club which could be very beneficial for promoting the club to the next level. Mark gave the task of creating the website to Vipul and Jason who are the students at Coders Academy, Melbourne. Mark wants to have an admin functionality to the website so that he can perform certain tasks.

#### Mark's stories

###### He wants to:

- Have complete rights to edit and remove the members so that I can manage and test the database.
- Update members paid status when they make a payment to the bank account.
- Add, edit and remove the classes so that I can assist users to planing their schedule accordingly.
- Upload or delete minutes allowing members to download them.
- Upload and or delete new newsletters so members can download them.
- View the history of the club.
- View the photos in the gallery to see examples of other members work.
- Add/remove photos to the gallery to allow other users to view them.
- Make other members admins so they can also assist me with maintaining the website.

#### Julie (Member)

Julie is a retired lady who lives close to the South of the River Potters Club with her husband. She likes gardening and cooking. Her children come to visit her once a month. She has a lot of spare time nowadays but she does not have enough work to do. She is living a monotonous life.

One day her husband told her about the nearby pottery club and she got very excited after seeing their website. She immediately decided to join the club as she really liked the ideas of the club and it will also give her the opportunity to socialise with other people.

#### Julie's stories

###### She wants:

- A good user interface, so that I can navigate to different parts of the website easily
- Credentials to be persistent in the database so that I can log in and logout of my account securely.
- A profile, so that I can edit my personal details.
- To view the history of the club.
- To view the photos in the gallery to see examples of other members work.
- I want the ability to download minutes of the club meetings to see what was discussed.
- I want the ability to download past newsletters in case I miss anything.

###### She should not:

- Be able to add or remove photos to the gallery.

- Be able to view members details.

  

#### Sandra (Potential Member)

Sandra is a nurse that is looking to start a new hobby. She has a cat called Mittens who she loves dearly and would like to immortalise in clay. She has a friend in the club who has recommended that she take a look at the South of the River Potters Club website and perhaps take some classes. She's not very tech savvy but has been given a tablet for her birthday which she is enjoying. Sandra is keen to become a member and become more involved with the club if she enjoys the classes and other members. She's keen to discover more information about the club and what membership offers.

#### Sandra's stories

###### She wants to:

- A good user interface, so that I can navigate to different parts of the website easily on my tablet.
- View the history of the club so I can get an idea how long it has been going and how likely it will continue if I were to become a member.
- See what classes are available if I did become a member.
- View the photos in the gallery to see examples of what  members create.
- Sign up to become a member if I should choose to do so.

###### She should not:

- Be able to add or remove photos to the gallery.
- View members details.
- View any minutes from club meetings until a member.
- View any past newsletters until a member.

###### 

### Wireframes for multiple standard screen sizes, created using industry standard software



Access Miro board here: https://miro.com/app/board/o9J_lec-hEk=/



![](docs/wireframes/1.png)

![](docs/wireframes/2.png)

![](docs/wireframes/3.png)

![](docs/wireframes/4.png)

![](docs/wireframes/5.png)

![](docs/wireframes/6.png)

![](docs/wireframes/7.png)

![](docs/wireframes/8.png)

![](docs/wireframes/9.png)

![](docs/wireframes/10.png)

![](docs/wireframes/11.png)

![](docs/wireframes/12.png)

![](docs/wireframes/13.png)

![](docs/wireframes/14.png)

![](docs/wireframes/15.png)

![](docs/wireframes/16.png)

![](docs/wireframes/17.png)

![](docs/wireframes/18.png)

![](docs/wireframes/19.png)

![](docs/wireframes/20.png)

![](docs/wireframes/21.png)

![](docs/wireframes/22.png)

![](docs/wireframes/23.png)

![](docs/wireframes/24.png)

![](docs/wireframes/25.png)

![](docs/wireframes/26.png)

![](docs/wireframes/27.png)

![](docs/wireframes/28.png)

![](docs/wireframes/29.png)

![](docs/wireframes/30.png)

![](docs/wireframes/31.png)





###### 

### Screenshots of your Trello board throughout the duration of the project

- Trello board Day-1.1

![Trello board Day-1](./docs/Trello-Day1.1.png)

- Trello board Day-1.2

![Trello board Day-1](./docs/Trello-Day1.2.png)

- Trello board Day-2.1

![Trello board Day-1](./docs/Trello-Day2.1.png)

- Trello board Day-2.2

![Trello board Day-1](./docs/Trello-Day2.2.png)

- Trello board Day-3.1
  ![Trello board Day-3](./docs/Trello-Day3.1.png)

- Trello board Day-3.2
  ![Trello board Day-3](./docs/Trello-Day3.2.png)

- Trello board Day-4.1
  ![Trello board Day-4](./docs/Trello-Day4.1.png)

- Trello board Day-4.2
  ![Trello board Day-4](./docs/Trello-Day4.2.png)

```
The End  🌱
```