# Frontend technical design

## Components and routes

### Home

path="/"

<!-- ! Think about how to implement find a class and gallery components inside app component as they should not render while navigating to other components -->

make find a class and gallery components inside home component

### Classes

path="/classes (show all classes)

<!-- ! how to to implement delete functionality in classes component, do I need classes/:id route for that -->

pass admin as prop from store(use reducer) to display delete button and new button. no need of classes/:id

### NewClass

path="classes/new" (create a new class)

### ClassInfo (sign up for the class)

path="classes/info"

### Galleries

path="/photos" (show all photos of gallery)

### Gallery

path="/photo/:id" (show one photo of gallery)

<!-- !need a delete button for photo -->

### NewGallery

path="/photos/new" (upload a new photo to the gallery)

### History

path="/history" (show history component)

### Newsletters

path="/newsletters" (show all newsletters)

<!-- !need a delete and download button for each button as well -->

<!-- ! how to to implement delete functionality in newsletters component, do I need newsletter/:id route for that -->

no need of newsletter/:id

### NewNewsletter

path="/newsletters/new" (upload a new newsletter)

### Minutes

path="/minutes" (show all minutes)

<!-- !need a delete and download button for each button as well -->

### NewMinute

path="/minutes/new" (upload a new minute)

### Members

path="/members" show all users (admin only)

<!-- !member's name is clickable. paid and role need dropdowns -->
<!-- !This will also be the show page for user -->
### EditMember 

path="/users/edit/:id"

<!-- !need a delete button as well -->

### Register

path="/users/register"

### Signin

path="users/login"
