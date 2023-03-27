# Mega-Lorem-Ipsum
Setup guide.
Prerequisites: VS Code and Node JS(v19.7.0 was used for development) installed and master branch pulled to a local directory

1. Open folder in vs code
2. Download & install mongodb community server -> complete -> install as a service -> run service as a network service user. (MongoDb must be 
   running as a service at the end of this step)

3. Run 'npm start' in working directory (This will create the schema and db model)
4. In MongoDB Compass: Databases -> dogs_api -> dogs -> ADD DATA -> Import JSON file in folder called 'DB'.

The steps documented above allowed successful migration of the solution such that all functionalities worked on a new pc when tested on chrome as 
a browser although results should be the same for any other browser.

The steps above assume that the default db connection string is used along with port 4567, should these need to be configured they can be changegd in the .env file.
