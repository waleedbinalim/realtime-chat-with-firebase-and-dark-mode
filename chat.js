const innerCircle = document.querySelector('.rectangle')
const setUsername = document.querySelector('.set-username')
const sendMessage = document.querySelector('.send-message')
const chats = document.querySelector('.chats');
var username = 'unknown user';


//DARK MODE________________________________________________________________
innerCircle.addEventListener('click' , () => {
    innerCircle.classList.toggle('active');

    if(innerCircle.classList.contains("active")){
        trans();
        document.documentElement.setAttribute('data-theme' , 'light' );
    }
    else{
        trans();
        document.documentElement.setAttribute('data-theme' , 'dark' );
    }
});
//TRANSITIONING DARK MODE____________________________________________________
let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition');
    }, 2000)
}


//SET USERNAME___________________________________________________________________
setUsername.addEventListener('submit' , e => {
    e.preventDefault();
    username = setUsername.setusername1.value;
    alert(`your username is ${username}`)
    setUsername.reset();
});



// LOADING FROM FIREBASE FIRESTORE
var newChangeIndex = 1;
const loadFirebaseChats = function(){


    db.collection(`${category}`).orderBy('time').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {

            // console.log('your change index' ,change.newIndex, 'and newChange index', newChangeIndex);           
            if(change.type === 'added' && change.newIndex != newChangeIndex){

                    let html = `
                    <div class="message-container">
                        <div class="name"><strong>${change.doc.data().username} :</strong></div>
                        <div class="message">
                            <p>${change.doc.data().message}</p></div>
                        <div class="time-stamp">
                        </div>
                    </div>`;
                    chats.innerHTML += html;
            }

            newChangeIndex = change.newIndex;


        });
    });
};

const clearChat = function (){
    chats.innerHTML = '';
};


// SETTING UP THE CHANNEL ROOM
const channels = document.querySelector('.channels');
let category = 'home';

channels.addEventListener('click' , e => {
    category = e.path[0].id;
    clearChat();
    loadFirebaseChats();
});


//ADDING TO FIRESTORE___________________________________________________________________________
sendMessage.addEventListener('submit' , e => {
    e.preventDefault();






    const now = new Date();
    const details = {
        username:  username,
        message :  sendMessage.sendmessage1.value,
        time  : firebase.firestore.Timestamp.fromDate(now)
      };
      db.collection(`${category}`).add(details).then(() => {
        // console.log('MESSAGE ADDED');
      });

      sendMessage.reset();
});
