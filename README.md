# How to Run

1. Run `npm install`
2. Run the server `npm run start:server`
3. Run the client `npm start`
4. Access the client by going to the browser and enter http://localhost:3000
5. Register a user
6. Start chatting


# Make the Chat Public from Your Local Machine

You can make it public using your computer/laptop 

*Note: You need to run the client and service first before doing this*

**WARNING: This may expose your computer to malicious threats such as virus or unwanted scripts if the wrong people can access the URL. Use it for development and testing only. Do not use it for real consumer applications**

1. Run `npm install -g ngrok`
2. Run `npm install -g localtunnel`
3. Run `ngrok tcp 8080` or your server port number and you will get a public URL for your server access
4. Change the URL on `/src/config/config.js` to the URL returned by ngrok
5. Run `lt --port 3000 --subdomain [domaincustom]` or your client port number and you will get a public URL for your client access
6. Access the client public URL on your browser