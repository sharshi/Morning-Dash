# Morning Dash

![logo](/frontend/public/sun.png)

Morning Dash is your day at a glance. See local weather, your commute, and calendar events all in one place.

Every morning many of us check the same things: the weather, the commute to work, and important calendar events. Why go to 3 places instead of 1.

Morning Dash is an app that lets you quickly glance at these things to get an overview of your day.

Live: [themorningdash.herokuapp.com](https://themorningdash.herokuapp.com/)

### User Authentication:
 - User can sign up, sign in, and sign out
 - User can save personal settings for each other MVP.

### User Signup (first login) settings (from home screen)
 - user signs up then can link their google calendar
 - Sign up form allows them to set up their home and work location
 - set up their daily commute (home, work, work-arrival, work-leave)

### Transit:
 - Use Google Directions API to set routes for commutes
 - Bonus: Set preferred routes/method of travel for every commute
 - Indicate if will rain during commute

![Transit](/frontend/public/commute_screen_shot.png)

### Weather:
 - Use DarkSky API to obtain weather
 - Display local weather in 2 hour increments

![Weather](/frontend/public/weather_screen_shot.png)

### Calendar:
 - Use Google Calendar API to obtain user appointments
 - Display the next few hours of appointments listed in Google Calendar

### Responsive mobile-friendly design
 - Utilizes 1000px width as a breakpoint to dynamically change from mobile to desktop view and vice versa.
 - Designed for mobile first and then scaled up to desktop to ensure good mobile experience.


### Front end: React/Redux
 - Designed to be a single page app to show users information as quickly as possible.
 - React Portal/Context APIs used to create compound modal for reusability

## Technologies 

 - Backend: MongoDB / Express /Node
 - Google Transit API
     - The Google Directions API we have a global limit of unlimited and a limit per minute of 5000
 - Weather
     - The DarkSkyAPI has 1000 calls per day for free.
 - Google Calendar
    - The Google Calendar API is similar to the Directions API.

