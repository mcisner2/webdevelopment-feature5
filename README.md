# ASL Awareness Project

Marcos Cisneros and Elijah Jones

## Description

The ASL Awareness Project is a React and Vite web application designed to promote awareness and education about American Sign Language (ASL). The application includes an ASL sign browser, an ASL history timeline, awareness resources, educational content, and Parse-backed data models.

ASL sign images are displayed as 28×28 grayscale images rendered dynamically on an HTML canvas. Sign data is loaded asynchronously from a Parse (Back4App) backend and presented through a searchable, sortable interface. For the purpose of feature 5, we have added authentication and protected routes, which are proved to be working through our home page and user creation, login, and log out process

# How to test 

With the npm run dev command, you can navigate our Feature 5 work and test authentication wiht our login / register component. This will redirect you to two buttons that allow you to either login or create an account. We tested that this connects to Elijah's Back4App and actually creates a user in the database. 

Once you create an account, you automatically log into your account. You get the user component available to you to see info about your user account and also are displayed with the options to either redirect to the home page or log out of your account. We test the authenitication process where a user should be able to see their user profile vs when they log out and they don't have access to it anymore. 




