# NameForgeJS

- Version: 1.4.0
- Npm downloads: 307 (updated every day)

npm: [https://www.npmjs.com/package/nameforgejs](https://www.npmjs.com/package/nameforgejs)

## Version 1.4.0 is here
### To see what's new, scroll to the bottom.

## Introduction
NameForgeJS is a JavaScript library that allows you to generate random names with customizable settings. It supports 105 countries worldwide and is regularly updated for an improved experience.

## Installation
To install NameForgeJS, use the following command in your terminal:
```
npm install nameforgejs
```

## Usage
To use NameForgeJS in your JavaScript project, import it into your file:
```javascript
import NameForgeJS from 'nameforgejs';

const generator = new NameForgeJS();
const generatedNames = generator.generateNames();
console.log(generatedNames);
```

Since version 1.3, you can generate a link to download the names as a JSON file. Here's an example:
```javascript
import NameForgeJS from 'nameforgejs';

const generator = new NameForgeJS();
const generatedNames = generator.generateNames();
console.log(generatedNames);

generator.createJSONLink(generatedNames, "file name");
```
- Note: This only returns the URL for the file. To use the URL, you can do the following:
```javascript
import NameForgeJS from 'nameforgejs';

const generator = new NameForgeJS();
const generatedNames = generator.generateNames();
console.log(generatedNames);

generator.createJSONLink(generatedNames, "file name").then((url) => {
    console.log("The URL for the file is: ", url);
})
```

If you want to save the JSON file after getting the download URL, you can do it like this:
```javascript
import NameForgeJS from 'nameforgejs';

const generator = new NameForgeJS();
const generatedNames = generator.generateNames();
console.log(generatedNames);

generator.createJSONLink(generatedNames, "file name").save();
```
In the above example, it will fetch the download URL and automatically save the JSON file.

You can add and remove male/female/last names from a specific country. Example:
```javascript
import NameForgeJS from 'nameforgejs';

const generator = new NameForgeJS();

//adding custom names
generator.setCustomNames("japan", {
    male: ["Daiki"],
    female: ["Haruka"],
    last_names: ["Suzuki"]
});

//removing existing names
generator.removeNames("japan", {
    male: ["Akihiro"],
    female: ["Yui"],
    last_names: ["Satō"]
});

//NOTE: It's important that you generate the names after adding/removing names
const generatedNames = generator.generateNames();
console.log(generatedNames);
```

## Customizing Settings

The library comes with a set of default settings, which you can customize according to your needs. Below is a list of these settings along with their default values and how you can modify them:

### Settings

1. **name_type**: 
   - **Default**: 'human'
   - **Options**: 'human', 'animal', 'any' (where 'any' includes both human and animal names)
   - **Usage**: `name_type: 'human'`, `name_type: 'animal'`, `name_type: 'any'`

2. **starts_with**: 
   - **Default**: 'any'
   - **Options**: Single character or array of characters
   - **Usage**: `starts_with: 'f'`, `starts_with: ['f', 'b']`, `starts_with: 'any'`

3. **ends_with**: 
   - **Default**: 'any'
   - **Options**: Single character or array of characters
   - **Usage**: `ends_with: 'f'`, `ends_with: ['f', 'b']`, `ends_with: 'any'`

4. **generate_last_name**: 
   - **Default**: true
   - **Options**: true, false
   - **Usage**: `generate_last_name: true`, `generate_last_name: false`

5. **gender**: 
   - **Default**: 'any'
   - **Options**: 'male', 'female', 'any'
   - **Usage**: `gender: 'male'`, `gender: 'female'`, `gender: 'any'`

6. **country**: 
   - **Default**: 'any'
   - **Options**: Single country or array of countries
   - **Usage**: `country: 'sweden'`, `country: ['sweden', 'turkey']`, `country: 'any'`

7. **count**: 
   - **Default**: 10
   - **Options**: Integer (number of names to generate)
   - **Usage**: `count: 5`

8. **names_with_title**: 
   - **Default**: 50 (percent)
   - **Options**: Percentage (0 to 100) of names to include a title
   - **Usage**: `names_with_title: 75`

9. **title**: 
   - **Default**: 'Mr.'
   - **Usage**: `title: 'Dr.'`

10. **generate_age**: 
    - **Default**: false
    - **Options**: true, false
    - **Usage**: `generate_age: true`, `generate_age: false`

11. **min_age**: 
    - **Default**: 0
    - **Options**: Integer (minimum age)
    - **Usage**: `min_age: 10`

12. **max_age**: 
    - **Default**: 100
    - **Options**: Integer (maximum age)
    - **Usage**: `max_age: 25`

You can customize these settings to generate names according to your preferences. 

For example:
```javascript
import NameForgeJS from 'nameforgejs';

const generator = new NameForgeJS();
const generatedNames = generator.generateNames({ generate_last_name: false, country: "brazil" });
console.log(generatedNames);
```

The `starts_with`, `ends_with`, and `country` settings support selecting multiple values. To do so, you can provide an array of values. For example:
```javascript
import NameForgeJS from 'nameforgejs';

const generator = new NameForgeJS();
const generatedNames = generator.generateNames({starts_with: ["a", "f"], ends_with: ["g", "k"], country: ["spain", "italy"]});
console.log(generatedNames);
```

You can also specify the `name_type` setting to generate human names, animal names, or both. For example:
```javascript
import NameForgeJS from 'nameforgejs';

const generator = new NameForgeJS();
const generatedHumanNames = generator.generateNames({ name_type: 'human' });
console.log(generatedHumanNames);

const generatedAnimalNames = generator.generateNames({ name_type: 'animal' });
console.log(generatedAnimalNames);

const generatedAnyNames = generator.generateNames({ name_type: 'any' });
console.log(generatedAnyNames);
```

### Notes:
- If `generate_age` is set to true, the names will be returned as objects instead of strings.

## Supported Countries
The library currently supports names from 105 countries:
- united_States
- portugal
- sweden
- denmark
- italy
- france
- germany
- china
- korea
- finland
- austria
- hungary
- iceland
- belgium
- yemen
- zimbabwe
- russia
- ukraine
- qatar
- brazil
- oman
- arabic
- vanuatu
- ireland
- india
- estonia
- afghanistan
- lithuanian
- iraq
- turkey
- egypt
- ghana
- croatia
- greece
- chile
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
- gambia
- georgia
- indonesia
- iran
- israel
- jamaica
- liberia
- mexico
- morocco
- nepal
- new_zealand
- niger
- nigeria
- pakistan
- peru
- philippines
- poland
- romania
- slovakia
- slovenia
- south_africa
- south_korea
- spain
- syria
- thailand
- united_kingdom
- zambia
- vietnam
- venezuela
- uzbekistan
- uruguay
- uganda
- tuvalu
- turkmenistan
- tunisia
- tonga
- togo
- tanzania
- suriname
- sudan
- somalia
- singapore
- seychelles
- serbia
- senegal

## Contact Information
If you have any questions, feel free to reach out:
- Email: mazewinther@gmail.com

If you have suggestions, pull a request on Github:
[https://github.com/nameforgejs/NameForgeJS/pulls](https://github.com/nameforgejs/NameForgeJS/pulls)

If you encounter issues with NameForgeJS, click the following link:
[https://github.com/nameforgejs/NameForgeJS/issues](https://github.com/nameforgejs/NameForgeJS/issues)

## Socials
- GitHub: https://github.com/nameforgejs/NameForgeJS/
- npm: https://www.npmjs.com/~namegenjs
- Twitter (X): https://twitter.com/nameforgejs_

## License
You're allowed to:
- Use the library for any purpose
- Modify the NameForgeJS file in your project to your liking
- Commercial use is allowed

You're not allowed to:
- Sell a copy of the library

## Updates
- NameForgeJS is regularly updated and improved. We appreciate your patience.

### Version 1.4
We've added 45 more countries, brining the overall number to 150 countries worldwide.

You now have even more control over generating names. You can add and remove male/female/last names from a specific country. Example:
```javascript
import NameForgeJS from 'nameforgejs';

const generator = new NameForgeJS();

//adding custom names
generator.setCustomNames("japan", {
    male: ["Daiki"],
    female: ["Haruka"],
    last_names: ["Suzuki"]
});

//removing existing names
generator.removeNames("japan", {
    male: ["Akihiro"],
    female: ["Yui"],
    last_names: ["Satō"]
});

// NOTE: It's important that you generate the names after adding/removing names

const generatedNames = generator.generateNames();
console.log(generatedNames);
```

Fixed important bugs. The previous version had several issues, and they are now fixed to provide a better experience

- What features should we add in the next update? Let us know on Twitter or GitHub. your feedback means a lot.

### Version 1.3
NameForgeJS has been improved with the following additions:

New Settings:
- `generate_age`
- `min_age`
- `max_age`

You can now generate ages along with the names.

Structure Improvement:
- Previously, you would use NameForgeJS like this:
```javascript
import { generateName } from 'nameforgejs';

const generatedNames = generateName();
console.log(generatedNames);
```
From now on, you will need to use NameForgeJS like this:
```javascript
import NameForgeJS from 'nameforgejs';

const generator = new NameForgeJS();
const generatedNames = generator.generateNames();
console.log(generatedNames);
```

JSON Export:
- It is now possible to export the names in a JSON format. Read the updated section `Usage` to learn more

### Version 1.2
The latest update for NameForgeJS introduces the following enhancements:

Multiple Values:
- Now you can select multiple values for "starts_with", "ends_with", and "country". Example:
```javascript
import { generateName } from 'nameforgejs';

const generatedNames = generateName({starts_with: ["a", "f"], ends_with: ["g", "k"], country: ["spain", "italy"]});
console.log(generatedNames);
```

Extended Country Support:
- The library now supports names from 105 countries.

New Setting: `name_type`
- This setting allows you to generate names specifically for humans, animals, or a mix. Accepted values include: "any", "human", "animal". Example:
```javascript
import { generateName } from 'nameforgejs';

const generatedHumanNames = generateName({ name_type: 'human' });
console.log(generatedHumanNames);

const generatedAnimalNames = generateName({ name_type: 'animal' });
console.log(generatedAnimalNames);

const generatedAnyNames = generateName({ name_type: 'any' });
console.log(generatedAnyNames);
```
