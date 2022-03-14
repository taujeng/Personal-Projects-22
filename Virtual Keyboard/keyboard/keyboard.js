const Keyboard = {
  // keep track of classes: keyboard, keyboard__keys, the keys
  elements: {
    main: null, // main keyboard element
    keysContainer: null, // 
    keys: [] // arrays of the button for the keys
  },

  // When code says open kb, accept 2 fx (below)
  // fired off when kb gets input, or when kb is closed
  eventHandlers: {
    oninput: null,
    onclose: null
  },

  // contain diff states of the kb
  properties: {
    value: "", // current value of the kb
    capsLock: false
  },

  // this is gonna run when page first loads.
  // initialize the kb
  init() {
    // first thing to do is create the keyboard n keyboard__keys elements

    // Create main elements
    this.elements.main = document.createElement("div");
    // create a div, and store it virtually in js
    this.elements.keysContainer = document.createElement("div");

    // Set up main elements: adding some classes
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    // append the value of _createKeys() onto keysContainer
    this.elements.keysContainer.appendChild(this._createKeys());

    // Select all buttons with the class ".keyboard__keys" and store them as a nodelist/array in "keys"
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key")

    // Add to DOM
    // Create that parent child relationship. keyboard -> keyboard__keys
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use kb for elemetns with .use-keyboard-input
    // for ea area with a class of .use, we'll loop thru
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      // on focus, we open up kb
      element.addEventListener("focus", () => {
        // initial value = value in text area/input
        this.open(element.value, currentValue => {
          // value of the text area is set to the value in the kb
          element.value = currentValue
        })
      })
    })
  },

  // private method (the underscore doesn't do anything, just
  // a naming convention)
  // create all the html for the keys
  _createKeys() {
    // will return a document fragment (virtual elements, that other elements can 
    // append to. then append the whole fragment to a diff element
    // gonna create a fragment, then return it, and then append to keysContainer
    // this will append all the keys in this fragment to the keysContainer
    const fragment = document.createDocumentFragment();
    const keyLayout = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
        "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "space"
    ];
    // gonna loop thru keyLayout, and make a button out of ea one

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      // to make new rows in the kb:
      // if the key we're looping thru is the following, give true. otherwise false.
      // for indexOf, it returns -1 if it's NOT in the array.
      // so if true, we want to add a line break
      const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;
      
      // Add attributes/ classes
      //  <button type="button" (adding this part)
      keyElement.setAttribute("type", "button");
      // "keyboard__keys" is the main class all keys should have ( which is why we're
      // putting this in the loop)
      keyElement.classList.add("keyboard__key");

      // Figure out what key we're looping thru
      
      switch (key) {
        // if the current key is backspace
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          // for the spacebar, we need to clear the current value
          // this.properties.value = our keyboard constant.properties.value =""
          // look at structure of const keyboard at the top
          // this removes the last character from the current value
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);            // we let the kb know that the input has changed. so we need to trigger an event
            this._triggerEvent("oninput");
          })  
          
          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            // don't need to trigger event, bc no input has changed, and kb isn't closed
            // toggling on or off the activer class (which displays the green light)
            // part 2: (this.properties.capsLock): if current state is capsLock = true, then 
            // the toggle method will force the class to be added to the key element
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          })

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            // append a break
            this.properties.value += "\n";
            // input has changed, must trigger event
            this._triggerEvent("oninput");
          })  

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            // input has changed, must trigger event
            this._triggerEvent("oninput");
          })  

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close()
            this._triggerEvent("onclose");
          })  

          break;

          // if none of these cases are true (aka not a special key)
          default:
            keyElement.textContent = key.toLowerCase();

            keyElement.addEventListener("click", () => {
                this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                this._triggerEvent("oninput");
            });

            break;
      }

      // the fragment is a lil container for all the keys.
      fragment.appendChild(keyElement);

      // if we need to insert a linebreak
      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    })

    // we've looked everything, created buttons(keys), and returned them as a document fragment
    return fragment;
  },

  // trigger eventHandler from above
  _triggerEvent(handlerName) {
    // if a fx is specified in one of the properties (oninput/onclose), do this
    if (typeof this.eventHandlers[handlerName] == "function") {
      // provide the current value to the code that is using the kb
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      // check if the key has an icon
      // if inspect, <i> count as a tag/element so the count is 1
      // standard letter keys don't have it, so the count is 0
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  // initialValue: if in your text box, there is already a word there, then kb
  // can spawn with that word
  open(initialValue, oninput, onclose) {
    // if initial value is provided, use it. if not, reset to empty
    this.properties.value = initialValue || "";
    // can specify function for oninput/onclose if you want.
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    // display kb when open method is called
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

  // once DOM(HTML structure) has been loaded on page, call init method.
window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
  // example of how the system will be using the kb. thru the open method
  // Keyboard.open("you typed: ", function(currentValue) {
  //   console.log("value changed! here it is: " + currentValue);
  // }, function (currentValue) {
  //   console.log("kb closed! Finishing value: " + currentValue)
  // });
});