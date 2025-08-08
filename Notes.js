/*
Old Websites(server-side rendering):
  before 2010, all the website are all server-side rendering
  this means all the HTML, CSS, and javascript codes are all loaded on the server
  because there are no a lot of code in javascript, so it works
New Way(client-side rendering):
  
The Goal of Front End Web APP(when developping a single paged app):
  handling the data and updating the GUI
  which means it just need to keep the interface updated
  BUT
  it is really hard and almost impossible to keep all the interconnecting data updated with vanilla Javascript
  REASONS:
    1. with basic javascript we need to do a lot of DOM manipulations, like selection and manipulation, so this lead to a nightmare of a mess of code in large applications
    2. Vanilla Javascript store mode of the data in the DOM do it makes to hard to find bugs when there are multiple statements change the same DOM element. 

Why is there Front End Frameworks:
  1. it is hard to keep the user interface updated with the data
  2. the frameworks enforce a way to write and structure to make sure our code is not a mess
  3. this allows everyone on a team to be able to code in the same style

React:
  With React we don't need to have a html file controlling everything, all the code can be in javascript
  What it is:
    Extremely Popular:
      Most used framework on npm
    Declarative:
      we describe how each component looks like through a declarative syntax called JSX
      with this we don't work with the DOM at all, we just tell React what the page should look like, and React with deal with the rest
      JSX:
        this is a syntax that combines HTML, CSS, Javascript, and access other React Components
    Component-based:
      react take different components and put them together to create the web page
      so we only need to build the components for the web page
    State-driven:
      piece of data = piece of state
      base on the inital state React will render an UI
      Whenever the state is changed React will automaticly update the UI
      IN OTHER WORDS: React reacts to state changes by re-rendering the UI
      (This is where the name came from)
    Javascript Library for Building User Interfaces:
      React is only the view "layer", we need many other external libaraies to build a complete application. 
      BUT
      there are many complete frameworks build on React, like NEXT.js and Remix
    Create by fackbook(Meta):
      Create by Jordan Walke in 2011
      in 2013 it is open sourced
*/