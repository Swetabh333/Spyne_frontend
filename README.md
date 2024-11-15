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



The project exposes the following endponts :

### Ping Route

- **`/ping`**
  - **Method:** GET
  - **Description:** Checks whether the server is alive.

### Authentication Routes

- **`/auth/register`**

  - **Method:** POST
  - **Description:** Registers a new user (e.g., doctor, receptionist).

- **`/auth/login`**
  - **Method:** POST
  - **Description:** Logs in an existing user.

### Patient Routes

- **`/patient`**

  - **Method:** POST
  - **Description:** Creates a new patient record. Accessible only by receptionists.

- **`/patient/:id`**

  - **Method:** GET
  - **Description:** Retrieves the data of a specific patient by their ID. Accessible by both doctors and receptionists.

- **`/patients`**

  - **Method:** GET
  - **Description:** Fetches the data of all patients. Accessible by both doctors and receptionists.

- **`/patient/:id`**

  - **Method:** DELETE
  - **Description:** Deletes a specific patient by their ID. Accessible only by receptionists.

- **`/patient/:id`**
  - **Method:** PUT
  - **Description:** Updates the records of a specific patient by their ID. Accessible by both doctors and receptionists.

### Notes

- Patient Routes are only accessible via authenticated users.

## Setting up the project Locally

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


