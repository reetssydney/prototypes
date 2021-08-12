PROTOTYPE TODOs
===============
This task list shows items to be done to complete the prototypes for user testing.
**Last updated: Aug 11,2021**

👷 = Growth engineers will work on it
🔧 = Rita hacking on it

**Concept A vs B**
------------------
Note: "Concept B" in English is being created first.
Key screens from the two concepts being built is shown in the Figma file:
https://www.figma.com/file/ULhJr1isDstRbGE5vjYDsr/Add-images-structured-task-Growth?node-id=2342%3A8050

### **Newcomer homepage**

- [x] Create newcomer homepage linking to SE module page


** SE-module page (formerly known as 'start.html') **

- [x] Add image task info tooltip pop-up
- [x] Create article card 'carousel'
- [x] Fix prev/next button actions
- [x] 👷 Add swipe gesture
- [x] Add same swipe animation when prev/next buttons are tapped (low prio)

- [x] Add topic filter modal (low prio)
- [x] Add task filter modal (low prio)

***CONCEPT A ONLY****

- [x] styling of the img mocks

### **Edit page**

- [x] Toggle bottom sheet open and close
- [x] Change disabled next icon to enabled primary icon when a decision is made
- [x] Add functionality to open the image in full-screen
- [x] Add functionality to open the file in new tab
- [ ] 👷 Add onboarding 'guided tour' (style used in Concept B) for making the edit
- [x] Fix zooming too far in and lack of sticky header when adding caption (iOS device)
- [ ] Add onboarding for the caption
- [x] remove help icon from the inspector (maybe add chevron instead)
- ~~[ ] Skip action (low prio)~~

***CONCEPT B ONLY***

- [x] More image info bottom sheet for captions
- [x] 👷 Interstitial 'Loading image...' screen
- [ ] Change header when adding a caption to back arrow (add functionality to back arrow)

***CONCEPT A ONLY***

- [ ] Show more image info as a pop-up
- [ ] Make the caption a full screen modal/dialog
- [ ] Add a caption tooltip on the full screen modal/dialog
- [ ] Change disabled next icon in the full-screen caption image to enabled primary icon when a decision is made

### **Preview page**
- [x] tapping back goes back to edit.html
- [ ] tapping back goes back to edit.html with caption step remembered (low-prio)


***CONCEPT A ONLY***
- [ ] update styling to reflect concept A summary view.

### **Submitted page**

- [x] 👷 Add animation to first show the article before then loading the modal and message
- [x] 👷 Show a different message depending on whether the user has accepted or rejected the image
- [x] 👷 Do not show 'Close to edit again' CTA in the drawer when coming from Reject flow.

### **Reject overlay**

***CONCEPT B ONLY***

- [x] Selecting next from here takes user directly to 'submitted' page

***CONCEPT A ONLY***

- [ ] Selecting rejecting reason goes to the 'preview' page first
- [ ] Change from checkboxes to radio buttons

**OVERALL**
-----------

- [ ] Move Concept B prototype into a 'ConceptB_en' folder in 'Public'
- [ ] Clone and customize completed Concept B instance into Concept A (created in 'ConceptA_en' dir)
- [ ] Clone and customize completed English Concept A & B into Spanish instances
