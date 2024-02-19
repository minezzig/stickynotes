# stickyNotes

I tried to make a bit of a twist on the usual notes app/reminders app.  In this app a user can write a sticky note and give it a color-coded category.  Once the list of notes is generated, the notes can be edited in place (including changing the category), crossed off as finished (which makes the note move to the bottom of the list), or deleted entirely.  

In addition, the notes can be filtered to only view those within a certain category.  

<center>
<p float="left">
<img src="./src/images/screenshot.jpg" height=400>
<img src="./src/images/screenshot-edit.jpg" height=400 />
</p>
</center>

## My process

### Built with

- HTML
- CSS
- JavaScript
- React.js
- Vite

### What I learned

This app was a review of CRUD functionality.  Something that posed a bit of a challenge when creating this project was editing a note in place.  It was very easy to render the notes information in the original form, but I wanted to make sure that the note could be edited right where it was.  This posed two issues: creating a new state and value for an editedNote as well as figuring out how to create a textarea that would render the text, so the card stayed the same dimensions.  Though my fix for the later may not be the most accurate, it does work, and I am happy with the results.  

### Continued development

The first thing that I could do to further this project is creating a database so that the notes would be saved and not lost upon refresh.  To further this aspect, I could even add authentication so that a user would have their own database they could log in to and revisit.  

As much as I love CSS, my design skills could always use some improvement.  So, adding more CSS and some media-queries to make this more responsive is another way to continue development on this project.
