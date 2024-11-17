const races = [
    { id: 1, name: "TCS New York City Marathon + Dash to the Finish Line 5K", location: "New York City, NY" },
    { id: 2, name: "Bank of America Chicago Marathon + 5K", location: "Chicago, IL" },
    { id: 3, name: "Walt Disney World Marathon Weekend", location: "Lake Buena Vista, FL" },
    { id: 4, name: "AJC Peachtree Road Race", location: "Atlanta, GA" },
    { id: 5, name: "Boston Marathon + BAA 5K", location: "Boston, MA" },
    { id: 6, name: "Bolder Boulder", location: "Boulder, CO" },
    { id: 7, name: "Flying Pig Marathon Weekend", location: "Cincinnati, OH" },
    { id: 8, name: "Philadelphia Marathon, Half Marathon, and Rothman Institute 8K", location: "Philadelphia, PA" },
    { id: 9, name: "Blue Cross Broad Street Run", location: "Philadelphia, PA" },
    { id: 10, name: "Disney Princess Half Marathon", location: "Orlando, FL" },
    { id: 11, name: "Hot Chocolate Run – Chicago", location: "Chicago, IL" },
    { id: 12, name: "Lilac Bloomsday Run", location: "Spokane, WA" },
    { id: 13, name: "Wine & Dine Half Marathon Weekend", location: "Orlando, FL" },
    { id: 14, name: "RBC Brooklyn Half Marathon", location: "Brooklyn, NY" },
    { id: 15, name: "United Airlines NYC Half", location: "New York, NY" },
    { id: 16, name: "Honolulu Marathon", location: "Honolulu, HI" },
    { id: 17, name: "Pittsburgh Marathon", location: "Pittsburgh, PA" },
    { id: 18, name: "Chevron Houston Marathon / Aramco Half Marathon / ABB 5K", location: "Houston, TX" },
    { id: 19, name: "Credit Union Cherry Blossom Ten Mile", location: "Washington, DC" },
    { id: 20, name: "Cooper River Bridge Run", location: "Charleston, SC" },
    { id: 21, name: "Rock ‘n’ Roll San Diego", location: "San Diego, CA" },
    { id: 22, name: "runDisney Springtime Surprise Weekend", location: "Orlando, FL" },
    { id: 23, name: "San Francisco Marathon", location: "San Francisco, CA" },
    { id: 24, name: "Rock ‘n’ Roll Las Vegas", location: "Las Vegas, NV" },
    { id: 25, name: "Marine Corps Marathon", location: "Washington, DC" },
    { id: 26, name: "St. Jude Memphis Marathon Weekend", location: "Memphis, TN" },
    { id: 27, name: "Bank of America Shamrock Shuffle", location: "Chicago, IL" },
    { id: 28, name: "Pat’s Run", location: "Tempe, AZ" },
    { id: 29, name: "St. Jude Rock ‘n’ Roll Nashville", location: "Nashville, TN" },
    { id: 30, name: "Lifetime Miami Marathon, Half Marathon & Tropical 5K", location: "Miami, FL" },
    { id: 31, name: "Army Ten Miler", location: "Washington, DC" },
    { id: 32, name: "Oneamerica 500 Festival Mini-Marathon", location: "Indianapolis, IN" },
    { id: 33, name: "Los Angeles Marathon", location: "Los Angeles, CA" },
    { id: 34, name: "BMW Dallas Marathon", location: "Dallas, TX" },
    { id: 35, name: "The Cowtown Marathon", location: "Fort Worth, TX" },
    { id: 36, name: "Detroit Free Press Marathon", location: "Detroit, MI" },
    { id: 37, name: "OC Marathon, Half Marathon, and 5K", location: "Newport Beach, CA" },
    { id: 38, name: "Grandma’s Marathon – Garry Bjorklund Half Marathon", location: "Duluth, MN" },
    { id: 39, name: "Yuengling Shamrock Marathon, Half Marathon, and 8K", location: "Virginia Beach, VA" },
    { id: 40, name: "Gasparilla Distance Classic Race Weekend", location: "Tampa, FL" },
    { id: 41, name: "Applied Materials Silicon Valley Turkey Trot", location: "San Jose, CA" },
    { id: 42, name: "Bay Bridge Run", location: "Annapolis, MD" },
    { id: 43, name: "Ukrop’s Monument Avenue 10K", location: "Richmond, VA" },
    { id: 44, name: "JP Morgan Corporate Challenge- NY", location: "New York, NY" },
    { id: 45, name: "Richmond Marathon, Half Marathon, and 8K", location: "Richmond, VA" },
    { id: 46, name: "Hood To Coast", location: "Seaside Beach, Oregon" },
    { id: 47, name: "Rock ‘n’ Roll San Antonio", location: "San Antonio, TX" },
    { id: 48, name: "Ascension Seton Austin Marathon, Half Marathon & 5K", location: "Austin, TX" },
    { id: 49, name: "Statesman Capitol 10K", location: "Austin, TX" },
    { id: 50, name: "Gate River Run", location: "Jacksonville, FL" },
    { id: 51, name: "Rock ‘n’ Roll DC", location: "Washington, DC" },
    { id: 52, name: "Rocky Run", location: "Philadelphia, PA" },
    { id: 53, name: "Oklahoma City Memorial Marathon", location: "Oklahoma City, OK" },
    { id: 54, name: "Santa Cruz to Capitola Wharf to Wharf Race", location: "Santa Cruz, CA" },
    { id: 55, name: "Detroit Thanksgiving Parade Turkey Trot", location: "Detroit, MI" },
    { id: 56, name: "New Balance Bronx 10 Miler", location: "New York, NY" },
    { id: 57, name: "Bay to Breakers", location: "San Francisco, CA" },
    { id: 58, name: "NYCRUNS Brooklyn Marathon & Half", location: "New York, NY" },
    { id: 59, name: "Long Beach Marathon and Half Marathon", location: "Long Beach, CA" },
    { id: 60, name: "Surf City USA Marathon and Half Marathon", location: "Huntington Beach, CA" },
    { id: 61, name: "Wheeler Mission Drumstick Dash", location: "Indianapolis, IN" },
    { id: 62, name: "Denver Colfax Marathon", location: "Denver, CO" },
    { id: 63, name: "NYRR Queens 10K", location: "Queens, NY" },
    { id: 64, name: "Buffalo Niagara YMCA Turkey Trot", location: "Buffalo, NY" },
    { id: 65, name: "Rock ‘n’ Roll – Arizona", location: "Phoenix, AZ" },
    { id: 66, name: "Columbus Marathon", location: "Columbus, OH" },
    { id: 67, name: "Indianapolis Monumental Marathon", location: "Indianapolis, IN" },
    { id: 68, name: "The Spring Lake 5 Miler", location: "Spring Lake, NJ" },
    { id: 69, name: "Crescent City Classic", location: "New Orleans, LA" },
    { id: 70, name: "California International Marathon", location: "Sacramento, CA" },
    { id: 71, name: "Utica Boilermaker Road Race", location: "Utica, NY" },
    { id: 72, name: "Baltimore Running Festival", location: "Baltimore, MD" },
    { id: 73, name: "Shamrock Run Portland", location: "Portland, OR" },
    { id: 74, name: "Manchester Road Race", location: "Manchester, CT" },
    { id: 75, name: "Thanksgiving Day Race", location: "Cincinnati, OH" },
    { id: 76, name: "NYRR Staten Island Half Marathon", location: "New York, NY" },
    { id: 77, name: "Lexus Corporate Run – Miami", location: "Miami, FL" },
    { id: 78, name: "Falmouth Road Race", location: "Falmouth, MA" },
    { id: 79, name: "Rose Bowl Half Marathon & 5K", location: "Santa Monica, CA" },
    { id: 80, name: "Quad City Times Bix", location: "Davenport, IA" },
    { id: 81, name: "Newport News One City Marathon", location: "Newport News, VA" }
    
  ];

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
let uri = process.env.MONGO_URI;
console.log(uri);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const raceSchema = new mongoose.Schema({
  raceId: { type: Number, required: true },
  name: String,
  location: String,
}, { collection: 'races' });

const Race = mongoose.model('Race', raceSchema);


const saveRaces = async () => {
  for (const elem of races) {
    const newPost = new Race({
      raceId: elem.id,
      name: elem.name,
      location: elem.location,
    });

    try {
      const savedPost = await newPost.save();
      console.log(`Saved: ${savedPost.name}`);
    } catch (error) {
      console.log(`Error saving post for ${elem.name}:`, error);
    }
  }
};


saveRaces();
