// function appendMessage(isBot, name, time, text) {
//     // Get the chat area element
//     const chatArea = document.querySelector(".msger-chat");
  
//     // Create a new message element
//     const message = document.createElement("div");
//     message.classList.add("msg", isBot ? "left-msg" : "right-msg");
  
//     // Create the message image element
//     const messageImage = document.createElement("div");
//     messageImage.classList.add("msg-img");
//     messageImage.style.backgroundImage = isBot
//       ? "url(https://image.flaticon.com/icons/svg/327/327779.svg)"
//       : "url(https://image.flaticon.com/icons/svg/145/145867.svg)";
  
//     // Create the message bubble element
//     const messageBubble = document.createElement("div");
//     messageBubble.classList.add("msg-bubble");
  
//     // Create the message info element
//     const messageInfo = document.createElement("div");
//     messageInfo.classList.add("msg-info");
  
//     // Create the message info name element
//     const messageInfoName = document.createElement("div");
//     messageInfoName.classList.add("msg-info-name");
//     messageInfoName.textContent = name;
  
//     // Create the message info time element
//     const messageInfoTime = document.createElement("div");
//     messageInfoTime.classList.add("msg-info-time");
//     messageInfoTime.textContent = time;
  
//     // Create the message text element
//     const messageText = document.createElement("div");
//     messageText.classList.add("msg-text");
//     messageText.textContent = text;
  
//     // Append the message elements to the message bubble element
//     messageInfo.appendChild(messageInfoName);
//     messageInfo.appendChild(messageInfoTime);
//     messageBubble.appendChild(messageInfo);
//     messageBubble.appendChild(messageText);
//     message.appendChild(messageImage);
//     message.appendChild(messageBubble);
  
//     // Append the message element to the chat area element
//     chatArea.appendChild(message);
//   }

  

//   function sendMessage(event) {
//     event.preventDefault();
  
//     // Get the form input element
//     const input = document.querySelector(".msger-input");
  
//     // Get the user's message from the input element
//     const messageText = input.value.trim();
  
//     // Clear the input element
//     input.value = "";
  
//     // Append the user's message to the chat area
//     const name = "User"; // Set the name to "User" for now
//     const time = getCurrentTime(); // Get the current time
//     appendMessage(false, name, time, messageText);
//   }




function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}



  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  



  function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}





  const textarea = document.querySelector('textarea');
  const chatBox = document.querySelector('.texts');
  
  function loader(element) {
    element.textContent = '';
  
    const loadInterval = setInterval(() => {
      // Update the text content of the loading indicator
      element.textContent += '.';
  
      // If the loading indicator has reached three dots, reset it
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  
    return loadInterval;
  }
  
  async function sendMessage() {
    const prompt = textarea.value.trim();
    const time = getCurrentTime(); 
    if (prompt !== '') {
      const newMessage = `
        <div class="message sent ">
          <div class="message-content">
            <p class="sent_t">${prompt}</p>
            <p class="text-end time text-muted">${time}</p>
          </div>
        </div>
      `;
      chatBox.insertAdjacentHTML('beforeend', newMessage);
      chatBox.scrollTop = chatBox.scrollHeight;
      textarea.value = '';
  
      const loaderText = document.createElement('p');
      loaderText.textContent = 'Loading';
      const loaderInterval = loader(loaderText);
      chatBox.appendChild(loaderText);
  
      try {
        const response = await fetch('http://localhost:5000', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt })
        });
        console.log(response);
        clearInterval(loaderInterval);
  
        const data = await response.json();
        console.log('bsdiwala gpt',data.bot);

  
        const botMessage = `
          <div class="message received">
            <div class="message-content">
              <p class="received_t">${data.bot}</p>
              <p class="text-end time text-muted">${getCurrentTime()}</p>
            </div>
          </div>
        `;
  


        chatBox.insertAdjacentHTML('beforeend', botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
        loaderText.remove();
      } catch (error) {
        console.log(error);
        clearInterval(loaderInterval);
        loaderText.remove();
      }
    }
  }







