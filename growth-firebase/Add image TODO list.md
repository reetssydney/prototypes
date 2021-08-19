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

- ✅ Create newcomer homepage linking to SE module page


### **SE-module page (formerly known as 'start.html')**

- ✅ Add image task info tooltip pop-up
- ✅ Create article card 'carousel'
- ✅ Fix prev/next button actions
- ✅ 👷 Add swipe gesture
- ✅ Add topic filter modal (low prio)
- ✅ Add task filter modal (low prio)
- ✅ ***BUG*** Wrong article is being opened when prev and next is used. - see details at https://github.com/reetssydney/prototypes/issues/8
- ✅ Add same swipe animation when prev/next buttons are tapped (low prio)
- ✅ Dismiss the more info about task drawer when tapping outside of it (low prio)

***CONCEPT A ONLY****
- ✅ Re-style the card per the Concept A img mocks (see commented out css and html) https://phabricator.wikimedia.org/T288999

### **Edit page**

- ✅ Toggle bottom sheet open and close
- ✅ Change disabled next icon to enabled primary icon when a decision is made
- ✅ Add functionality to open the image in full-screen
- ✅ Add functionality to open the file in new tab
- ✅ 👷 Add onboarding 'guided tour' (style used in Concept B) for making the edit
- ✅ Fix zooming too far in and lack of sticky header when adding caption (iOS device)
- ✅ remove help icon from the inspector (maybe add chevron instead)
- ✅ Add onboarding for the caption
- ✅ ***[High priority]*** Update onboarding so it only appears once and does not come up again after being completed (https://phabricator.wikimedia.org/T288992)
- ✅ Image details modal dialog (when "Read more is tapped") is dismissed when user taps outside of the modal [Low prio]
- ✅ Image metadata drawer (when tapping the placedImage) is dismissed when user taps outside of the drawer [Low prio] https://phabricator.wikimedia.org/T288993


***CONCEPT B ONLY***

- ✅ More image info bottom sheet for captions
- ✅ 👷 Interstitial 'Loading image...' screen
- ✅ Change header when adding a caption to back arrow (add functionality to back arrow) https://phabricator.wikimedia.org/T288994
- ✅ Revise caption design so that it's clearer how to access image metadata


***CONCEPT A ONLY***

- ⬜ Restyle inspector https://phabricator.wikimedia.org/T289000
 1. ⬜ Restyle so that suggested image is located at the top of the article prior to "accepting"
 2. ⬜ Show more image info as a pop-up
- ⬜ Update caption presentation https://phabricator.wikimedia.org/T289002
 1. ⬜ Make the caption a full screen modal/dialog
 2. ⬜ Add a caption tooltip pop-up ( on the "i" icon) on the full screen modal/dialog [low priority]
- ⬜ Change position and pointer placement for onboarding (task and caption adding) to match corresponding components in Concept A https://phabricator.wikimedia.org/T289004
- ⬜ Change disabled next icon in the full-screen caption image to enabled primary icon when a caption is entered https://phabricator.wikimedia.org/T289005


### **Preview page**
- ✅ tapping back goes back to edit.html
- ✅ tapping back goes back to edit.html with caption step remembered (low-prio) https://phabricator.wikimedia.org/T288995


***CONCEPT A ONLY***

- ✅ 🔧 update styling to reflect concept A summary view. https://phabricator.wikimedia.org/T289006

### **Submitted page**

- ✅ 👷 Add animation to first show the article before then loading the modal and message
- ✅ 👷 Show a different message depending on whether the user has accepted or rejected the image
- ✅ 👷 Do not show 'Close to edit again' CTA in the drawer when coming from Reject flow.

### **Reject overlay**

***CONCEPT B ONLY***

- ✅ Selecting next from here takes user directly to 'submitted' page

***CONCEPT A ONLY***

- ✅ Selecting rejecting reason goes to the 'preview' page first https://phabricator.wikimedia.org/T289007
- ⬜ 🔧 Change from checkboxes to radio buttons https://phabricator.wikimedia.org/T289009

### **OVERALL**
---------------
- ✅ Move Concept B prototype into a 'ConceptB_en' folder in 'Public'
- ✅ ***[High priority]*** Add es/en dictionary to the prototype to enable faster updating of UI strings https://phabricator.wikimedia.org/T288996
- ✅ Clone and customize completed Concept B instance into Concept A (created in a 'ConceptA' dir) https://phabricator.wikimedia.org/T288997
- ⬜ Clone and customize completed English Concept A & B into Spanish instances
