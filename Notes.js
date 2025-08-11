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
    Declarative(we only need to tell javascript what the web should look like and not how to make it look like that):
      we describe how each component looks like through a declarative syntax called JSX
      with this we don't work with the DOM at all, we just tell React what the page should look like, and React with deal with the rest
      JSX:
        Declarative syntax to describe what the components looks like and how they work
        this is a syntax that combines HTML, CSS, Javascript, and access other React Components
        even though it looks like html but it is an extension of javascript
        the extensions have babel that converse JSX to javascript
        each JSX is converted to a React.createElement function call
        RULES:
          1. JSX works very similar to HTML
          2. {} this turn on javascript mode, so we can write javascript code in {}, 
            any expressions can be in there
            for, switch, if/else don't work
          3. JSX returns a javascript expression
    Component-based:
      WHY:
        because as web development evolve over time, javascript is taking over most of the logic and HTML is rely in javascript. 
        This lead the questions if they are interconnected together why should we keep they apart?
        then lead the creation of the JSX and React which have all the code in HTML, CSS, and Javascript in one file. 
      react take different components and put them together to create the web page
      so we only need to build the components for the web page
      components:
        each component have its own data, logic, and appearance
        nested components are used a lot
        we can also reuse components to create duplicated components
        components are create by using function(they are just functions)
        RULES:
          1. Capitalize the first letter of the function name
          2. we always need to return some markUp(html code) or null
          3. we need to include it to the App Component and when the App is rendered 
                each component can only return a only element(like return <h1>Hello React!</h1>)
                the only way to fix this is wrapping eveything need to be returned in a <div>
          4. we need to nest components but Never NEVER nest component declarations in each other(it works but don't do it)
        data: 
          1. Props:
            data that is coming from the parent components
            RULE: we can NOT change props
              If we change the parent element data, the create a side effect that can break React
            One Way Data Flow:
              this lead to React can only pass data from parent to child and not backward
              WHY?
                this make the application more predictable and easier to understand and debug
                this is also better for performance
            Child Props:
              it is props that a component automaticly recieves
              the value is what is between the open tag and the close tag of the component
          2. State: 
            internal data that can be updated by component logic
            What is it?
              it is the data that the component hold over time(component's memory)
            Notes:
              State: meaning all the states
              State Variable/Piece of state : means the singular state a piece of data
              But these three are used interchangeably
            Whenever a piece of state is change React will re-render the component
              Re-Render:
                in simple terms is that when React need to re-render the component, React will call the component again
                as long as the component exist, all the state will be preserved through out the process of Render and Re-Rendering
            How to use it?
              const [//State Variable//, //the function sets the state variable(usually called set[name])//] = useState(//the default value of the state variable//);
              NEVER mutate the State Variables, always use the set function comes with it
              when setting the state and we are using the current state to set the new value we need to pass the new value in as a callback function, so the current state will always be updated
                Like this: setStep(s => s - 1);
          SUMMARY:
            State is internal data owned by the component
            Props is external data owned by the parent component
            State is like the component's memory, which contains all it needs to know
            Props is like a function parameters that build a connection between the parent and child component
            State can be updated by the component and when it is updated it will trigger React to re-render the component
            Props is read-only the component can't mutate the value but when the parent component update their state, and the props updates, it will also trigger re-rendering of the component
            State is used to make the component interactive
            Props is used by the parent component to config the child components
        logic: 
        appearance: 

        Component Size:
          this matters because too big or too small it is all bad(but sometimes we need very small components that have no logic to make life easier, or vary big ones to contain the entire page)
          TOO Big:
            this cause the component to have too many responsibilities
            Like having too much props and hard to use
            it will also have complex code logics that is hard to understand
          TOO Small:
            this causes there to be too many different components
            it can confuse the condebase
            by have too many small components everything would be too abstracted
          GENERAL RULES:
            1. the seperation between components are logical
              does the component contain pieces of content or layout that don't belong together
            2. make the component reusable when needed
              is it possible to make part of the component reuseable
              is it needed?
            3. each component need to have a logical responsibility
              does the component have too many things
              does the component rely on too many props
              does the component have too many piece of states or effects
              is the code, including the JSX, too complex or confusing
            4. personal preference
            Guidelines:
              1. creating new components have a cost, each new component have a layer of abstraction that makes the code hard to understand
              2. name the component base on what it does or what it displays, don't care if the name is too long(it is normal)
              3. NEVER declare a component inside another component
              4. one app can have components with different sizes
              5. don't seperate the component into files too early
        Component Categories:
          1. Stateless/presetational components
            No State
            they are components that take in data and display them
            They are usually very small and reuseable
          2. Stateful components
            Have State
            can still be usable
          3. Structural components
            "Pages", "Layouts", or "Screens" of the app
            Result of composition
            They can be large and mon-reusable, but not always
            They just have to provide structure of the APP
        Component Composition:
          What It Is?
            combining different components using Children Props(<List>[this part that is passed in is children props]</List>) or explictly defined Props
          Why Use It?
            1. create highly reusable and flexible components
            2. fix Props Drilling
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

Rending List:
  Rendering a components for each element of the array

React Fragment:
  this let us to be able to group html elements without wrapping them in another element or leaving any trace of the wrapping in HTML
  to archieve this by wrapping the elements in <>[elements]</>
  if we need to have a key in the fragment then we need to do this <React.fragment>[elements]</React.fragment>

Listening for Event:
  similar to HTML inline but modified for JSX
  Instead of eventlisteners we are adding them as events in the JSX return of the components
  the "function" is usually defined on the component then called in the {}
  Examples:
    onClick={[function]}
    mouseEnter={[function]}

Controlled Elements:
  What to use on:
    Input Fields and Select elements have their states stored in the DOM, but we want to have them in the code
  How it Works:
    1. create piece of state
    2. we need to set the value to the state(tell React to send the state to the DOM)
    3. we need to get the state from the DOM when there is a new value
      have this on an input field: onChange={e => setDescription(e.target.value)}

Strict Mode:
  all the components are usually rendered twice

Thinking in React:
  have the React mindset
  think about components, states, data flow, effects
  thinking in data transition and but data mutation
  STEPS:
    1. break the desired UI into different components and establish the component tree
    2. build a static version of the component in React
    State Management:
      3. think about states
        when to use it
        type of state: local or global
          Local State:
            they are only access to the compoent it is created in and all its child components through props
            they are states that only needed by a few components
            when we create a piece of local state and there are sibling components that need it, then we need to lift the state up to allow sibing components to access it. 
              Lifting state up:
                this basicly is move the state declaration from one component to its closest parent component then the state can be passed into all the child components through props
            NOTE: we should always start with local states and only change it global when we really need it
          Global State:
            we need external libaray to help to organize these
            these are the states that many component in the app need
            it is also called Shared State, which means all the component can access it. 
        where to place each state
      4. establish data flow
        one-way data flow
        child-to-parent communication
        how to access the global states
  TERMS:
    Derived State:
      state that is computed from existing states
      Benefit:
        by derive states from existing state, this allows us to update one state and all the derived states will also update, and this way the component will only re-render once and we don't need to manually update all the states together all the time
  
State Management:
  deciding 
    when to create a piece of state
    what type of state are necessary
    where to place each piece of state
    how data flow through the app

Debugging:
  if the app is not updating
    1. check if the app is running or not
    2. restart the app

Create React App:
  Create React App:
    npx create-react-app [file name]
*/
