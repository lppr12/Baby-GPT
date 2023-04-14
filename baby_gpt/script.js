

async function sendMessage() {



// Theme decider //

const savedTheme = localStorage.getItem('selectedTheme');
let botMessageClass = '';
let botMessageClass2 = '';
if (savedTheme === 'theme1') {
  botMessageClass = 'd0recieved';
  botMessageClass2 = 'd0sent';
} else if (savedTheme === 'theme2') {
  botMessageClass = 'd1recieved';
  botMessageClass2 = 'd1sent';
} else {
  botMessageClass = 'd2recieved';
  botMessageClass2 = 'd2sent';
}

//////////////////







  const prompt = textarea.value.trim();
  const time = getCurrentTime(); 
  if (prompt !== '') {
    const newMessage = `
      <div class="message sent ${botMessageClass2}">
        <div class="message-content">
          <div class="sent_t">${prompt}
            <p class="text-end time text-muted">${time}</p>
          </div>
        </div>
      </div>
    `;
    chatBox.insertAdjacentHTML('beforeend', newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
    textarea.value = '';
    
    // // Store the user message in local storage
     const conversation = JSON.parse(localStorage.getItem('conversation') || '[]');
     conversation.push({ prompt, time ,sender: 'user' });
     localStorage.setItem('conversation', JSON.stringify(conversation));
    // // 



    const loaderText = document.createElement('p');
    loaderText.textContent = 'Loading';
    const loaderInterval = loader(loaderText);
    chatBox.appendChild(loaderText);

    try {
      let response = await fetch('https://babygptone.onrender.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, conversation })
      });
      clearInterval(loaderInterval);

      const data = await response.json();

      

      while (data === undefined) {
        response = await fetch('https://babygptone.onrender.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, conversation })
      });
      clearInterval(loaderInterval);

      const data = await response.json();
      }
      


      if(data===undefined)
      {
        const botMessage = `
          <div class="message recieved ${botMessageClass}">
            <div class="message-content">
              <div class="recieved_t">
                ERROR! Plz retry :/
                <p class="text-end time text-muted">${getCurrentTime()}</p>
              </div>
            </div>
          </div>
        `;
        chatBox.insertAdjacentHTML('beforeend', botMessage);
        loaderText.remove();
        chatBox.scrollTop = chatBox.scrollHeight;
        return;
      }

      if(data.bot ===undefined)
      {
        const botMessage = `
          <div class="message recieved ${botMessageClass}">
            <div class="message-content">
              <div class="recieved_t">
                ERROR! Plz retry :/
                <p class="text-end time text-muted">${getCurrentTime()}</p>
              </div>
            </div>
          </div>
        `;
        chatBox.insertAdjacentHTML('beforeend', botMessage);
        loaderText.remove();
        chatBox.scrollTop = chatBox.scrollHeight;
        return;
      }

      console.log("Data:",data);

     

      // Store the bot response in local storage
      conversation.push({ bot: data.bot, time , sender: 'bot' });
      localStorage.setItem('conversation', JSON.stringify(conversation));


        const botMessage = `
          <div class="message recieved ${botMessageClass}">
            <div class="message-content">
              <div class="recieved_t">
                ${data.bot.split('\n').filter(line => line.trim() !== '').map((line, index) => {
                  if (index === 0) {
                    // Remove leading whitespace and "A:" prefix from first line
                    return `<p>${line.trim().replace(/^A:\s*/, '')}</p>`;
                  } else {
                    return `<p>${line.trim()}</p>`;
                  }
                }).join('<br>')}
                <p class="text-end time text-muted">${getCurrentTime()}</p>
              </div>
            </div>
          </div>
        `;
      

      chatBox.insertAdjacentHTML('beforeend', botMessage);
      loaderText.remove();
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
      
      console.log(error);
      const botMessage = `
          <div class="message recieved ${botMessageClass}">
            <div class="message-content">
              <div class="recieved_t">
                ERROR! Plz retry :/
                <p class="text-end time text-muted">${getCurrentTime()}</p>
              </div>
            </div>
          </div>
        `;
        chatBox.insertAdjacentHTML('beforeend', botMessage);
        loaderText.remove();
        chatBox.scrollTop = chatBox.scrollHeight;
      clearInterval(loaderInterval);
      loaderText.remove();
      // location.reload();
    }
  }
  
}


const submitButton = document.querySelector('.subbut');
submitButton.addEventListener('click', sendMessage);





  function handleKeyDown(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }


  const textArea = document.querySelector('#textarea1');
textArea.addEventListener('keydown', handleKeyDown);






























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
    element.innerHTML = `
      <div class="loader">
        <div class="loader-dots">
          <span class="loader-dot"></span>
          <span class="loader-dot"></span>
          <span class="loader-dot"></span>
        </div>
        <div class="loader-text">
          <div class="loader-text-1"></div>
          <div class="loader-text-2"></div>
          <div class="loader-text-3"></div>
        </div>
      </div>
    `;
  
    return true;
  }
  


// Restoring convo//

// Retrieve the conversation data from local storage
const conversation = JSON.parse(localStorage.getItem('conversation') || '[]');


//sendind the conversation history
const prompts = conversation.filter(item => item.sender === 'user').map(item => item.prompt);
const botResponses = conversation.filter(item => item.sender === 'bot').map(item => item.bot || '');
const context = prompts.map((prompt, i) => prompt + '\n' + botResponses[i]).join('\n');


// Theme decider //

const savedTheme1 = localStorage.getItem('selectedTheme');
let botMessageClass = '';
let botMessageClass2 = '';
if (savedTheme1 === 'theme1') {
  botMessageClass = 'd0recieved';
  botMessageClass2 = 'd0sent';
} else if (savedTheme1 === 'theme2') {
  botMessageClass = 'd1recieved';
  botMessageClass2 = 'd1sent';
} else {
  botMessageClass = 'd2recieved';
  botMessageClass2 = 'd2sent';
}

//////////////////

// Display the conversation data in the chat box
if (conversation.length > 1) {
  const messages = conversation.map(message => {
    if (message.sender === 'user') {
      return `
        <div class="message sent ${botMessageClass2}">
          <div class="message-content">
            <div class="sent_t">${message.prompt}
              <p class="text-end time text-muted">${message.time}</p>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="message recieved ${botMessageClass}">
          <div class="message-content">
            <div class="recieved_t">
              
            ${message.bot.split('\n').filter(line => line.trim() !== '').map((line, index) => {
              if (index === 0) {
                // Remove leading whitespace and "A:" prefix from first line
                return `<p>${line.trim().replace(/^A:\s*/, '')}</p>`;
              } else {
                return `<p>${line.trim()}</p>`;
              }
            }).join('<br>')}
              <p class="text-end time text-muted">${message.time}</p>
            </div>
          </div>
        </div>
      `;
    }
  });
  chatBox.innerHTML = messages.join('');
  chatBox.scrollTop = chatBox.scrollHeight;
}




 // const conversation = []; //test



                        
































  


// Title

var textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml1 .letter',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i+1)
  }).add({
    targets: '.ml1 .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
  }).add({
    targets: '.ml1',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

  
  












  // clear history
  function clearLocalStorage() {
    localStorage.removeItem('conversation');
    location.reload(true);
  }

  document.addEventListener("DOMContentLoaded", function() {
    const clrButton = document.querySelector('#clrbut');
    clrButton.addEventListener('click', clearLocalStorage);
  });
  








  // Theme //


  if (!localStorage.getItem('selectedTheme')) {
    // Set selectedTheme item to theme1
    localStorage.setItem('selectedTheme', 'theme1');
  }

  // Get the buttons and elements
const theme1Btn = document.querySelector('#theme1');
const theme2Btn = document.querySelector('#theme2');
const theme3Btn = document.querySelector('#theme3');
const bgclr= document.querySelector('.bg');
const textarea1 = document.querySelector('.textbar');
const sent = document.querySelector('.sent');
const recieved = document.querySelector('.recieved');

// Check local storage for the saved theme
const savedTheme = localStorage.getItem('selectedTheme');
console.log("SavedTheme:",savedTheme);
if (savedTheme === 'theme1') {
  bgclr.classList.add('bgrclr0');
  textarea1.classList.add('d0textarea');
  sent.classList.add('d0sent');
  recieved.classList.add('d0recieved');
  

  textarea1.classList.remove('d1textarea', 'd2textarea');
  sent.classList.remove('d1sent', 'd2sent');
  recieved.classList.remove('d1recieved', 'd2recieved');
  bgclr.classList.remove('bgrclr1', 'bgrclr2');
  
} else if (savedTheme === 'theme2') {
  bgclr.classList.add('bgrclr1');
  textarea1.classList.add('d1textarea');
  sent.classList.add('d1sent');
  recieved.classList.add('d1recieved');
  

  textarea1.classList.remove('d0textarea', 'd2textarea');
  sent.classList.remove('d0sent', 'd2sent');
  recieved.classList.remove('d0recieved', 'd2recieved');
  bgclr.classList.remove('bgrclr0', 'bgrclr2');

}else if (savedTheme === 'theme3') {
  bgclr.classList.add('bgrclr2');
  textarea1.classList.add('d2textarea');
  sent.classList.add('d2sent');
  recieved.classList.add('d2recieved');
  

  textarea1.classList.remove('d0textarea', 'd1textarea');
  sent.classList.remove('d0sent', 'd1sent');
  recieved.classList.remove('d0recieved', 'd1recieved');
  bgclr.classList.remove('bgrclr0', 'bgrclr1');
  
}

// Add event listeners to the buttons
theme1Btn.addEventListener('click', () => {
  textarea1.classList.add('d0textarea');
  sent.classList.add('d0sent');
  recieved.classList.add('d0recieved');
  bgclr.classList.add('bgrclr0');

  textarea1.classList.remove('d1textarea', 'd2textarea');
  sent.classList.remove('d1sent', 'd2sent');
  recieved.classList.remove('d1recieved', 'd2recieved');
  bgclr.classList.remove('bgrclr1', 'bgrclr2');

  localStorage.setItem('selectedTheme', 'theme1');
  location.reload(true);
});

theme2Btn.addEventListener('click', () => {
  textarea1.classList.add('d1textarea');
  sent.classList.add('d1sent');
  recieved.classList.add('d1recieved');
  bgclr.classList.add('bgrclr1');

  textarea1.classList.remove('d0textarea', 'd2textarea');
  sent.classList.remove('d0sent', 'd2sent');
  recieved.classList.remove('d0recieved', 'd2recieved');
  bgclr.classList.remove('bgrclr0', 'bgrclr2');
  localStorage.setItem('selectedTheme', 'theme2');
  location.reload(true);
});

theme3Btn.addEventListener('click', () => {
  textarea1.classList.add('d2textarea');
  sent.classList.add('d2sent');
  recieved.classList.add('d2recieved');
  bgclr.classList.add('bgrclr2');

  textarea1.classList.remove('d0textarea', 'd1textarea');
  sent.classList.remove('d0sent', 'd1sent');
  recieved.classList.remove('d0recieved', 'd1recieved');
  bgclr.classList.remove('bgrclr0', 'bgrclr1');
  
  localStorage.setItem('selectedTheme', 'theme3');
  location.reload(true);
});
