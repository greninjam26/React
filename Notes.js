/* History
Old Websites(server-side rendering, more in Next.js section)(php, WordPress, Next.js):
  before 2010, all the website are all server-side rendering
  this means all the HTML, CSS, and javascript codes are all loaded on the server
  because there are no a lot of code in javascript, so it works
  1. the website is generated on a web server, then the server send the generated website to the client when it is requested
  Pros: 
    1. the initial page loads are very fast
      1. the client don't need to download any javascript at all, it only need to load the HTML for the web page
      2. the data is fetched before the HTML is even send to the client, the data will be incorperated into the page when it arrives on the client side
    2. SEO(search engine optimization):
      this makes the content easier for search engines to index
  Cons: less interactive
    when switching between pages, we might need to download all the information needed and full page reload are necessary. 
    BUT framework like Next.js are bluring the lines
      they allow developper to create server side rendered pages, that can hydrate on the client side later
  Uses:
    1. content-driven websites or app where SEO is very important and they are essential in trying to get client to the website, like E-commerce, blogs, news, marketing websites, etc.
  Two types:
    Static: the HTML is only generated once when the developper upload it
    Dynamic: the HTML is generated at each request, it is good when the data changes often. (some people consider this as the only true SSR)
  Typical Timeline:
    1. the client requests the page
    2. the server fetches the data
    3. the server renders the page the client requested
    4. the HTML, CSS, javascript and related informations are send to the client
    5. the page is displayed
    NOTE: this is where the Content Paint happenes, also the First Paint
    6. since an javascript bundle is still send to the client, the client side will process the javascript and through the process of Hydrate to make the page interactive. 
  Hydrate: in the case of a React App(this is only an overview on how Hydrate works, it is not exactly how it works in Next.js, especially with the new App Router)
    it adds back the interactivity and event handlers that is lost during the server-side rendering
    why?: 
      we need this because server side rendering removes all the interactivity a React App have and only returns the HTML to send to the client to be rendered. 
      NAME:
        the "dried" HTML is hydrated with the "water" of interactivity and event handlers
    How it work?:
      1. the Javascript bundle is also downloaded from the original React component tree
      2. then compare the DOM tree is the component tree
      3. if it is the exact same, it save the time that needs to create new components. Hydrate just try to adopt the existing DOM. 
      4. it just try to finish the SSR process and get the client side to the same as the original React component tree
      NOTE: when the client side DOM tree does not match the React component tree, after hydration the page is going to change, this can result hydration error. Normally is the trees match, the hydrate process only take a few seconds. 
        Common hydration errors causes:
          1. incorrect nesting of HTML element, like using a <div> in a <p>
          2. the data used to render in the server are different from the data used in rendering in the client
          3. using variables that only exist in browsers, like window or LocalStorage. 
          4. incorrect use of side effects
          5. etc.

New Way(client-side rendering)(React, etc.):
  1. HTML is rendered on the client using Javascript
  Cons: 
    1. the initial load of the page is slow
      1. the javascript buddle need to be completely downloaded before the web page can load
      2. the data can only be fetched after the components are mounted(after the client renders it)
    2. if SEO is a concern:
      since everything is fetched and downloaded later, search engines might find a blank page when indexing(this is getting better though, but is SEO is super important we need server-side rendering)
    NOTE: request waterfall: the main complains about client-side rendering
  Pros: it is highly interactive 
    all the code are downloaded, except some data
  Uses:
    1. when we want to create highly interactive single page applications
    2. when SEO doesn't matter at all, like the wild oasis app, it is an internal application for the company employees or it is locked behind an login, or both.
  Typical Timeline:
    1. the client make a request
    2. the server only have a empty page with some CSS and the javascript bundle attached to it. The server will send these information for the client that made the request
    3. when the javascript bundle is downloaded, the app notices that it need additional data. 
    4. then the app will display a spinner 
    NOTE: First paint(FCP): this is when the app first display something
    5. while the data is being fetched from the server, like an API endpoint. This server can be different from where the page came from. 
    6. when the data arrives, the app will re-render itself with the new data. 
    NOTE: This is where we can say we had the initial page load, metric of Largest Contentful Paint(LCP) or content paint for short. 

  
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
*/
/* React:
  With React we don't need to have a html file controlling everything, all the code can be in javascript
  What it is:
    Extremely Popular:
      Most used framework on npm
      Examples:
        npm i react-icons
        React-Router
        Redux
        Tailwind
        Styled-Components
        format date: 
          npm i date-fns
        pop up messages:
          npm i react-hot-toast
        handle form submition: 
          npm i react-hook-form
        making charts:
          npm i recharts
        Checking Rendering Errors:
          npm i react-error-boundary
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
  Reusability: 
    what to reuse:
      UI: we use components and props(as an API for the component to let us customize the component, by using children props we can pass in content and other components)
      Stateful logic(Logic with at least one react hooks): we can write our own custom hooks, which can contain many different other hooks.
    what if we need to reuse both of them at the same time?
      Advanced React Patterns: they are pattens, which means that they are not build into react they are just a way to use react that people summarized over time. 
        Render Props Pattern(this was very popular before we can reuse stateful logic with custom hooks):
          this allows the user of the component to have complete control over that the component is rendering by passing in a function as a prop. 
          This function telling the component what and how to render. 
          Purpose:
            this allows the component to not only have some JSX attached to it, but also receive more JSX.
          How to Use:
            passing in a props called render, which is a function that tells the component what to render and how to render it. This function is a list of instruction of how the component should render things. 
            In Other Words: instead of having the function that renders the information in the component, we pass in a function that handle the render instead. This way we can make the component display the same style of information in many different ways. This way we don't need to pass in all the information regarding the information that is being rendered. The information is not in the component so we can't just pass in the JSX as a children props. 
            Example: 
              render={(product) => (
                <ProductItem key={product.productName} product={product} />
              )}
            When we can't use the children props to pass in JSX, and we need to give the component a description on how to render, then we use this render props
        Compound Component Pattern: 
          Compound means that we'll have multiiple components together to create one super component. 
          this allows the component to be self sustained without need to the parent component to manage the states, the super component can do that itself. 
          What it is:
            it is a set of related components that work together to archieve a common and useful task. 
            like counter, modal window, etc.
          How to use: check the folder for the example code
            1. create the context
            2. create the parent component
            3. create child components to help to complete this task
            4. add the child components as properties to the parent component
        a lot more....
        Higher-Order Components(HOC)(Not very important):
          No one really write them by hand anymore...
          what it is:
            this is just a component that take in another component and return a better version of it
          Common Sense:
            name: with[the function that is added]
            pass in: the function that is being added to the component
            return: a new component with the new functionality
          How it works:
            in the middle there will be the component that we passed in with its props spread then with the new props add in. 
            like:
              <WrappedComponent {...props} items={displayItems} />
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
            usually asynchronous and need to re-fetched and updated
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
              These DEPENDENCES are all the states, props, context values, and reactive values used in the effect
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
    React Router Loader:
      the loaders are function we create that can fetches data from an API
      We then add the Loader to an Route, when the code reach the route the loader will be executed
      STEPS:
        1. create the loader(fast-react-pizza : Menu.jsx )
        2. provide the loader(App.jsx)
        3. provide data to the page(useLoaderData(), detail in Menu.jsx)
      Convention:
        Loaders for the page is created inside the file for the page
        also name the function loader()
    React Router Actions:
      instead of loader, we can also create action functions and connect it to the Route
      this allows us to be able to create actions base on the data from the page
      LIKE: the form(CreateOrder.jsx):
        this way we don't need to create all the states for each input and selector field. 
        this allows us go back to how HTML reads and submit the form without all the state changes
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
  React Portal(Not part of React, it is part of React DOM):
    What it is:
      a feature that essentially let us to to render an element outside the parent component's DOM structure, while still keeping the element in the original position in the component tree. 
      In other words: we can render any component whereever we want, but still have it in the same position in the component tree so that the props still works normally. 
    What is it used in:
      this is good for those components that we want to still on top of other components, like Modal Windows, Tool Tips, Menus, etc.
    Why:
      this is to take the component out from the parent to avoid the situation where the parent have overflow set to hidden and cut off the component. 
      basicly for safty

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

Project Planning:
  1. gather all the requirement and features of the application
  2. divide the application into pages with these informations
    Think about the overall and page-level UI
    Break the desired UI into components
    if we want we can design and build a state version
  3. divide the application and its features into different feature categories
    for each categories we need to think about the state managment and data flow
  4. which libraries we are going to use?
*/
/* Redux(check redux-intro for format):
What is it?
  it is an 3rd party library that is used to manage global state in a web application
  it is very easy to connect to React with react-redux
  the structure of Redux is very similar to useReducer
  NOTE: historically Redux are used in basicly all the React applications, but now there are so many alternatives, Redux is not used much any more unless the app need a lot of global UI state that need to update frequencly
  There are 2 different versions of Redux:
    1. Classic Redux
    2. Modern Redux Toolkit(@reduxjs/toolkit)
      Redux Team want people to use this over classic Redux because it is an opinionated approach that reinforces the Redux best practices the community learned over the years
      Benefit?
        1. this allows use to write less code to archieve the same result
        2. we can write code that "mutates" the state inside the reducer, BUT it will be converted to immutable logic behind the scene by "Immer" library
        3. action creators will automaticly be create from the reducers
        4. thunk and devetools will be automaticly setup
    NOTE: we can mix these two methods together, they are compatiable
How it works:
  instead of a reducer, Redux have a store
  this store is where all the global states lives
  there is also one or more reducers in the store
  these reducers are the same as the reducer functions in useReducer
  they will use the current state and the action to calculate the next state
  the reason for multiple reducers in this is because we need one reducer per app feature
  USUALLY we use Action Creator Functions to automate the process of creating an action
Steps:
  1. call the action creator to create the action
  2. dispatch the action through the dispatch function
  3. the action will be pass to the store and the corresponding reducer will update the state
  4. the DOM will be updated in response of the state change
GOAL: make the state update logic seperate from the application logic
Connect Component to Redux: 
  check BalanceDisplay.js for the old way of doing things
NOTE:
  asynchronous operations like API calls can't be inside the reducers in the store, because they need to be pure functions
  SO should we fetch the data then do the dispatch call?
    NO because ususally we want to keep the components clean of API calls
    we also want to keep all the fetching calls encapsolated in a central place and not scatter all over the place in the application
  THEN where would we do API calls?
    MIDDLEWARE:
      this is a function sits between dispatching the action and the store
      it gives us the ability to run codes after they have been dispatched and before reaching the store
      NOTE: we can write this ourselves BUT we usually use a thrid party library
        the most popular one with Redux is call Redux Thunks
      How it is used?(Redux-intro: store.js and AccountSlice.js)
        1. install in the middleware package
        2. apply the middleware to the store
        3. use the middleware in the action creator functions
    Redux Thunks:
      What is it?
        1. the action go into the Thunk and some asynchronous code is executed(data fetching)
        2. (data fetching) when the data arrives it is stored in action.payLoad
        3. the action is passed into the store and state is updated
NPM packages:
  redux
  react-redux
  redux-thunk
  redux-devtools-extension
*/
/* Tailwind:
What is it?
  A utility-first CSS framework packed with utility classes like flex, text-center and rotate-90 that can be composed to build any design, directly in the markup(HTML, JSX)
Utility-first CSS(or Atomic CSS) approach:
  this is when we write a lot of small classes that have one single purpose, then combine them together to build the entire layout
NOTE: Tailwind did not invent this approach, they just made it very popular by making this framework
USE:
  we will not be writting any of this small classes, but we will be using all the hundreds of small classes tailwind already made to build any layout we want
PRO: 
  1. we don't need to worry about classNames ever again
  2. we don't need to jump between files when writing style and markup
  3. we can easier understand any styling in application that use tailwind
  4. Tailwind already made many good design decisions for us, this we can build more consistant and better looking UIs
  5. we can save a lot of time by writing less CSS and build responsive design very fast
  6. Tailwind's documetation and VSCode integration are the top of the class
CONS:
  1. with all the classes, Tailwind make the markup a mess and sometimes even unreadable(BUT you'll get use to it)
  2. we need to relearn everything by learning all the class names in Tailwind(BUT you'll memorize it in a few days)
  3. we need to install and set it up everytime we need it in a project
  4. You are giving up on Vanilla CSS
SetUp(Tailwind Official Website: Installation Tab: this is for Vite)(or the fast-react-pizza project):
  1. npm intall...(check official website)
  2. npx tailwindcss init -p
  this create the config files
  3. In the tailwind.config.js file, change content:[] to content:[things....(check the offical website)]
  4. install tailwind prettier extension from the github and add the config file
Responsive Design:
  Tailwind is mobile first, which means we need to design the application from smaller screen to large.
  All the default breakpoints iwth media query are min-width
*/
/* Styled Components(the-wild-oasis)
they allow us to recreate html element as react components with css styles added to it
benefit:
  the styled components are only scoped to the component it is in
  this eliminate the problem with global css
  DON'T need to pass in props that handle them with these styled components
Javascript Logic:
  becuase the styles are in `` so with ${} we can use javascript logic to conditionally apply styles
  we can also do this with a variable and store the style in the variable as ``
  BUT the extension will not work unless we do css``
  AND without "css" function something just don't work with `` in the variable
intall:
  npm i styled-components

*/
/* Supabase
What is it?
  a service that allows developers to earily create a back-end with Postgres database
  it will automaticly create a database and a matching API so we can easily request and receive data from the server
  NO need to deal with backend development
  it also includes user authentication and file storage
*/
/* React Query (now known as: TanStack Query)
What is it?
  a very powerful library for managing remote state what is stored in a server
  it will be able to allow us to fetch data from APIs with a lot less code
  it also can manage those data obtained from the fetch
  it will also make the user experience of our app much better
Features:
  1. data is stored in the cache and can be reused in different plances in our applicaiton, this way we don't need to run the same fetch request multiple times throughout the app
  2. it will also provide loading and error states so we can handle them
  3. it will also re-fetch the data when needed to keep the states synched
  4. it will also pre-fetch the data that will be needed for the next page, this way the loading spinners can be avoided
  5. it is very easy to mutate or update the remote states through many tools build into react quary
  6. loaded data can be still displaced while the user is offline
Why?
  because remote states are asynchronous and shared by many different users, which make it hard to keep everything in synch with the data in the remote server. 
  this is why we use libraries like:
    React Query(best and most popular option)
    SWR
    Redux Toolkit query
Install:
  npm i @tanstack/react-query
  devtool(need to have the same version as react-query):
    npm i @tanstack/react-query-devtools
How to use:
  1. create this go override the default setting of React Query
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
        // this is the time that it will take for the data to go stale, then React Query will automaticly re-fetch the data when we leave and re-enter the tab
        // with it at 0, this means data will always be automaticly re-fetch when we switch tabs. 
          staleTime: 0,
        },
      },
    });
  2. this will allow everything in App to be able to use React Query
    <QueryClientProvider client={queryClient}>
    // this adds the devtool
      <ReactQueryDevtools initialIsOpen={false} />
      <App/>
    </QueryClientProvider>
  3. this is how data is fetched with React Query
  we can destructure the data returned from useQuery() and only use the ones we need
    const {} = useQuery({
      // this is an unique key that identifies the query
      queryKey: ["cabin"],
      // this function will be doing the fetching of the data and need to return a promise
      queryFn: getCabins,
    });
  4. how to mutate the data in the API
    const { isLoading, mutate } = useMutation({
      // this is the function that is called when the mutate function is call
      mutationFn: deleteCabin,
    });
*/
/* Next.js
Back Story:
  is it a blend of server side rendering and client side rendering to obtain the bext of both world. Frameworks like Next.js and Remix are improvements from old php and WordPress, and also using the modern client side rendering methods like React, Angular, Svelte, Vue
What is it?
  it is a meta-framework that is build on top of React
    Meta: if we consider React as a framework, Next.js is just building on top of it
  It adds a set of conventions and good practices that all real world apps needs, like routing, data fetching, etc.
  It allows as to build complex full-stack web apps and sites
Benefit:
  even though with a framework, it limits us to the the options of the creator of Next.js, Vercel. But this allows developer work better in teams and not worry about different practices. 
  This framework also allows us to use cutting-edge React features that normal it is really hard to use without an framework
Key Features:
  1. Server Side Rendering:
    we can select for each route wether we want it to be dymanic or static
  2. Buildin routers
    it comes with 2 routers out of the box
    to create a new route we don't need to write a single line of code, we just need to create a new folder and follow the folders structure of Next.js
    Two Routers:
      1. APP Router(Modern):
        1. introduced in Next.js 13.4(2023) and now is the recommend way to start a project
          this implements React's full-stack architechture
            Server Components, Server Actions, Streaming, they only work with APP Router
        2. it allows are very complicated routing patterns, like paralell routing
        3. Server components makes the developer Experience and User experience much better 
        4. BUT the aggressive caching make things very complicated and confusing and often do things we don't want(version 14)(maybe changed in the future, maybe in 16)
        5. the learn curve is steep but at least it is mostly React features
      2. PAGES Router(LEGACY):
        1. the router in the very beginning since version 1 in 2016
          it is simple and easy to learn but it have its drawbacks, this is why the APP Router is implemented. 
          this is still supported though
        2. Drawbacks:
          Simple things like layouts are confusing to implement(APP Router makes it very easy)
          Data fetching have to be done through Next.js specific APIs (APP Router can just use fetch())
  3. Data fetching and mutation in the server
    it also allow us to be able to create Server Components and doing mutation in Server Actions. 
    this is a fundamental change from React, which have everything on the client
  4. Optimization
    it provides a host of optimizations for webs or apps when optimizations are super important. 
How to Use:
  create a new project npx create-next-app@latest [name]
  Routes:
    we just need to create a folder and by convention have a page.js file to export a react component
  we just need a layout.js in the app folder to create connections between pages and the main layout
  in the app folder, the loading.js is a spinner that will apply to all pages in the app folder, no matter all nested it is. This is uses the process of Streaming. 
  we can just have error.js in the app folder to handle error display, BUT the component have to be Client Component, stuff in callback function won't be catched, only rendering errors. 
    IMPORTANT: errors in the root layout won't be catched, we can do a Global Layout to deal with it somehow
  For not found errors, we create a file call not-found.js
    we can also manually call the notFound function to trigger not-found.js

  just have icon.[] file will make it the icon for the website
  metadata in the layout and be overwriten by the ones in page, we can also use generateMetadata() to fetch other information for the metadata. 
  we don't need to manually instead google font or any font we want, just by import it. 
  <Image/> will auto optimize images(check Logo.js in the Wild Oasis website for more info)
    1. server then at the correct size and file size
    2. preventing layout shifts by forcing the image to have a set width and height
    3. lazy load the images
  in the .env.local file we can store variables we can access using Next.js with process.env.[variable name]
    for the variable we can access in the server we need NEXT_PUBLIC_ as the prefix of the variable name
  Dynamic Routes:
    there are Routes that depend on a variable that have a lot of varities, like a page basic on a person's id. 
    Instead of a create a folder for each person to create a route
    we create a folder with the name "[[the id]]", i.e. [the id] with a [] outside of it
    the page in this folder get access to a prop, named params, which contain that value of [the id]
    we can stop these pages from becoming dynamic routes by using a function called generateStaticParams in the page.js. 
    this way we can get all the possible ids and return an array of all possible ids in this formate: 
      { [id name]: String([the id]) }

  We can mimick the production envirment to test out caching with npm run "next build && next start"
    it don't live update the changes though, we need to restart the production server

  We can implement a API endpoint by create a route.js in a folder(route)
  NOTE: route.js will conflict with page.js, so in each folder there can be only one of them
  this is because we can't send HTML and JSON data at the same time
  Benefit:
    we can allow others to access the data in the application or database in a custom way without worrying about important KEY or information from the original data source being leaked
    this is a nice to use abstraction to let others to access the data. 
  NOTE: the function name have to be the HTTP Verbs, like GET, POST, etc.

  NEXTAUTH_SECRET use https://generate-secret.vercel.app/32

React Server Component(this is purely React):
  NOTE:
    React Server Components(RSC) are the name of the new React paradigm
    Server Components(page.js always needs to be server components): 
      they are incharge of the UI that is a function of data changing over time
      the components that only render in the server and have no interactivity what so ever. 
      they don't need any javascript in the bundle to work at all. 
      This also allows us to build the back-end of the app with React. 
      1. this is the default component in the RSC module
      2. can't be stateful and can't have any hook what so ever
      3. can't life state up, since it can't have state in the first place
      4. we can pass props between server components and even between server and client component, which is a very important way to pass data between server and client components. 
        BUT the props that pass between server and client components must be serializable, which mean they need to be easily convert to a format that can be easily send from the server to the client. This makes props like function and class not possible, they are not serializable. 
      5. we can just do async/await in the top level code of a server component(this won't work for client components), then pass it to the client components with props
      6. we can import both client and server components
      7. we can also render both client and server components
      8. re-renders everytime that the URL changes and might re-fetch the data too. 
      EXAMPLES:
        In a async component
        when the page is loaded, it takes sometime to fetch the data in the server then send to the client
        but once it is done then it will be cached in the browser
          const res = await fetch("https://jsonplaceholder.typicode.com/users");
          const data = await res.json();
        since this is a server component, so the console.log result show up in the terminal and not in the console of the website
          console.log(data);
    Client Components:
      They are incharge of the UI that is a function of state changing over time
      the components that is client side to make the app interactive
      1. we need to opt in with "use client" at the top of the module
      2. we can have states and hooks, since these are the components that are interactive
      3. lifting state up
      4. we can pass Props around. 
      5. we can still use libraries, like React Query, to fetch data. it is still an option even if we got server components
      6. we can only important client components, since once the server-client boundry is crossed, there are no way back. 
      7. but we can render both server and client components, as long as the server components are passed as props
      8. these components will re-render when their own or their parent states changes
    IMPORTANT:
      RSC is not active in a regular React Apps, like Vite apps. RSC need to be implemented by a framework for it to work, like the App Router of Next.js. Only when a framework adopt these features, then we can be able to use them. 
      1. Server Components are the default in apps that uses RSC architecture, like Next.js
      2. if we want to use Client Components, we need to specify a component is a client component with "use client"
        the child components of Client Components don't need "use client" again.
          The reason for this is because "use client" don't mark the a Client Component, it creates a Server-Client Boundry and form a Client sub tree for the current component and all of its child components. 
    Example for the difference check the images
  The Server Client Boundary:
    Traditional React:
      The Server is like a Node.js API run in the back
      The Client is where the front end application is ran
      1. communication happen with API
      2. data is passed in the format of JSON
      3. onces the JSON arrive from the backend, the frontend take over to render the data and the backend is no longer needed
      4. usually though backend is still needed so that the frontend and make mutations to change the data
    Next.js with RSC and SA:
      The Front-End: the Client Components
      The Back-End: the Server Components
      1. the Front-End and Back-End are not really seperated anymore, there is no clear seperation
      2. "Knitting": this is a pattern that the Server and Client codes are interweaved together
      3. this allows us to build true full0stack application all in one codebase
      4. This makes it so that we don't need to build APIs to communicate between front-end and back-end anymore. 
      5. for sending data, we can just fetch and render the data in the server component or pass it onto a client component
      6. instead of mutations we have Server Actions to change the data in the server components from the client components
    NOTE(check the images for detailed diagram):
      Rendering: 
        1. the Component Tree is showing what components each component will be rendering. 
        2. Client Components can render Server Components, as long as the Server Component is passed in as props
      Importing(this is where the real Client and Server Boundary is at): 
        1. there is a Dependency Tree that shows what components each components needs to import
        2. BUT Client Component can only import Client Components
      IMPORTANT:
        all the components are default Server Components
        so when they are called it will result in a Server Component Instance
        BUT if they are called by a Client Component
        it will result in a Client Component Instance
        SO in the trees, there can be Server Component Instance and Client Component Instance versions of the same component. 
  Why:
    In a React Application, let's think the UI is a function of state(fetched data is here too) changing over time.
      100% client side:
        the state keeps changing and the app keep re-rendering to show different part of the UI and Layout 
        Pros:
          1. it is very interactive
          2. everything is in components
        Cons:
          1. it require a lot of JS to be downloaded
          2. client-server data waterfall
            this is when multiple components need to fetch data one after another on the same page, whcih means the components are depended on the data fetch by another component. This is a huge problem for 100% client-side application
      100% server side(like the old php):
        instead of states changing over time, this is data changing over time
        Cons:
          there are no component what so ever
        Pros:
          1. it is very fast at fetching all data
          2. the code are really close to the data all in the server, even if they are in different servers, we don't need to create APIs to connect the client to the server
          3. there is no need to send any Javascript at all
      What if we can take the best of both world?
      What if the UI is the change of state and data over time?
      What if there is a gradient and everything is not just client or server?
      What if we want the app it be interactive and close to the data with no javascript shipped?
        the answer is a completely new React paradigm: React Server Component(RSC)
  What is it?
    1. it is a full-stack architechture for React apps
    2. the component tree are extending up to the server and bridging the cap between server and client to incorperate the server as an integral part of the component tree. 
    3. the way that the gap is bridged is by using server components
    4. this allows us to write frontend and backend code next to each other in a way that is natural like a regular React app. 
  Compare(this is not how they works, just a simple model):
    "Traditional" React:
      1. there are components
      2. they will render a view
      3. when user interact with the view the states changes
      4. the components re-renders when the states changes
      5. this generate a new view
      6. the components can also fetch data
      7. when the data changes -> (4)(5)
    React with RSC:
      1. there are Client Components
      2. they will render a view
      3. when user interact with the view the states changes
      4. the Client Components re-renders when the states changes
      5. this generate a new view
    ->6. there are Server Components now
      7. they can help with render the view
      8. they will also fetch data
      9. the data can be pass to Client Components in the form of props, which act as a bridge, or be used in rendering the view
      10. when the user's interaction changes the URL
      11. the Server Components will re-render
      12. then more data might be fetched and the props and view will also be affected
  Pros: 
    1. this allows us to be able to write both the frontend and backend with only components and some Server Actions as mutations
    2. This allows as to write full-stack application with React Components and use one codebase for front and back end
    3. we don't need to worry about creating APIs when fetching data, since Server Components can just access the server. This also eliminate the worry about API keys when accessing API. 
    4. this also elimiate the client-server waterfall by fetching all the data at once then pass, or Stream, them to the client(not specific components). 
    5. "disapearing code": they are just server components, since they don't need to add any javascript to the bundle, so that can import huge libraries without impacting performance. i.e. they are "for free"
  Cons:
    1. makes React more complex and more thing to understand
    2. Things like Context API don't work
    3. we need to make more decision about wether to use server or client component or where to fetch the data(server or client)
    4. if we are making a mobile app and not just on the web, we need to make an API even if we don't need it for data fetching
    5. A LOT OF PEOPLE DON'T LIKE THIS: it only work in a framework, From Vite App and implement RSC ourselves are not viable, it is just too complex. 
  How does it work?
    "Traditional React":
      1. there are components
      2. when we compose the User Interface(UI), we end up with a tree of components instances(the Component Tree)
      3. Then we render the tree
        Render in React:
          1. Call each of the component function that matches the components instance. 
          2. These function will return a Javascript object that contain the information needed to the create the DOM element. 
          3. all these objects then form a React Element Tree(the Virtual DOM)
          4. this Virtual DOM will then be commited to the real DOM and form the web page we can see. 
    RSC: when there are a tree that have both server and client components
      NOTE: the server and client mentioned is really the React Server and React Client, which is different from the not server and client
      1. the server component instances are rendered on the server, which result in a React Element matching each instance. 
        1. this process will result in all the code for the server component instances to disapear, since the React Element is a Javascript object that contains the information needed to DOM elements. 
        2. this is also the reason why we can't have state or hooks in server components, all the code will disappear and since the object need to be serialization to be able to send to the client function and classes will be not possible to store. 
      2. the client component instances will not be rendered on the server but there will be placeholders create for them. 
        These placeholders, or "Holes", will contain the necessary information that needed to render the client components. 
          1. the serialized props that need to passed from the server component to the client component
          2. the URL that will lead to the script that contain the code needed to render the client component
            the URL is powered by the bundler in the framework, without a bundle it is near impossible for us to do this with normal React, which is why that Server Components only work with a framework
      3. RSC Payload is the name of this tree that contains rendered server components and "Holes" for client components
        1. it is a json like structure that the React Team developped to make it easier to stream from the server to the client
      4. this Payload is what will be send to the client, and the "Holes" will be patched with React Elements of the client components when they are rendered on the client
      5. this result in the complete Virtual DOM
      NOTES:
        Why do we need the RSC Payload and not just send html over?
          1. React want UI to be a function of data changing over time, so the Payload will act as the data and we don't want the UI to be based on HTML
          2. When the Server Components are re-rendered, we can just update the Payload then pass it to the client and incoperate into the existing Virtual DOM
          3. this can also preserve the UI state, BUT if we only pass HTML around, the state will be lost and cause a pretty hectic User Experience. 
        These steps of rendering don't always wait for one another, they can happen simultaneously. 
        UI is more like a function of data changing over time, then a function of state changing over time, like UI = f(data)(state)
    SSR(dynamic, HTML generated at runtime):
      1. the server recieve a request
      2. the Component tree is rendered to the virtual DOM as HTML ready to be shipped to the client
      3. the React bundle, which contain React and the component tree will also need to be send to the client's browser, with streaming this bundle can be many chunks to send over seperatly whenever the client needs them. (When combined with RSC, these are the RSC Payload)
      4. Then the HTML will be hydrated
      5. then we get an interactive react app
    NOTE:
      RSC and SSR and completely different thing, RSC is not here to replace SSR, BUT it is here to complement it and make it better. 
      we need a framework, like Next.js, to combine them and make them work together
      When RSC and SSR work together, both Server and Client components are render on the server then send to the client. 
      Why would Client Components be rendered on the Server?
      Isn't the server only for Server Components?
        the SERVER in RSC and SSR are not the same!!!!(well, they can be the same, like after the first time SSR is executed and the React App is just reacting to client's change)
        RSC: it is React server and client, they are just 2 different part of this architecture
          Technically, we don't need a web server for RSC, the React server can just be the "developer's computer". we can only build the Server Components once at built time. 
          Similarly, React Client don't need to be a browser
        SSR: it is web server and client
        SO in reality the React server and client are in the web server
Suspense:
  What is it?
    it is a build-in React Component that will catch/isolate component or subtrees, which are doing some async actions, that are not ready to be rendered yet
    it is like the catch in the try/catch block but instead of catching errors, it catches components that are not ready to be rendered
  What can cause a component to be suspending in the first place?
    1. fetching data with libraries that support suspense, like React Query, Next.js
    2. loading code with React's lazy loading
  How to use?
    we just wrap the components(doing async work) that needs it in a suspense component
  How it works?
    1. suspending components are found during rendering
    2. move back to the closeest suspense parent, which is also known as the "Suspense Boundary", it is a boundary since it seperates the suspending sub tree from the rest of the app
    3. it discard the entire sub tree no matter it is rendered or not and display a fallback component, ususally a spinner
    4. when the async work is done, the sub tree will be rendered again
    NOTE: just doing async/await will not trigger suspense and manually triggering it is extremelly complicated. This is why we leave it to libraries
    FIBRE TREE is the thing that allows suspense to be possible in the first place
  In fibre tree:
    there are a build-in component, Activity, that will not show up in the component tree. 
    it is between the suspense component and the suspensing sub tree
    at the start, Activity is set to "visible", so that the Spinner attached to Activity will not be displaied and the sub tree can be seen
    when the sub tree is suspending, the Activity is set to "hidden", when the Sinner will replace the sub tree
    When the sub tree is finished, the Activity is set back to "visible" and the new sub tree is shown. 
    If the sub tree suspend again, this process will repeat. 
    NOTE:
      since the components are in the fibre tree and just hidden
      all states are preserved through this process
    IMPORTANT:
      this process will not be triggered if the Suspense trigger is wrapped in a transition. 
      BUT all page navigations in Next.js are wrapped in a transition...
      SO we need to pass in a key props to reset the suspense buondary
  How does Suspense know wether a child component is suspending?
  usually child component don't talk to the parent component...
    on a high level:
      the child component throws a Promise to notify the closest Suspense Component. 
      it is quit complicate, which is the reason why we need libraries to deal with it
Rendering in Next.js:
  1. the rendering is done by React with RSC and SSR
  2. on the initial render both the Server and Client Components are rendered in the server
  3. the renders are split by routes, we can customize each route
  4. static or dynamic rendering is not lock to the entire app, we can do some route static and otehrs dynamic
  5. there is also another way of rendering that combine static and dynamic, which is called Partial Pre-Rendering
    Partial Pre-Rendering(still in experimental stage for Next.js):
      What happen if only the user in the navigation is dynamic and the rest of the page can be static?
        before the entire page will be dynamic because the top level navigation need to be dynamic
      SO this is just combining the best of both world between 100% static and dynamic rendering. 
      How it work?
        1. shell: a static version of the entire page is generated but also leaves holes for the dynamic components, is server to the client from CDN. 
        2. the rendered dynamic content of the page streams in as it is rendered on the server. 
      SO this makes the pages deliver much faster even if there are smaller dynamic part to the page. 
      How to use?
        we need to turn it on in the config file
        The dynamic parts of the route need to be place in a suspense boundary
        no need extra APIs
        the REASON for Suspense is that it can block off the dynamic parts from the rest of the route 
  Static Rendering:
    1. the HTML is generated at built time, which mean it is triggered by the developper
    Incremental Static Rengeneration(ISR):
      which just a way of saying that a route can be periodically re-rendered in the background. 
      By re-fetching the data from time to time, after a set interval has passed. 
    2. This is useful when the data don't change often and the page doesn't depend on the user
    3. all the routes in Next.js are default staticly rendered
      the static pages are much faster than dynamic ones, since they don't need to be regenerated everytime it is requested
    4. when we deploy Next.js to Vercel all the static routes will be automatically hosted on a Content Delivery Network(CDN)
      CDN: this is network of servers located around the world that will cache and deliver a website's static content to the client with the server that is physically closest to the client. 
    NOTE:
      if the entire site have no any user personalized data, the entire site can be static, which will be exported as a Static Site in a process of Static Site Generation(SSG)
        we can export a Next.js project as a Static Site by adding output:"export" in nextConfig in next.config.mjs. 
        then just do the normal npm run build
        BUT if there are any dynamic routes, errors happen
        BENEFIT: if it is outputed as a Static Site, we don't have to use Vercel or worry about things would get complicated with other site, the folder outputed works anywhere. 
        BUT images with <Image/> from next do have problems without server to optimize it though. 
  Dynamic Rendering:
    1. HTML is generated at request time, which mean whenever it is requested
    2. this are for pages that data changes often or personalized to the user
      or the page depend on the request, like the page URL and stuff
    3. But there are certain conditions will make Next.js to switch a route to dynamic rendering
    4. all the Dynamic Routes will become a serverless function
      Serverless Computing Model:
        this allows us to run application code, usually backend code, without managing the server ourselves.
        we can just run a single function, Serverless Functions, on cloud providers, like Vercel. 
        the server is only initialzed and running for the duration that the serverless function is running. 
        SO the backend is not like the usual one big Node.js server. 
        Vercel will handle everything, and if one function need more resources, it will be allocated to it to help. 
      The "edge": "as close as possible to the user"
        CDN is part of an "edge" network
        Serverless "Edge" Computing(like a CDN for running code):
          this is when the Serverless Functions don't run on a big central server but on a network that is distributed throughout the world, as closest to the user as possible to improve the speed.
          IMPORTANT: we can select certain routes to be run like this when we deploy the project to Vercel 
    NOTE:
      we don't get to choose when a route is switched to Dynamic, Next.js handle the entire process
        1. if a page have a dynamic segment, like the page uses the params props
        2. if the page component uses searchParams to read the URL for some information
        3. if any Server Components in the route uses header() or cookies()
        4. if an uncached data request is made by any Server Component of the route
        ways to force dynamic route:
          1. export const dynamic = "force-dynamic"; in page.js
          2. export const revalidate = 0; in page.js
          3. { cache: "no-store" } is being added to any fetch request of a Server Component in the route
          4. noStore() is used in any Server Components of the route. 
Caching:
  What is it?
    1. it is just storing the fetched or computed data in a temporary location so it can be accessed whenever it is needed again. 
    2. this allows the app to not fetch or compute the same data over and over again
    3. Next.js have very aggressive caching, which caches everything that can be cached
    4. Next.js also provides APIs for cache revalidation, which will remove data from the cache and update it with fresh data, which just got fetched or computed
    5. this makes Next.js apps more performant, less fetching and computing, and saves costs, sometime fetching data might cost money. 
    6. Caching is always ON by default, which often lead to unexpected behaviours, like display stale data, and some caching can't even be turn OFF... This makes the caching very annoying to work with sometimes. 
  Caching Mechanisms:
    NOTE: 
      1. This is what will happened in production, there are basicly not caching in development
      2. we can put a variable or equation as the value of revalidate, it have to be a fix value
    Request Memoization:
      Where: Server
      What to cache?
        this caches only for fetch(), and only those in components. Those fetch() in handlers or server actions will not be affected
      How long will the data be kept?
        this is only kept for this one page request, and it is for each user. 
      Benefit?
        we can have the same fetch(URL, option) multiple times throughout the page and they will only result in one fetch request to the server. 
        the rest of the request will just read off the cache. 
      How to revalidate?
        we can't, the data don't stay long enough for it.
      How to Opt Out?
        AbortController
        usually don't need it to though
    Data Cache:
      Where: Server
      What to cache?
        this one caches the data fetched in a route or a single fetch requests
        it is highly configurable and it is also the most confusing
      How long will the data be kept?
        Indefinitly...
        this data can even survive re-deployment of the application
      Benefit?
        not matter how many people and how many requests throughout the world, only one fetch request will be send to the server and everyone will be able to get the data. 
        this are the data that go into making a static page, i.e. the data don't change often and it provide static pages all the information it needs to be generated. 
        This is also what powers ISR when it revalidates. 
        When revalidation is needed the data is fetched again and the static page rely on those data will be regenerated
      How to revalidate?
        we can after a certain amount of time and revalidate all the data in the route with
          export const revalidate = <time>; in page.js
        we can after a certain amount of time and revalidate one data request with
          fetch("", { next: { revalidate: <time> } });
        we can also On-demand and manual revalidate with
          revalidatePath or revalidateTag
      How to Opt Out?
        NOTE: these will also turn the page dynamic without Partial Pre-Rendering
        we can Opt Out the entire page by setting the revalidate time to 0 with
          export const revalidate = 0; in page.js
        we can Opt Out by turning this page to dynamic, since this cache is only for static rendered pages with
          export const dynamic = "force-dynamic"; in page.js
        we can Opt Out for single fetch request with
          fetch("", { cache: "no-store" })
        ...for individual server component with
          noStore(); in the component
    Full Route Cache:
      Where: Server
      What to cache?
        this one caches all the static pages, with all of thier HTML and RSC Payload. 
      How long will the data be kept?
        basicly Indefinitly....
        it will be revalidated when the Data Cache is revalidated and new static pages are created
        BUT it does not survive re-deployment like the Data Cache. 
      Benefit?
        this is what allows static page and apps to work the way they do
      NOTE: Revalidate and Opt Out from Data Cache is also applied to this one, since this one depend on the Data Cache
    Router Cache:
      Where: Client, in the browser
      What to cache?
        all the pre-fetched pages and the pages that the user went through, Static and Dynamic
      How long will the data be kept?
        Dynamic pages will be there for 30 seconds(Next.js 14) (Next.js 15: default Prefetching have no Caching, Full Prefetching is 5 minutes)
        Static pages will be there for 5 minutes (always 5 minutes no matter what)
        If the user don't do a hard reload
      Benefit?
        it allows the user to experience a SPA-like navigation throughout the application
        BUT this can cause the user to have stale data in cache with not way to remove them. 
      How to revalidate?
        use revalidatePath or revalidateTag in Server Action
        we can also force a reload with 
          router.refresh
        or do 
          cookies.set or cookies.delete in Server Action
      How to Opt Out?
        We can't...
        Next.js 15 have some Opt Out by default?

Middleware:
  What is it?
    in english it is something sit between tow things
    In Next.js it is between the Request and Response
    In Other Word:
      we can run code after teh Request BUT for the Response is send back
  How it works?
    middleware will run before every route inthe project
    we can use matcher to specify the path though, the matcher can assign at which route Middleware will run and where it will not
    We can think it as a chunk of code in every route, BUT it is organized in one place that run before each route
    We need one and only one middleware.js file and it have to be in the root folder(NOT the app folder)
    IMPORTANT: Middleware have to produce a Responds
      1. Redirect and Rewrite the Responds to a route
      2. Send a JSON Reponse straight to the client(this one completely ignore the path)
  What is it use for?
    it is mostly used to read and set cookies and headers
    this allows us to implement:
      1. Authetication and Authorization
      2. Server-side analytics
      3. Redirect based on Geolocation
      4. A/B tesing
      5. etc.
        
*/
