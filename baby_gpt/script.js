
async function sendMessage() {
  const prompt = textarea.value.trim();
  const time = getCurrentTime(); 
  if (prompt !== '') {
    const newMessage = `
      <div class="message sent ">
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
      const response = await fetch('https://babygptone.onrender.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, conversation })
      });
      clearInterval(loaderInterval);

      const data = await response.json();

      // Store the bot response in local storage
      conversation.push({ bot: data.bot, time , sender: 'bot' });
      localStorage.setItem('conversation', JSON.stringify(conversation));

      const botMessage = `
        <div class="message received">
          <div class="message-content">
            <div class="received_t" >
           
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
      alert(error);
      console.log(error);
      clearInterval(loaderInterval);
      loaderText.remove();
    }
  }
  
}





  function handleKeyDown(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }



























  


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
  


// Retrieve the conversation data from local storage
const conversation = JSON.parse(localStorage.getItem('conversation') || '[]');


//sendind the conversation history
const prompts = conversation.filter(item => item.sender === 'user').map(item => item.prompt);
const botResponses = conversation.filter(item => item.sender === 'bot').map(item => item.bot || '');
const context = prompts.map((prompt, i) => prompt + '\n' + botResponses[i]).join('\n');


// Display the conversation data in the chat box
if (conversation.length > 1) {
  const messages = conversation.map(message => {
    if (message.sender === 'user') {
      return `
        <div class="message sent">
          <div class="message-content">
            <div class="sent_t">${message.prompt}
              <p class="text-end time text-muted">${message.time}</p>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="message received">
          <div class="message-content">
            <div class="received_t">
              
            ${data.bot.split('\n').filter(line => line.trim() !== '').map((line, index) => {
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

  

  function clearLocalStorage() {
    localStorage.clear();
  }