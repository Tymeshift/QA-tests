# QA-tests
This repo holds a practical test for the candidates applying to QA enginner positions.
Demo site on which candidates will do their practical assessment is simple registration form. 

Content of Demo site:

| Section           | Content             |
|-------------------|---------------------|
| Header            | Logo icon, h1 Title, navigation|
| Body              | Registration form, image upload|
| Footer            | Copyright, Social media links|

Implementation of Demo site:

| Field             | Type                |
|-------------------|---------------------|
| First name        | Text                |
| Last name         | Text                |
| Address           | Text area           |
| Email address     | Text                |
| Phone             | Text                |
| Gender            | Button              |
| Hobbies           | Checkbox            |
| Languages         | MultiSelect         |
| Skills            | Select              |
| Country           | Select              |
| Select Country    | Select with search  |
| Date of birth     | Select              |
| Password          | Text                |
| Confirm password  | Text                |
| Submit            | Button              |
| Reset             | Button              |


Functionality description:
1. Click on the Logo icon: Redirect to the Index.html page
2. Navigation
  2. Home: Redirects to the Index.html page
  2. Register: Redirects to the Index.html page
  2. WebTable: Non existing page
  2. SwitchTo and submenus: Non existing pages
  2. Widgets and submenus: Non existing pages
  2. Interactions and submenus: Non existing pages
  2. Video and submenus: Non existing pages
  2. WYSIWYG and submenus: Non existing pages
  2. More and submenus: Non existing pages
  2. Practice site: Redirects to tymeshift.com
 3. Registration form
  3. First name: No regular expression + field is required
  3. Last name: No regular expression + field is required
  3. Address: No regular expression + field isnt required + field can be expended
  3. Email address: Regular expression: @ is required in a string
  3. Phone: Regular expression: Number must contain 10 digits without any special character or sign
  3. Gender: Regular expression: One button must be selected
  3. Hobbies: No regular expression + selection is not required
  3. Languages: No regular expression + selection is not required + this is multiselect field
  3. Skills: No regular expression + selection is not required + this is select field
  3. Country: No regular expression + selection is required + this is select field
  3. Select Country: No regular expression + selection is not required + this is select field with search bar
  3. Date of birth: No regular expression + selection is required + this is select fields for year,month and day
  3. Password: Regular expression: Must contain UpperCase, LowerCase alphabet and a number
  3. Confirm password: Must match Password input
  3. Submit: Displays popup: Successful registration
  3. Refresh: Reset the form
  3. Upload photo: Uploads new image
 4. Footer
  4. Social media links: Redirects to the social medias urls
  
To be done:
 1. Add iframe on elements
 2. Add popup on submit button click with "Success registration" message
 3. Fix image upload
 4. Create issues
 5. Create a document with practical assessment information for the candidate

Test cases:
1. Logo icon: Check redirection link and upload of image
2. Navigation: Check redirection links
 3. Registration form
  3. First name: Check regular expression + is field required
  3. Last name: Check regular expression + is field required
  3. Address: Check regular expression + is field required + expanding
  3. Email address: Check regular expression + is field required
  3. Phone: Check regular expression + is field required
  3. Gender: Check clickabilty + availability
  3. Hobbies: Check regular expression + is field required
  3. Languages: Check regular expression + is field required
  3. Skills: Check regular expression + is field required
  3. Country: Check regular expression + is field required
  3. Select Country: Check regular expression + is field required + input in the search bar
  3. Date of birth: Check regular expression + is field required + selection
  3. Password: Check regular expression + is field required
  3. Confirm password: Check regular expression + is field required
  3. Submit: Displays popup: Check clickability + ability to submit form
  3. Refresh: Check clickability + functionality of reset
 4. Footer
  4. Social media links: Check redirection links
