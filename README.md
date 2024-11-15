# Spyne Task

This project is created as a part of selection process for Spyne. It uses Supabase for image storage and retreival. It implements a car management system and helps perform the following tasks:

- User can login/signup
- Users can add a car with upto 10 images, title, description and tags
- Users can view a list of all their cars.
- Users can global search through all their cars ii.e the keyword searched will list all cars whose
title, description, tags match the keyword.
- Users can click on a car to view particular car’s detail
- Users can update a car’s title, description, tags, or image.
- Users can delete a car.

## Testing out the project

The project is deployed at [https://spyne-frontend-fawn.vercel.app/](https://spyne-frontend-fawn.vercel.app/) .

[Here](https://app.swaggerhub.com/apis-docs/SWETABHSHREYAM333/Makerble/1.0) is the api documentation.



The frontend has the follwing pages :

### Public Routes

- **`/`**
  - **Component:** Landing
  - **Description:** The main landing page accessible to all users.

### Authentication Routes

- **`/login`**

  - **Component:** Login
  - **Description:** Allows existing users to authenticate into the system.

- **`/register`**
  - **Component:** Register
  - **Description:** Enables new users to create an account.

### Protected Routes

- **`/cars`**

  - **Component:** Carlist
  - **Description:** Displays a list of all cars of the logged in user. Protected route requiring authentication.

- **`/cars/add`**

  - **Component:** AddCar
  - **Description:** Provides a form to add a new car to the system. Protected route requiring authentication.

- **`/cars/:id`**

  - **Component:** CarDetails
  - **Description:** Shows detailed information for a specific car by ID. Protected route requiring authentication.


### Notes

- Protected Routes are only accessible via authenticated users.

## Setting up the project Locally

Recommended to check out and setup the [backend](https://github.com/Swetabh333/Spyne_backend) first. 

To set up the project paste the follwing commands in your terminal:

```bash
git clone https://github.com/Swetabh333/Spyne_frontend.git
cd Spyne_frontend
npm install
```

This will install all the required dependencies for the project.

Next you have to set the environment for the project.

Create a .env file in the root directory

and paste this there

```bash
VITE_BACKEND_BASE_URL=<your_backend_url>
```


put this piece of code in the very beginninig of init function after error declaration in app/main/main.go


Do the above and then in your terminal run

```bash
npm run dev
```



**Your frontend is now running at port `5173`**.


