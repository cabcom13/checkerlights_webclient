<template>


<client-only>
  <div class="top-0 right-0 absolute">
      <img class="w-10 block invert" src="~/assets/signal-stream.png" v-if="broker_connected" />
      <img class="w-10 block invert" src="~/assets/signal-stream-slash.png" v-if="!broker_connected" />
      <span class="text-xs text-green-400 block text-opacity-60" v-if="broker_connected" >Connected</span>

    </div>
<div v-if="broker_connected" class="select-none">

  <div class="relative grid  md:grid-cols-2 gap-4 mt-8 select-none container mx-auto" >

    <!-- @click="sendMessage(message.name, 'yellow')" -->

    <div v-for="(message, index) in sortedMessages"  :key="index"  class=""  :class="{ 'disabled': !message.isConnected }" >
      <div class="rounded shadow-md relative bg-gray-200 p-2"  :class="[ { flipped: openIndex === index }]" > 

       <div class=" ">
        <div class="flex items-center p-2">
          <!-- <div class="absolute right-1 top-1">asd</div> -->
          <div class="h-10 w-10 rounded-full ring-4 ring-gray-300" @click="toggleDropdown(index)" :class="[setColorClass(message.status)]"></div>
          <div class="ml-5">
            <strong class="text-xl">{{ message.name.toLocaleUpperCase() }}</strong>
           

            <div v-if="message.isConnected " class="absolute top-5 right-5 w-2 h-2 bg-green-600 rounded-full"></div>
            <div v-if="message.isConnected " class="absolute top-4 right-10 text-xs text-gray-600">zu letzt online: {{ formatTimeSinceLastUpdate(message.timeSinceLastUpdate) }}</div>


            <div v-if="openIndex === index" class="">
              <div class="flex items-center justify-center ">
                <a href="#" class="send_link  bg-red-500 hover:bg-red-600 " @click="sendMessage(message.name, 'red')">Fläche belegt</a>
                <a href="#" class="send_link block bg-yellow-500 hover:bg-yellow-600   "  @click="sendMessage(message.name, 'yellow')">Fläche gecheckt</a>
                <a href="#" class="send_link block bg-green-500 hover:bg-green-600   "  @click="sendMessage(message.name, 'green')">Fläche bereit</a>
                <a href="#" class="send_link block bg-pink-500 hover:bg-pink-600  "  @click="sendMessage(message.name, 'magenta')">Gesperrt (Zoll)</a>
                <a href="#" class="send_link block bg-cyan-500 hover:bg-cyan-600 "  @click="sendMessage(message.name, 'cyan')">Cyan</a>
                <a href="#" class="send_link block bg-white hover:bg-gray-100 "  @click="sendMessage(message.name, 'white')">Fläche leer</a>
                <a href="#" class="send_link block bg-gray-500 hover:bg-gray-600"  @click="sendMessage(message.name, 'off')">Fläche ausgeschaltet</a>
              </div>
            </div>
            <div v-else>
            <div class="p-1">
              <span class="block w-full text-gray-700 text-sm  " v-if="message.status == 'red'">Fläche belegt</span>
              <span class="block w-full text-gray-700 text-sm" v-if="message.status == 'yellow'">Fläche gecheckt, bereit für TL</span>
              <span class="block w-full text-gray-700 text-sm" v-if="message.status == 'green'">Fläche bereit für abtransport</span>
              <span class="block w-full text-gray-700 text-sm" v-if="message.status == 'white'">Fläche leer</span>
              <span class="block w-full text-gray-700 text-sm" v-if="message.status == 'magenta'">Fläche gesperrt (Zoll)</span>
              <span class="block w-full text-gray-700 text-sm" v-if="message.status == 'cyan'">???</span>
              <span class="block w-full text-gray-700 text-sm" v-if="message.status == 'off'">Fläche ausgeschaltet</span>
            </div>

            </div>

          </div>
        </div>

        </div>
      </div>


    </div>

  </div>
</div>
<div class="container mx-auto text-center text-4xl mt-10" v-else>
  MQTT Server nicht verbunden.
</div>
  <div class="flex items-center justify-center mt-16"  v-if="broker_connected">

      <a href="#" class="mx-3 ring-1 ring-gray-400 rounded p-3 bg-red-500 hover:bg-red-600 " @click="sendMessage('all', 'red')">alle Flächen auf Rot</a>
      <a href="#" class="mx-3 ring-1 ring-gray-400 rounded p-3 block bg-yellow-500 hover:bg-yellow-600   "  @click="sendMessage('all', 'yellow')">alle Flächen auf Gelb</a>
      <a href="#" class="mx-3 ring-1 ring-gray-400 rounded p-3 block bg-green-500 hover:bg-green-600   "  @click="sendMessage('all', 'green')">alle Flächen auf Grün</a>
      <a href="#" class="mx-3 ring-1 ring-gray-400 rounded p-3 block bg-pink-500 hover:bg-pink-600  "  @click="sendMessage('all', 'magenta')">alle Flächen auf Magenta</a>
      <a href="#" class="mx-3 ring-1 ring-gray-400 rounded p-3 block bg-cyan-500 hover:bg-cyan-600 "  @click="sendMessage('all', 'cyan')">alle Flächen auf Cyan</a>
      <a href="#" class="mx-3 ring-1 ring-gray-400 rounded p-3 block bg-white hover:bg-gray-100 "  @click="sendMessage('all', 'white')">alle Flächen auf Weiß</a>
      <a href="#" class="mx-3 ring-1 ring-gray-400 rounded p-3 block bg-gray-500 hover:bg-gray-600"  @click="sendMessage('all', 'off')">alle Flächen auf aus</a>
    </div>
<div class="container mx-auto mt-10">
    <textarea 
      v-model="logText" 
      rows="10" 
      cols="50" 
      readonly 
      class="bg-gray-100 p-2 border rounded-md w-full h-64 text-xs select-text">
    </textarea> 
  </div>
</client-only>

  <NuxtSnackbar :shadow="true" :right="true" />
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount  } from 'vue';
import mqtt from 'mqtt';

const snackbar = useSnackbar();
// Log-Daten als reaktive Variable
const logText = ref('');
// Globale MQTT-Client-Instanz
let client = null;
let broker_connected = ref(false);
let openIndex = ref(null);

let messages = ref({
  w5a: { name: 'w4c', status: 'off', timer: 0 , intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false},
  w5b: { name: 'w4c', status: 'green', timer: 0 , intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false},
  w5c: { name: 'w4c', status: 'white', timer: 0 , intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0, isConnected: false},
  w1a: { name: 'w1a', status: 'red', timer: 0, intervalId: null , lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false},
  w1b: { name: 'w1b', status: 'yellow', timer: 0, intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false},
  w1c: { name: 'w1c', status: 'red', timer: 0, intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false},
  w2a: { name: 'w2a', status: 'red', timer: 0 , intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false},
  w2b: { name: 'w2b', status: 'red', timer: 0 , intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false},
  w2c: { name: 'w2c', status: 'magenta', timer: 0 , intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false},
  w3a: { name: 'w3a', status: 'red', timer: 0 , intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false},
  w3b: { name: 'w3b', status: 'yellow', timer: 0 , intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false},
  w3c: { name: 'w3c', status: 'red', timer: 0 , intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false},
  w4a: { name: 'w4a', status: 'red', timer: 0 , intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false},
  w4b: { name: 'w4b', status: 'red', timer: 0 , intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false},
  w4c: { name: 'w4c', status: 'red', timer: 0 , intervalId: null, lastUpdate: null, timeSinceLastUpdate: 0 , isConnected: false}

});


// Funktion zum Hinzufügen eines neuen Logs mit Zeitstempel
const addLog = (topic, message) => {
  const timestamp = new Date().toLocaleString();
  const logEntry = `${timestamp} | Topic: ${topic} | Message: ${message}`;

  // Füge das neue Log am Ende des Textes hinzu
  logText.value += logEntry + '\n';
};

const formatTimeSinceLastUpdate = (seconds) => {
  if (seconds < 60) {
    return `vor ${seconds} Sekunden`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `vor ${minutes} Minuten`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `vor ${hours} Stunden`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `vor ${days} Tagen`;
  }
};

const sortedMessages = Object.fromEntries(
  Object.entries(messages.value).sort((a, b) => {
    const nameA = a[1].name;
    const nameB = b[1].name;
    return nameA.localeCompare(nameB);
  })
);

const toggleDropdown =(index) => {
  openIndex.value = openIndex.value === index ? null : index;
}

// Funktion zum Aktualisieren der Last-Update-Zeit
const updateLastUpdateTime = (topic) => {
  messages.value[topic].lastUpdate = new Date();
  messages.value[topic].timeSinceLastUpdate = 0; // Zähler zurücksetzen
  messages.value[topic].isConnected = true; // Verbindung als hergestellt markieren

};

const startTimer = (topic) => {
  if (messages.value[topic].intervalId) {
    clearInterval(messages.value[topic].intervalId); // Vorherigen Timer stoppen
  }

  // Setze den Timer zurück und starte einen neuen Intervall
  messages.value[topic].timer = 0;
  messages.value[topic].intervalId = setInterval(() => {
    messages.value[topic].timer += 1;
  }, 1000); // Timer erhöht sich jede Sekunde
};

const sendMessage = (topic, message) => {
  if (client && client.connected) {

    client.publish(topic, message, (err) => {
      if (err) {
        snackbar.add({
          type: 'error',
          text: `Failed to publish message: ${err}`
      })
        addLog(topic, `Failed to publish message: ${err}`); 
        console.error('Failed to publish message:', err);
      } else {
        openIndex.value = null
 
      }
    });
  } 
};

const setColorClass = (value) => {
  const classes = {
    red: 'bg-red-500 hover:bg-red-600 cursor-pointer',    // Tailwind-Klasse für Rot
    green: 'bg-green-500 hover:bg-green-600 cursor-pointer', // Tailwind-Klasse für Grün
    yellow: 'bg-yellow-500 hover:bg-yellow-600 cursor-pointer',// Tailwind-Klasse für Gelb,
    magenta: 'bg-pink-500 hover:bg-pink-600 cursor-pointer',
    cyan: 'bg-cyan-500 hover:bg-cyan-600 cursor-pointer',
    white: 'bg-white hover:bg-gray-100 cursor-pointer',
    off: 'bg-gray-500 hover:bg-gray-600 cursor-pointer'

  };

  return classes[value] || 'bg-white'; // Standard: Weiß
};
// Starte einen Intervall, um die Zeit seit `lastUpdate` hochzuzählen und `isConnected` zu aktualisieren
const intervalId = setInterval(() => {
  for (const topic in messages.value) {
    const message = messages.value[topic];
    if (message.lastUpdate) {
      // Zeit seit `lastUpdate` in Sekunden berechnen
      message.timeSinceLastUpdate = Math.floor((new Date() - message.lastUpdate) / 1000);
      
      // Setze `isConnected` auf `false`, wenn `timeSinceLastUpdate` > 60 Sekunden ist
      message.isConnected = message.timeSinceLastUpdate <= 80;
      if( message.timeSinceLastUpdate ==1){
        addLog(topic, `ist Online `); 
      }
      if( message.timeSinceLastUpdate ==80){
        addLog(topic, `ist Offline `); 
      }
      
    }
  }
}, 1000); // Intervall alle Sekunde aktualisieren

onMounted(() => {
  if (!client) {
    // Initialisiere den MQTT-Client nur einmal
    client = mqtt.connect('ws://192.168.0.101:8080');

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      snackbar.add({
          type: 'success',
          text: 'MQTT client connected!'
      })
      addLog('Connected', 'MQTT client connected!'); 
      client.subscribe('#'); // Auf alle Topics hören
      broker_connected.value=true;
      
    });

    client.on('offline', () => {
      snackbar.add({
          type: 'error',
          text: 'MQTT client not connected!'
      })
      addLog('Offline', 'MQTT client not connected!'); 
      broker_connected.value=false;
    });  

    client.on('message', async (topic, msg) => {
      console.log(topic, msg.toString());
      // snackbar.add({
      //     type: 'info',
      //     text: `${topic}: ${msg.toString()}`
      // })
      // messages.value[topic] = { name: topic, status: msg.toString() };
      addLog(topic, msg.toString());  // Log hinzufügen  
      messages.value[topic] = { 
        name: topic, 
        status: msg.toString(), 
        lastUpdate: new Date().toLocaleTimeString(), 
        timeSinceLastUpdate: 0 ,
        isConnected: true 
      };

      // Aktualisiere die Anzeige des letzten Updates
      updateLastUpdateTime(topic);

      // startTimer(topic); // Timer starten
      await nextTick(); // Sicherstellen, dass Vue das Update mitbekommt
    });
  }
});
// Bereinigung des Intervalls beim Entladen der Komponente
onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>
<style scoped>

.circle {
  @apply w-20 h-20 ;
  border-radius: 50%;
  background: white; /* Standard-Farbe */
  animation: pulse 2s ease-in-out infinite, shimmer 3s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}
.disabled{
  @apply relative;
}
.disabled  > * {
  pointer-events: none;
  @apply opacity-30;
}
.disabled::after {
  content:'Client ist offline ';
  @apply absolute top-7 left-0 text-3xl w-full text-center h-20 opacity-100 text-black block uppercase; 
}
/* Farbvarianten */
.circle.red {
  @apply bg-red-500;
}

.circle.green {
  @apply bg-green-500;
}

.circle.blue {
  @apply bg-blue-500;
}

.circle.yellow {
  @apply bg-yellow-500;
}

/* Effekte */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.7);
  }
}

@keyframes shimmer {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.3);
  }
}

.send_link{
  @apply p-1 rounded-sm text-sm;
}

.blinking-bg {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% {
    @apply bg-red-500;
  }
  50% {
    @apply bg-yellow-500;
  }
}
</style>