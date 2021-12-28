# Mini-Project-3
![Landing page](https://user-images.githubusercontent.com/69458937/147550939-2a05593f-2f36-4ecb-90b8-8ddcab5987af.png)

## 💡 Problem statement

To Create a website which will help people improve their Public Speaking and Presentation skill.
AI-Buddy is a website-based language learning and personality development platform which focuses on overall improvement on the user’s ability to speak with confidence in public and also get to know the language in depth.

## 🎯 Purpose

This project provides a competitive platform where users develop their communication skill by practicing with our Machine Learning model and can experience a stage like experience standing at home. Users can monitor their progress, work to improve, learn new words etc. This helps the user get more and more confident in their skills to face an interview, speak in front of a crowd or talk confidently without fumbling. We also provide necessary study material from the best sources so that your knowledge never gets stagnant and you keep learning.

## 🏆 Goal and Vision
This system consists of various features, like new words and tongue twisters to exercise their tongue and 3D VR environment to give them an emerging experience of the stage at home with the help of VR Headset and provide them an AI helper to help them with their speech.

## 🛠 Requirements
There are two main web frameworks used in the construction of the web application: -
**Node.JS**:-  A java Script based web framework used for making the backend of the website
**Django** :– A python-based web framework use to make the main API for the website
Apart from the frameworks the main front-end tools used for the website are HTML, CSS and JS
There are a bunch of libraries also used in the website mainly for tasks related to machine learning, natural language processing, data manipulation like: -
- NumPy
- TensorFlow
- Django-rest framework
- Pandas
- Scikit learn
- Speech recognition
- Librosa
- Matplotlib
- Keras

## 📝 Proposed solution
### Functional design 
![main](https://user-images.githubusercontent.com/69458937/147550542-542d2e1f-e9fb-4b49-8216-c714b8bccfe2.jpg)

The above diagram shows the brief working of our website, this includes Frontend, Backend, database, API, and machine learning models.

### Backend functional design
![2](https://user-images.githubusercontent.com/69458937/147550809-d197fe7f-0786-4d58-8112-5080f00e05f3.jpg)


### Machine learning model design
![3](https://user-images.githubusercontent.com/69458937/147550866-30726feb-fdba-4639-a261-dd51ea5d8081.jpg)

The Machine learning model consist of 2 features which are
- Emotion Classifier
- Speech Accuracy analyzer

#### Emotion Classifier
The purpose of this model is to classify emotion from the audio file given by user. this model is created using Deep neural network, we use Sequential model API to create neural network of our model to predict emotion in audio file. The Sequential model API is a way of creating deep learning models where an instance of the Sequential class is created and model layers are created and added to it.

The emotion classifier classifies the emotion out of 5 categories
- Calm
- Happy
- Sad
- Angry
- Fearful

The steps involved for predicting the emotion from audio:-

- The Model takes audio file as an input and with the help of the python library “Librosa”. 
- We extract the features, then we reshape the features by [1, 40, 1], so that it matches with the machine learning model input type. 
- After reshaping it, we feed the data to our machine learning model. 
- In return the model gives us the array of number which we need to decode the help of “Label Encoder”. It has a function provided specifically for the task called “inverse_transform”
- Once we have decoded the array of number, we will get the exact emotion of Audio speech given by user.

#### Speech Accuracy analyzer
The accuracy detecting algorithm used in the website is called cosine similarity methodology. This is a very mathematically efficient way to find out the similarity between two sentences. In our website the user passes the audio file in which he/she is reciting the sentence that is being shown to him/her. The audio is then converted to base64 format and sent to the API via backend for processing. Speech accuracy analyzer detects the cosine similarity of the two sentences or in this case the accuracy of the audio to the original sentence. 

Cosine similarity in short refers to finding the cosine of the angle formed between 2 non-zero vectors. It is a very accurate method to find out in the scale of 0-1 how much similar the two non-zero vectors are.

Steps involved for finding accuracy
- Firstly, the API receives the audio in base64 format and the string. 
- The base64 format is then converted to audio and saved temporarily in a file in .mkv format. 
- The speech to text library named Speech Recognition converts the mkv formatted file into text. 
- The text and sting are taken in a single array variable named ‘sentences. Example : sentences = [text, string], Where let text = “I am a developer”, And string = “I was a developer”.
- The two sentences are then converted to vector format using different functions from premade libraries like CountVectorizer and Vectorizer and is then stored in an a 2d array variable named array.
-The vector arrays are then passed through the cosine similarity function which makes a 2d matrix which symbolizes the correlation between 2 vectors.
- From the correlation we can find the similarity of both the paragraphs

#### Interest based articles
For user to develop the habit of reading, we decided to recommend user articles based on his liking, if user like “business” then we will recommend articles on business. We are using an Api called “gnews”. Using this Api, we will fetch the articles based on users liking, which will contribute in developing reading habit of user. 

Steps Involved: - 
- Fetch the interests from user object data.
- Create a new URL with query as a user interest, then send the request to Api using axios library.
- The Api will return the Articles as our response, then we will send the data to frontend.
- Display the data to web page







