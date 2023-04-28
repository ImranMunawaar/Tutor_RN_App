import Layout from "../constants/Layout";
import { Platform } from "react-native";
import Constants from "expo-constants";
import _ from "lodash";





const screenWidth = 375;
const screenHeight = 812;

export function getHeight(heightPixel) {
  //console.log("Constants.platform.userInterfaceIdiom", Constants.platform[Platform.OS].userInterfaceIdiom);
  if (Constants.platform[Platform.OS].userInterfaceIdiom === "tablet") {
    return heightPixel + 2;
  }
  let calculatedHeight = heightPixel / screenWidth;
  return parseFloat((Layout.window.width * calculatedHeight).toFixed(4));
}

export function getWidth(widthPixel) {
  let calculatedWidth = widthPixel / screenWidth;
  return parseFloat((Layout.window.width * calculatedWidth).toFixed(4));
}

export function convertToLowerCase(value) {
  return value.toLowerCase();
}

export function covertToString(value) {
  return value ? value.toString() : "";
}



// Validates the format of an email address
// Returns the email address if it is valid, or null if it is not
export const validateEmail = (email) => {
  // Convert the email to lower case and use the optimized regex to check if it is in a valid format
  return String(email)
    .toLowerCase()
    .match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
};

// Returns a new database instance from the firebase library
// using the database URL stored in the global store object
// export const getDatabaseInstance = () => {
//   // Retrieve the database URL from the global store object
//   const databaseUrl = store.getState().persist.dbURL;

//   // Create and return a new database instance using the firebase library
//   return firebase.app().database(databaseUrl);
// };



/**
 * Sorts an array of items based on the given sort type.
 * @param {Array} array - The array of items to sort.
 * @param {string} sortType - The sort type to use. Possible values are: "Newest", "Last Viewed", and "Alphabetically".
 * @return {Array} The sorted array.
 */



export const isAndroid = Platform.OS === "android";
export const deviceWidth = Layout.window.width;
export const deviceHeight = Layout.window.height;
