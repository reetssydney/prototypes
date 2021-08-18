# Growth-Add-Image
This is a set of prototypes used for testing "Add image Iteration 1", a project by the Growth team at the Wikimedia Foundation.

Details and subtasks can be found here:
https://phabricator.wikimedia.org/T287904


## Contributing
~~There is a list of TODOs in the "Add image TODO list.md". Please add a :builder: icon if you are working on a specific task.~~
The list of TODO items has been split into subtasks under https://phabricator.wikimedia.org/T287904

Note that there will be 4 prototypes to be completed in the following order:

1. Concept B in English
2. Concept A in English - create by cloning and modifying UI of completed Concept B accordingly
3. Concept B in Spanish - to be generated from ConceptB
4. Concept A in Spanish - to be generated from ConceptA


**IMPORTANT:**
`ConceptA_en`, `ConceptA_es`, `ConceptB_en`, `ConceptB_es` are generated automatically from `ConceptA` and `ConceptB`. Changes should only be made to files `ConceptA` and `ConceptB` folders otherwise they will be overidden when new builds are generated.


## Hosting
The code will be deployed to https://growth-add-image-iteration1.web.app

## Notes on i18n

HTML files in `ConceptA` and `ConceptB` use EJS templates for localized strings. The templates will be replaced by localized strings during build step.

The messages can be found in `public/i18n` directories.

To add a new localized string:

1. Add a new key-value pair to all the JSON files in `public/i18n`; the key should be all lowercase with no spaces (underscores only), the value should be the corresponding translation
2. In the HTML, use <%= key %> instead of hard-coding the localized string
3. Run `npm run build`
