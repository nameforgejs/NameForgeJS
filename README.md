# NameForgeJS

Version: 1.1

## Introduction
NameForgeJS is a powerful JavaScript library that allows you to generate random names with customizable settings. With support for 105 countries worldwide, this library is constantly updated to provide an even better experience.

## Installation
To install NameForgeJS, simply use npm:
```
npm install nameforgejs
```
View source code on github: https://github.com/nameforgejs/NameForgeJS

## Usage
To use NameForgeJS in your JavaScript project, import it like this:
```javascript
import { generateName } from 'nameforgejs';

const generatedNames = generateName();
console.log(generatedNames);
```

## Customizing Settings
By default, the library has the following settings:
- `name_type`: 'any'
- `starts_with`: 'any'
- `ends_with`: 'any'
- `generate_last_name`: true
- `gender`: 'any'
- `country`: 'any'
- `count`: 1
- `names_with_title`: 0
- `title`: 'Mr.'

The settings that support "any" as a value are:
- `name_type`
- `starts_with`
- `ends_with`
- `gender`
- `country`

You can customize these settings to generate names according to your preferences. 

For example:
```javascript
import { generateName } from 'nameforgejs';

const generatedNames = generateName({ generate_last_name: false, country: "brazil" });
console.log(generatedNames);
```

The `starts_with`, `ends_with`, and `country` settings support selecting multiple values. To do so, you can add the values inside an array. For example:
```javascript
import { generateName } from 'nameforgejs';

const generatedNames = generateName({starts_with: ["a", "f"], ends_with: ["g", "k"] country: ["spain", "italy"]});
console.log(generatedNames);
```

You can also specify the name_type setting to generate human names, animal names, or both. For example:
```javascript
import { generateName } from 'nameforgejs';

const generatedHumanNames = generateName({ name_type: 'human' });
console.log(generatedHumanNames);

const generatedAnimalNames = generateName({ name_type: 'animal' });
console.log(generatedAnimalNames);

const generatedAnyNames = generateName({ name_type: 'any' });
console.log(generatedAnyNames);
```

## Available Settings
- `name_type`: Generate human / animal names
- `starts_with`: The letter the first name starts with
- `ends_with`: The letter the first name ends with
- `generate_last_name`: Whether to generate a last name or not
- `gender`: The gender of the generated name (male / female)
- `country`: The country from which names will be generated
- `count`: The number of names to generate
- `names_with_title`: The percentage of names with a title
- `title`: The specific title to be included

## Supported Countries
The library currently supports names from the following 105 countries:
- United States
- Portugal
- Sweden
- Denmark
- Italy
- France
- Germany
- China
- Korea
- Finland
- Austria
- Hungary
- Iceland
- Belgium
- Yemen
- Zimbabwe
- Russia
- Ukraine
- Qatar
- Brazil
- Oman
- Arabic
- Vanuatu
- Ireland
- India
- Estonia
- Afghanistan
- Lithuanian
- Iraq
- Turkey
- Egypt
- Ghana
- Croatia
- Greece
- Chile
- namibia
- luxembourg
- ecuador
- canada
- switzerland
- japan
- albania
- algeria
- andorra
- angola
- antigua_and_barbuda
- argentina
- armenia
- australia
- azerbaijan
- bahamas
- bahrain
- bangladesh
- barbados
- belize
- benin
- bhutan
- bolivia
- bosnia_and_herzegovina
- botswana
- brunei
- cameroon
- chad
- colombia
- cuba

## Contact Information
If you have any questions, feedback, or encounter issues with NameForgeJS, feel free to get in touch:
Email: mazewinther@gmail.com
Github: https://github.com/nameforgejs

## License
This project is licensed under the MIT License. See the license.txt file for more information.

## Updates
### Version 1.1
Introducing the latest update for NameForgeJS library:

Selecting multiple values for "starts_with", "ends_with", and "country" is now possible! Take a look at the example below:
```javascript
import { generateName } from 'nameforgejs';

const generatedNames = generateName({starts_with: ["a", "f"], ends_with: ["g", "k"], country: ["spain", "italy"]});
console.log(generatedNames);
```

Additionally, the library has extended the support of countries to 100.

But that's not all! We've also added a new setting called `name_type`. Let's explore more about this new feature:
- `name_type`: 'any'
Accepted values for this setting include: 
- "any"
- "human"
- "animal"
Now, you can generate names specifically for humans, animals, or even mix them up according to your preferences. It's all up to you!
