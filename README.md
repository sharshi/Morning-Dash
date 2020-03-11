# Morning Dash
Morning Dash is your day at a glance. See local weather, your commute, and calendar events all in one place.

Every morning many of us check the same things: the weather, the commute to work, and important calendar events. Why go to 3 places instead of 1.

Morning Dash is an app that lets you quickly glance at these things to get an overview of your day.

Live: [themorningdash.herokuapp.com](https://themorningdash.herokuapp.com/)

### User Authentication:
 - User can sign up, sign in, and sign out
 - User can save personal settings for each other MVP.

### User onboarding (first login) settings (from home screen)
 - user logs in with google + link their google calendar
 - onboarding allows them to set up their home and work location
 - set up their daily commute (home, work, work-arrival, work-leave)

### Transit:
 - Use Google Directions API to set routes for commutes
 - Bonus: Set preferred routes/method of travel for every commute
 - Indicate if will rain during commute

### Weather:
 - Use DarkSky API to obtain weather
 - Display local weather in 3 hour increments

### Calendar:
 - Use Google Calendar API to obtain user appointments
 - Display the next few hours of appointments listed in Google Calendar

### Responsive mobile-friendly design


### Front end: React / Redux

### Backend: MongoDB / Express / Node

## Technologies and Technical Challenges


### APIs

#### Google Transit API
 - The Google Directions API we have a global limit of unlimited and a limit per minute of 5000

#### Weather
 - The DarkSkyAPI has 1000 calls per day for free.

#### Google Calendar
 - The Google Calendar API is similar to the Directions API.

