## Links
* The app on Github Pages: <https://szywyk.github.io/mybirdie-app/>
* Model: <https://www.kaggle.com/szymonio/birds-image-classification>
* Dataset: <https://www.kaggle.com/datasets/gpiosenka/100-bird-species>

## About project
This is a bird species classification web app using convolutional neural network model to classify images.

The app was developed in React.js using mainly React-Bootstrap for UI.

CNN model was created in Python using TensorFlow library. Then, it was converted into a format suitable for Tensorflow.js, which was used to implement image classification in the app.

Google Firebase was used as backend - realtime database, authentication and cloud storage.

## Model
Current model recognizes correctly ~70% of test images. Soon, I will train a model using transfer learning which will be much more accurate.

## Dataset
Dataset used to train the model comes from Kaggle and contains images of 510 bird species. Dataset is divided into train, validation and test sets. Each species contains over 100 train images.

## App functionalities

* When user is not logged in, they can upload a bird image and have the model predict what species it is.
* When user is logged in, birds which are correctly recognized are saved in My Birds tab, where user can later find all their recognized birds.
* User can sign up with email and password or Google account.
* Birds from My Birds can be removed by the user.
* The app is fully responsive and has adapted mobile UI.
