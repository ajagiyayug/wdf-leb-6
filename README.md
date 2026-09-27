# Practical 6: Rendering External JSON Data using Fetch API, Search, and Filter

## Objective & Purpose
This practical is designed to demonstrate how to asynchronously fetch, parse, and dynamically render external JSON data on a web application using JavaScript (ES6+). It focuses on building a responsive UI that allows users to interactively search, filter, sort, and navigate through datasets (such as events, student profiles, or FAQs) using modular frontend JavaScript logic.

## Problem Definition
To build a web application that loads dynamic data from external JSON files using the JavaScript Fetch API. The application provides interactive client-side features, including real-time search, category filtering, dynamic sorting, and client-side pagination.

## Key Features & Implementations
* **Data Fetching & Parsing:** Asynchronously requests external JSON files using the native `fetch()` API and converts the raw response into usable JavaScript objects.
* **Dynamic UI Rendering:** Dynamically generates HTML DOM components using JavaScript template literals and updates views without reloading the page.
* **Live Search & Category Filtering:** Uses array manipulation methods like `.filter()` to update displayed results instantly based on user search input and category selection.
* **Dynamic Sorting:** Implements `.sort()` logic to reorder records based on criteria such as date, alphabetical order, or popularity.
* **Pagination:** Uses `.slice()` logic to divide datasets into manageable pages for optimized display and navigation.
* **Error & State Handling:** Includes feedback mechanisms for loading states, empty search results, and fallback handling in case of fetch failures.

## Technologies Used
* **Frontend Structure & Styling:** HTML5, CSS3
* **Scripting & Logic:** JavaScript ES6+ (Fetch API, Array Methods, DOM Manipulation)
* **Data Format:** JSON (JavaScript Object Notation)

## Learning Outcomes
Upon completing this practical, students will be able to:
* Consume external JSON data sources asynchronously using JavaScript.
* Implement essential JavaScript array methods (`filter`, `sort`, `slice`, `map`/`forEach`) for data manipulation.
* Build modular, scalable frontend web components with clean state management and proper error handling.
