# EasyChat

It was my first touch with socket.io so I decided to make an easy chat which I will use in CRM I'm building for company I working now.

## Little about project

At the begining I just made it for communicate in real time, but I thought it would be impracitcal, that you cannot back to old messages. So I connected chat with mongoDB via mongoose and now it saves messages in one of my clusters. 

### Learned&Reminded

Firstly - the then() method returns a Promise. It takes up to two arguments: callback functions for the success and failure cases of the Promise. I've forgotten about that.

Secondly - socket.io is really usefull tool, which greatly improves communication between client and server. In my mind appering see of possibilities to use it ;).
