# How to get Started

### 1. Apply for a twitter Developer Account and create a new Project App

### 2. Change the User Authentication settings of You Project on Twitter Developer Portal

Click on edit button and change the given settings

1. Allow the <b>"Read and Write"</b> permisiions in the <b>"App Permission" </b> Section.
1. Select the <b>"Web App, Automated App,or Bot"</b> in <b>"Type of App"</b> section.
1. Add this <b>callback Url</b> in <b> App info </b> section and any Website Url in the website url input.

```text
http://127.0.0.1:5000/callback
```

### 3. Create a Supabase App [here](https://app.supabase.com/)
Setup Database and authentication with Emails.
1. Create two new tables with names `states` and `token`.
2. Setup Supabase Authentication.

After Deployment, make sure you disable signup after signing in yourself otherwise others can also sign Up into your application.
    

### 4. Clone the repo to your local device:

```
git clone https://github.com/kubesimplify/kubetweet.git
cd kubetweet
```

### 5. Install the Dependencies

```
cd frontend
npm install
cd ../backend
npm install
```

### 6. Ready your backend

Create a `.env` file in you backend folder and add the following data.

```
CLIENT_ID = <YOUR_TWITTER_CLIENR_ID>
CLIENT_SECRET = <YOUR_TWITTER_CLIENT_SECRET>
BEARER_TOKEN = <YOUR_TWITTER_BEARER_TOKEN>

SUPABASE_PROJECT_URL= <YOUR_SUPABASE_PROJECT_URL>
SUPABASE_PROJECT_ANON_API_KEY= <YOUR_SUPABASE_PROJECT_ANON_KEY>
```

### 7. Go to the `server.js` file in the backend folder and add your twitterAccoundId on line 37

you can get your Twitter User id from [here](https://tweeterid.com/) in case if you don't know.

### 8. Now our express server (backend) is ready to run.

Run the backend server by

```
 npm start
 or 
 npm run dev
```

### 9. Now Let's Authorise the Twitter Api by your Twitter Account

Go to http://localhost:5000/auth and Click on Authorise and it will Authorise your project to post Tweets and it will redirect you to Callback Url.


Our Backend is ready now 🥳 


### 10. Now Let's Ready our Frontend Application by creating a `.env` file in frontend folder  
 Add the following lines 
 ```
REACT_APP_SUPABASE_URL= <YOUR_SUPABASE_PROJECT_URL>
REACT_APP_SUPABASE_ANON_KEY= <YOUR_SUPABASE_PROJECT_ANON_KEY>
 ```
open an another terminal and run your frontend application.
```
npm start
```
 our Frontend is also ready 🥳🥳.

## Now you can post Tweets and Retweets other tweets easily. 🥳🚀
Make sure your both frontend and backend Application are running.