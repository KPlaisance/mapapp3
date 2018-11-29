# Project Overview - Neighborhood Map (React)

This game is the final project in the Udacity Front-End Nanodegree program.

I used multiple APIs to obtain the functionality spelled out in the project instructions. For example:

* Google Maps
* Foursquare
* Font Awesome
* google-maps-react

## Features
I chose a map of Houston, TX. It shows 5 taco restaurants around the area. These are marked by a red marker that is animated. The name and picture (when available from Foursquare) is provided in a popout menu. To obtain information on the restaurant, you can click on a marker, click on the name in the list on the left hand side or filter using the text filter box on the left hand side. By clicking on either the "x" in the popup, or by clicking another restaurant, it will close the box. 

I used a walkthrough by Ryan Waite and Udacity as reference with help figuring out how to setup the app. The links are in the Udacity walkthrough page: https://www.diigo.com/outliner/fkkuvb/Udacity-Neighborhood-Map-Project-(project-%237)?key=25wgqnwals

Tabbing functionality on the left hand list is enabled. Responsive design has been used to make the app accessable on all devices.

Service Worker (Cache) - The standard React Service Worker has been implemented, however it can only work properly in a production build and won't be able to be ran in testing. The "register()" function has been enabled in the index.js file.

# How to run the project

Clone this repo: https://github.com/KPlaisance/mapapp3
Enter into the root directory
Run 'npm install'
Run 'npm run start'
