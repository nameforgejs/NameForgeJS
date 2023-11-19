# NameForgeJs

NameForgeJs is a JavaScript library that allows you to generate random names based on various settings, such as starting and ending letters, gender, country, and more.

## Installation

You can install NameForgeJs via npm:
npm install nameforgejs

Usage
To use NameForgeJs in your JavaScript project, you can import it as follows:

import { generateName } from 'nameforgejs';

// Example usage:
const settings = {
  starts_with: 'any',
    ends_with: 'any',
    generate_last_name: true,
    gender: 'any',
    country: 'any',
    count: 3,
    names_with_title: 50,
    title: 'Mr',
};

const generatedNames = generateName(settings);
console.log(generatedNames);

Settings
starts_with (string, default: 'any'): Starting letter or letters of the first name.
ends_with (string, default: 'any'): Ending letter or letters of the first name.
generate_last_name (boolean, default: true): Whether to generate last names.
gender (string, default: 'any'): Gender of the generated names ('male', 'female', or 'any').
country (string, default: 'any'): Country for name generation ('denmark', 'usa', 'germany', or 'any').
count (number, default: 3): Number of names to generate.
names_with_title (number, default: 50): Percentage of names to include a title with.
title (string, default: 'Mr'): Title to include with names.

Offers:
The library supports 35 countries:
--us
--portugal
--sweden
--denmark
--italy
--france
--germany
--china
--korea
--finland
--austria
--hungary
--iceland
--belgium
--yemen
--zimbabwe
--russia
--ukraine
--qatar
--brazil
--oman
--arabic
--vanuatu
--ireland
--india
--estonia
--afghanistan
--lithuanian
--iraq
--turkey
--egypt
--ghana
--croatia
--greece
--chile

License
This project is licensed under the MIT License. See the LICENSE file for details.
