To view the working version open **/reference-material/index.html** in your browser. the production build of the library is already link to the files.

# Mini react

The main goal was to make my own version of react and its most important functionalities after the requirements of the challenge which prove it self as quite the task. this where my first considerations:

  - An app.js is already provided, which meant I had to adapt to how the library is expected to be used.
  - Couldn't use third-party libraries, so no lodash for me. Better keep it simple.
  - Couldn't change the given material. I didn't totally agreed some decisions made in the app.js file but that just meant the whole process will be more fun (?)


# The process


## find some ideas
I'm really familiar with react and how it works, I actually started teaching react recently and having to teach those concepts made me have a better understanding that the one I had from just coding for work. Also tried to get some good ideas from people who has done the same; no given solution totally worked for me as I expected but at least i could started coding with a cleared mind. 

## hello world
First thing was to put something on the screen. after clearing out all the functionalities that wouldn´t be part of the job, I decided to start from the very basics, I made a simpler version of app.js which just rendered and h1 and it's text. 

One of my first concerns was the way the given node() function was structured and the fact that it could not be change. Having all its props in a single object, including tagname y it's posible class component meant that a lot of validation will be required and probably deleting some of those properties in order to keep the rendered elements clean.

## Class components
The next logical step was to include a class component that renders multiple childrens; the state is a must but that came down later. Iterating a list of childrens was not problem at all but the real challenge came when one of those childrens was another class component due to the lack of type validation for classes. I ended off leaving class as default for my handlers after checking for list of childrens and html nodes. 

## Main concept
The general idea was to be able to identify a render() element from it's props either as a html element, or a class, then a function will handle each case, creating a dom element for the html part o executing the render method for a class. The setState will come inherited from the base component class extended in app js and will assign the new state merged with the previous one a rerender the whole DOM. this process simply clears the root element innerHtml and then executes the main component render method. The reconciliation between the new DOM and the previous one is one of React's key features but given the short scope of this test, it's left put along with jsx ans life cycle methods.

## Conclusions 
The most challenging part of this whole excercise was to adapt to the given App.js but it also was what made it special. I was able to set a build and test processes with webpack and Jest but more unit tests by it self are my biggest debt due to the lack of time. I tend to prioritize functionality over coverage and as a developer this is the main point of improvement i'm working on.
