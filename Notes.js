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

Framework:
  this is a complete kit of everything we need to building a complete application(batteries included), it have HTTP requests, Styling, Routing, Form managment
  BUT we are stuck with the tools and convensions

Library:
  this is piece of code developer shares with other to make everyone's life easier
  this allows us to pick whatever library we like
  BUT we need to manually download all of them and update when things change
  Example:
    React:
      it is a View Library, because all it does is drawing components on UI
      so if we want to build an application with React we need to add a lot of external libraries to make everything work
      BUT React is so popular there are a lot of external librarie to choose from

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
  Components:
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
      1. Render Logic
        this is all the code that live at the top level of the component
        and all the code the participate in describing how the component will look
        In summary this is all the code that is being executed everytime the component is rendered
        NEVER put setState calls inside the top level code, because after initial render the state change will trigger re-render and the re-render will trigger the state change and cause an infinity loop of re-rendering
        ReactRULE:
          Render Logic must be pure, so no interaction with outside world
      2. Event Handler functions
        this is code that execute as a consequence of the event that the handler is listening for
        this is also the codes that is actually doing things, like changing states and many other things
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
  Component:
    these are what we write in order to describe a piece of UI
    they are just javascript functions, but they return React Elements(element tree), which usually written in JSX
    each component can be think as a "blueprint" or "template"
    from each of component, one or more Component Instance are created
    INFO:
      we can console.log the compoent Instace by doing (<App/>), this will output the React Element
      Because a Component is just a javascript function, so we can do function calls, but NEVER DO THIS.
      Function calls make React not register it as a component so it breaks
  Component Instance:
    Each time a Component is called, one instance of the component is created
    This is because everytime we use the component React calls that component and create an instance
    these instances are "physical" manifestation of the component
    they have their own state and props
    they also have their own lifecycle
    THEN each of these react instances will return one or more React Elements
    Component Instance Lifecycle(Component Lifecycle):
      this is the different phases a component instance can experience
      1. Mounted(Initial Render):
        this is when the component instance is rendered for the first time
        Fresh state and props is created
      2. Re-Render:
        This happens when
          state changes
          props changes
          parent re-renders
          context changes
      3. Unmount:
        this is when the component instance is destroyed or removed
        all of its state and props go with it
      We can define code to be run at these different stages(useEffect)
  React Element:
    Because each JSX can be converted to a React.creatElement() call
    each of these calls will result as a React Element
    These Elements are objects that contains all the information needed to create the DOM elements
    These React Elements will be converted to DOM Elements
    These element don't actually display, they are just convert to DOM Elements
  
  Rending the Elements(Render):
    1. Rendering is triggered: which is usually when a state updates
      How to Trigger:
        1. the initial Render: this is when the application run for the first time and everything is rendered
        2. Re-Render: this is when a state changed
        NOTE: 
        1. the render process is triggered for entire application, but it doesn't mean the entire DOM will update
        2. The Render is not triggered immediately, it will only start when the JS Engine have "free time". There is also batching of multiple setState calls in event handler
          State Update Batching:
            when the setState calls are next to each other(show below), it will not trigger three re-renders. they will be batched together to only one re-render
            setA("");
            console.log(A);
            setB("");
            setC("");
            BUT what happen to the console.log?
              A will not be "", this is because the code is read line by line and the set is batched
              so at this point the state is know as stale state, which means it should be reseted but not yet
              CONCLUDE:
                setState is Asynchronous
                this is why when we need the current value we need to do this
                setD(d=>d+1);
            NOTE:
              Never used, but if you are desperate
              ReactDOM.flushSync([setState()])
              this will stop the batching for this set call
    2. Render Phase(React):
      What is it?
        at this phase React calls the components and figure out how to update the DOM to reflect the state changes
        NOTE:
          This phase nothing is changed or displayed in the DOM
          The definition of Render in React is not what we think
          Render is only internally React figure out how things need to work
          But nothing is change vistually
      PROCESS:
        1. React will going through the entire Component Tree and Render all the instance that triggered the re-render, which mean it calls the Component function
        2. This will create updated React Elements
        3. all these elements will make up the Virtual DOM
          Virtual DOM:
            What it is?
              During the initial render of the application React will take the entire Component Tree and trasform it into one big React Element, which is the React Element Tree
              This Element Tree is also known as the Virtual DOM
            Definition:
              Virtual DOM is just a Tree of all the React Elements converted from all the Component Instance
            Benefit:
              It is very cheap and fast to create a tree like this
            NOTE:
              This have nothing to do with the "Shadow DOM"
          Whenever there is a state update in a component and trigger the re-render
          Then React will call the component and create a new Virtual DOM, this new React Element Tree will also contain the new Element from the call from the Child Component of the Component
          Because everytime a component re-render, all its child components will also re-render no matter is their props changed or not. 
          the reason for this is that React don't know where the change will effect the child component or not, so it re-renders everything to play it safe. 
        4. New Virtual DOM will get reconciled with the Fibre Tree before the state update
          this is done in React's Reconciler, also called Fibre, thats why there is a Fibre Tree
          the result of the reconciliation will be a new Fibre tree that will be later used to update the DOM
          WHY?
            Writing to the DOM is very inefficient and wasteful
            Usually only small part of the DOM need to be updated, but initial there is no way to know which part need to be updated, so we need to update the entire DOM
          What is it?
            Reconciliation:
              this is deciding which part of the DOM need to be added, deleted, or changed to reflect the lastest state change
              So the Reconciler that does this can be seen as the heart of React. 
              Process:
                this process use the Diffing, which is going through each element and compare and update the Fibre Tree. 
                Diffing:
                  How it Works:
                    Based on 2 assumptions:
                      1. two elements of different type will produce different trees
                        if the type changed, like <p>hi</p> to <span>hi</span>
                        then the old components in this case <p> and all of its children and states
                        then a new tree will be build for <span> with brand new states
                        so then way the states are all reset{this is probably why when we close a window, then reopen it, it resets all the input boxes 🤔}
                      2. elements with a stable key will stay the same across renders
                        if after rendering the same element is at the same position all the state will be preserved. 
                        {this is probably the cause that when we change the window between different account and the account looks the same all the input boxes are not cleared 🤔}
                        KEY PROPS:
                          this allows the diffing algorithm to differentiate between similar elements and a element is unique
                          USE CASE:
                            1. use in list items:
                              the a list is rendered and a new element is add to the top of the list
                              so the rest of the elements in the list is all moved down
                              if there are not unique keys then all of the will be destroyed and rebuild which is a bad practice and bad for performance
                              WITH a key props they will be not reconstructed because they ave a unique key
                            2. Changing Key:
                              When create the element it will have a key value, when the content change and we want to reset the state we can change the key value with the content so it will be register as a different element and have brand new state
                The elements that DOM need changing is marked DOM Update
                The elements that need to be deleted is marked DOM Deletion
                All these changes then is placed in a list called List of Effects, which will be used in the next phase to update the DOM
            Reconciler(Fibre):
              After the initial launch of the app, a Fibre Tree is created from the React Element Tree(Virtual DOM), 
              This Tree contains a "fibre" for each component instance
              These Fibres are not recreated on every render, instead the Fibre Tree is a mutatable data structure that updates everytime when there is a re-render
              All the information of each component is stored in the fibre
              fibre is also defined as "a unit of work", because it also have all the work(queue of work), execution stuff in there
              In there the work can be done asynchronously
                this allows us to be able to pause, resume and thrown away work
                which helps use to be able to have suspense or transitions that won't block the rest of the code
              NOTE:
                The Fibre Tree don't not have only the React Components, it also includes the HTML elements, like h3 and button
    3. Commit Phase(ReactDOM):
      This is the traditional understand of Render for us Humans. 
      It is during this phase where all the changes are reflected in the DOM
      React will add, delete or update the elements
      NOTE:
        this process is synchronous so that all the DOM is updated in one go so no partial result is displayed to the user
        After this phase is completed the workInProcess Fibre Tree becomes the current Fibre Tree and ready for the next render cycle
      ReactNOTE:
        React never touches the DOM, because it is design to be able to interact with different platforms("hosts") and not just browers
        Examples(these Renders):
          With React Native we can build IOS and Android Native Mobile Applications
          With a package called Remotion we can build videos
          With many other things we can create word, pdf, and many other things
    4. Brower Repaint(Browers): this is when the Brower noticed the change in the DOM and repaint the page so we can see the change

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
        type of state(base on accessibility): local or global
          Local State:
            they are only access to the compoent it is created in and all its child components through props
            they are states that only needed by a few components
            when we create a piece of local state and there are sibling components that need it, then we need to lift the state up to allow sibing components to access it. 
              Lifting state up:
                this basicly is move the state declaration from one component to its closest parent component then the state can be passed into all the child components through props
            NOTE: we should always start with local states and only change it global when we really need it
            USE:
              put it in a local component with useState, useReducer, useRef
          Global State:
            we need external libaray to help to organize these
            these are the states that many component in the app need
            it is also called Shared State, which means all the component can access it. 
            USE:
              perferably UI states: this is where we put the state in the Context API do make it accessiable to all the components but we still need useState or useReducer to update the states
              Remote or UI: we can also go for 3rd party libraries to manage global states and remote states
              we can also store the states in the URL to pass between pages
          we can also store the states in localStorage and the browers
        type pf state(base on domain): Remote or UI
          Remote State:
            all the application data that is loaded the remote servers(use an API)
            usually asynchronous and need to refetched and updated
          UI State:
            everything else
            They are usually synchronous and usually stored in the application and will not interact with anything else
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
  Side Effect:
    this is when the React component is interacting with the outside world, in other words this is when the code actually does something
    Where can it Happen?
      1. Event Handler
      2. Effect
        this is an esacpe, because we can do DOM manipulation in effects :)
        by using useEffect()
          this have 2 pass in values(effect function, dependency array)
            effect function:
              is the code that run when the phase is reached, shouldn't be thinking about it this way in lifecycle but in how React is synchronizing the data with the API
              it can also return a an cleanup function(optional):
                Cleanup function is returned from an effect
                it will run on two occasions:
                  1. before the effect execute again
                  2. after a component is unmounted
                WHY?
                  1. we need to clean up the side effect caused by the effect
                  2. to fix Race Conditions, which is when the first HTTP request is not finished and another is fired off
            dependency array:
              By default effect is ran every render
              BUT dependency array can change that.
              Without it React don't know when to run the effects
              this array contains dependences, and whenever one of them changes the effect will be executed
              These DEPENDENCES are all the states and props used in the effect
              so basicly useEffect is just an event lisntener that is waiting for one of the dependences to change
              There are THREE TYPES:
                1. [x, y, z]
                  in this case the effect is executed when it is first mounted and whenever x, y, or z updates
                2. []
                  in this case the effect is executed when it is first mounted
                3. 
                  this this with no array, then it executes everytime there is a re-render and when it is mounted
        with this we can be able to write code that will run during different phases of the component instance lifecycle
        NOTE:
          Effect is run after the browser painted the page
          so that if there are longing task it won't block anything
  Hooks:
    these are special build-in functions allow us to be able to "hook" into React internals
      create and accessing state from Fibre Tree
      registering side effect inside the Fibre Tree
      Manual DOM selections
    These functions all start with use
    this provides us an easy way to reusing non-visual logic by using custom hooks
    this gives function components the ability to own state and run side effects at different lifecycle points(this is only possible with class components before React 16.8)
    MOST USED:
      useState, useEffect, 
      useReducer:
        WHY?
          this can help when there are too many states and used in too many places
        This function take in ([function], [initial state value])
        it returns the state, and a dispatch function
        when the dispatch function is called it recives ([usually and object{type:"dec", payLoad:-1}])
        then the action(the object from dispatch) and the state will be passed into the [function] that is passed into useReducer in the beginning
        that function will recive (state, action)
        This function usually contains a lot of conditions for all possible types in action
          so Switch Case is very common in these functions
        then it will return the new value of the state base on the type
        NOTE:
          usually there will be multiple states, or we wouldn't be using this instead of useState
      State or Reducer?
        single one state?
          Yes:
            useState
          No:
            will the state be updated together a lot?
            are these states related or do they include objects?
            will there be too many eventhandler that makes the components too big and messy?
            If any of these is a concern then we need to ask do we want to write the reducer function?
              Yes:
                useReducer
              No:
                useState

      useContext:

    LESS USED:
      useRef:
        this create a Ref, which is an object with mutatable .current
        Ref's data is also persisted through renders
        USE CASES:
          1. create variables that can keep data between different renders
          2. select and store DOM elements
        NOTE:
          Ref are used to store data that is NOT rendered, usually only appear in event handler and useEffect
          DO NOT read write or read Ref in render logic
          UPDATE is not asynchronous
      useCallBack:
      useMemo:
      useTransition:
      useDeferredValue:
      useLayoutEffect, useDebugValue, useImperativeHandle, useId
    RULES:
      1. hook can be only called at the top level
        this a rule because hooks rely on have them always executed in the same order on every render, so no conditions allowed
        WHY?
          This is because all the state calls are stored in a LinkedList(check LeetCode), which means if one of the state have a condition then the chain will be broken(each Node can only access the next element).
          React is doing this because the hook this way don't need a name, but only a call order to store the values
      2. Hooks can only be called from React functions
        this means that the hooks can only be called from function components and custom hooks
  I need to Reuse:
    UI:
      Components
    Logic:
      does it have any hooks?
        No:
          Regular Function
        Yes:
          Custom Hooks:
            they allow us to Reuse React Logics that contain hooks(non-vitual Hooks)
            The point of Custom Hooks are to make think reusable and portable(even across different Project)
            What is it?
              it is just a javascript function that can recive and return any data
              It have to have one or more React Hooks
              MUST: To make US and React to recognize this as a hook the name have to start with use
  Optimizition:
    1. Prevent wasted Renders
      memoize components with memo
      memoize objects with useMemo
      memoize functions with useCallback
      pass elements as children or regular props
      Wasted Renders:
        REVIEW:
          when does the component render:
            1. when the component state changes
            2. when there is a change in the context that the component is subscribed to
            3. when the parent components re-renders
              NOT when the props change, 
          when the component re-render the DOM doesn't always re-render, so this can be a every wasteful operation that does absolute nothing
        What is it?
          waste renders are renders that does not produce changes in the DOM
        THIS usually is not an issue, because React is very fast
        BUT if a component renders very slow or the render happen too frequently it can be an issue
        How to fix:
          1. if there are slow component inside another component, and it is getting re-rendered when it is not needed to and is slowing down the re-render and we factor everything else out and pass the slow component in as a children
          this way the slow component will not be loaded, when it is not needed to
          BECAUSE the slow component is outside of the re-rendering component so it is loaded before and not effected by the re-render
      Memoization:
        this is an optimization technique that when an function is executed the result will be stored in the Cache, so if we call the function again with te same argument then the function will not be executed again and just take the result from the cache
        memo(const [name] = memo([component])):
          this will make the component not re-render when the parent component re-renders, unless the props changes
          NOTE: 
            it will still re-render when its state changes or when the context it subscibe to changes
            only make sense to memoize the component that is slow to re-render or the once that re-renders very often and have the same props
        useMemo(const [name] = useMemo(function(){[can have calculations]return[object]},[dependency array]))
         and 
        useCallBack(const [name] = useCallBack(function [name](){[things need to be executed]},[dependency array])):
          useMemo, memoize the value
          useCallBack, memoize the entire function and call it when needed
          useCallBack is a special case of useMemo, instead of object it is for functions
          they will memoize objects and functions between render to preserve their value
          it have a dependency array if any value in there change the object or function will also be recreated
          NOTE: state setter function have stable state so they are not recreated on every render, so no need to memoize them or pass them into the dependency array
          USE:
            1. to make memo() work
            2. memoize expensive values so it don't get recalculated everytime
            3. memoize the values that used in dependency array of another hook
      Optimize Context:
        we only need to optimize only when all three are true:
          1. the state in the context need to change all the time
          2. the context have many consumers
          3. the app is slow and laggy
        there are no fix recipe for how to optimize the context only tips
          1. for different sections of the app, have all of them passed in to the provide with children so all of them don't get re-rendered everytime or wrap the less used in memo()
    2. Improve app speed or responsiveness
      useMemo, useCallback, useTransition
    3. Reduce Bundle Size(most important)
      reduce the amount of 3rd-party packages
      use splitting and lazing loading
      Bundle:
        it is the javascript file the contains the entire application code
        it is called this because Webpack or Vite bundled all the codes in the one big bundle that contains everything the application needs
      Bundle Size:
        this is the amount of code user need to download from the server to use the application
        this is the most important thing we need to optimize because it directly effect how long it will take for the user to be able to start to run the app
      Code Splitting and Lazy Loading:
        this is a technique that by splitting the bundle into many different smaller sections and can be downloaded by the user whenever the application needs
        MOST COMMON way to split(Check WorldWise for the format):
          split all the files base on the Route, or on the Page level
          this means spliting the code base on the page

  Routing:
    in web development we match different URLs to different views in the UI
    in React we match the URLs to different components
    these matches between URLs and views are called routes
    these matches are like with links with different subfixes that is matched with each webpage
    THIS only works with client side, server side routing is different
    REACT ROUTER is the external packages most people use to handle Routing in React(routing is another thing React is missing)
    THIS IS ESSENTIAL because all single page application needs it
    NOTE:
      we can store the states that is related to how the UI is display into the URL as UI state
        like:
          open close panel, currently selected list item, list sorting order, applied list filter
        WHY?
          this way the the state stored is global, which can be accessed by all the components
          this way we don't need to create the state in the parent components and pass it through all the child component to reach where it is needed(prop drilling)
          it is also a good way to pass data between pages
          this also allows use to be able to bookmark and share the page with its current value
        HOW to use it?
          path:
            the link that lead to the page
          params: (WorldWise: the city name)
            these information will be passed to the page it is currently in
            they are like parameters of a function
            HOW IT WORKS?
              const {} = useParams();
              useParams() returns an object that contains all the params in the URL
              we can use a value to store it and destructure it
          query string: (WorldWise: the city geolocation)
            they are like information related to the params
            HOW IT WORKS?
              usually named this way
              const [searchParams, setSearchParams] = useSearchParams();
              seachParams is an object with all the data from a query string
      Programmtic Navigation:
        this is when the page automaticly changes the URL without the User clicking on any links
        USUALLY when the user submit a form
  Single Page Application(SPA):
    this is application that is entirely executed on the client side(browers)
    They completely rely on Routing where each URL have a matching page
    How it Works?
      when the user click on special linked create by the router, then the URL change to the one matches new component and this triggers the DOM to be updated to the new components
      IN SPA it is always Javascript(React) that is updating the DOM
    Benefit:
      because it is single page and everything is handled by the javascript, so there will be no hard reload that is caused by change between different web pages
      so it feel just like a native app
  Styling in React:
    1. inline CSS that only apply to the element it is added to
    2. external global CSS or SCSS, then we add the className to the JSX
      BUT this can cause a lot of problems in big projects, 
        1. if someone change the style of the class we won't know what will be effected
        2. if someone add a new class with the same name things become chaotic
    3. CSS Modules, they are a external CSS file designed for each file
      CHECK THE WorldWise APP for the format
      Benefit:
        this fits the seperation of concerns of React by having CSS and Javascript seperated
        this also allows the component to be more reusable
    4. CSS in JS:
      this is when we are writing CSS in a .js file, which is the same file the components are defined
      This follows the React philosophy what everything defines a component are in one file
    5. Utility first CSS framework:
      Like tailwindcss
        which we can use to do CSS without leaving the JSX Markup
    6. Or we can choose the option of not using CSS at all.....
      we can use UI libraries, like MUI, Chakra UI, Mantine
  Context API: (Atomic-Blog for template)
    WHAT IS IT?
      this is a system to pass data throughout the app without manually passing the props down the tree
      this allows us to "broadcast" global state to the entire app
    PARTS:
      1. Provider: 
        this React component that gives all the children components access to a "value"
        it can be placed anywere, but usually in the top of the tree
        HOW?
          the name start wil upper case because it is also a component, which also means it need to be create outside the App Component
          const PostContext = createContext();
      2. "value":
        this is the data that we want to make available
        this value is passed into the Provider
        USUALLY contains some states and setter functions
        HOW?
          to provide the value to the child components we need to do this
          <PostContext.Provider value={[an object that contains all the values that we need to pass to the child components]}>
      3. Consumers:
        they are all the components that read the value we passed into the Provider
        HOW?
          with destructuring we can take out the values we need
          const {} = useContext([the Provide])
      NOTE:
        what happens when the value updates?
          all the Consumers will be re-rendered
    SOLVING PROBLEMS:
      1. prop drilling
        Context API allows use to pass state from the parent component directly to the next children components, without prop drilling
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
  NOTE:
    capturing phase, bubbling phase and event delegation is also here
    we just don't use it a lot in React
    BUT React do delegation for all the onClick handler
    beause React bundles all the eventHandles together and stores in the #root
    React ALSO add a thin layer of SyntheticEvent around the normal Javascript Event
    this adds some improvements and changes
    like making focus, blur, change event bubble

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
  this way React in development can help to check for errors
  this will not run all component twice when published

Debugging:
  if the app is not updating
    1. check if the app is running or not
    2. restart the app

Create React App:
  Create React App:
    npx create-react-app [file name]
*/
