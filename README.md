![capture1](https://user-images.githubusercontent.com/22011201/41207509-076fe1f0-6cdd-11e8-88d6-9fe303a3a10d.PNG)
![capture](https://user-images.githubusercontent.com/22011201/41207489-af4e8ab2-6cdc-11e8-9d42-02505b4a0240.PNG)

### Installing

Clone the repository

```
git clone https://github.com/codeforkansascity/tow-lots.git
cd tow-lots
```
After cloning the repository run npm install in the root directory and run npm install in the react-ui folder

```
npm install
cd react-ui
npm install
```
Set the your local MySQL database by configuring src/server/index.js to the following:

```
let host = process.env.production_host || "localhost"
let user = process.env.production_user || "root" // replace with your MySQL username
let password = process.env.production_password || "root" // replace with your MySQL password
let database = process.env.production_db || "mydb" // replace with your MySQL database
```

In the root directory, run node server/update_db.js to populate your MySQL database with current month's vehicle listing https://data.kcmo.org/resource/xpwx-fzzw.json

```
node server/update_db.js
```

## Local Development

1. Node server in the root directory
2. React UI in react-ui folder

Run the server in terminal
```
node server/index.js
```

And in a separate terminal run the React app
```
cd react-ui
npm start
```

## Heroku App
http://kansascitytowlots.herokuapp.com/

## Auction site where pictures are stored
http://oaiauctions.hibid.com/

## Problem Statement

KCMO runs monthly auctions of cars and other items (boats,
scooters, etc) that are unclaimed from city tow lots, but
information about the items up for auction isn’t easily accessible
by salvage dealers. A list of the vehicles up for auction is available online that includes limited information about the condition of the vehicles. The minimal user interface fosters a limited market of buyers, reducing revenue and resulting in fewer vehicles being sold.

There is an opportunity to increase revenue, increase sales, reduce waste (into the
landfill), or even connect more people to low cost vehicles with
better access to more, relevant data.

## What we need

Is a person or team to take ownership of this project and create a KC Auto Auction site with timely, searchable info about items
available at auction.

A MVP might allow the buyer is able to see all items, narrow items by search & filter, and see the time and date of the upcoming auction.


### Avaliable Data

The list of auction items is online at  [https://data.kcmo.org/Traffic/Kansas-City-Monthly-Car-Auction/2uje-k9n5](https://data.kcmo.org/Traffic/Kansas-City-Monthly-Car-Auction/2uje-k9n5).  This page will show you the existing data
and how to download it or ascdess it using a RESTful API (JSON).  It also contains documentation about the data.

* Lot#
* Make
* Model
* Year
* VIN
* Keys (if the vehicle comes with keys)
* Reason vehicle is for sale
* Vehicle number (to identify during auction)

## Future Opportunities

* Addition of photos to vehicle listings (may be available in second version, will not be included in first)
* Wishlist - ability to select desired items from a "frequently sold" list, where the site will send the buyer a notification when one of these items is listed for sale (via email or tweet?)

## Possible steps:

* Review the existing data source
* Design a system
* Wireframe a user interface
* Create a road map and issues that can be followed to implement
* Implement


* See [Issues](https://github.com/codeforkansascity/tow-lots/issues)

## How to help

* Come to [Code for KC HackNights](http://www.meetup.com/KCBrigade/)
