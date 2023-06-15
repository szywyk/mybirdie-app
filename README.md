## Links
* The app on GitHub Pages: <https://szywyk.github.io/mybirdie-app/>
* Model training: https://www.kaggle.com/code/szymonio/efiicientnetv2-b0-bird-classification
* Dataset: <https://www.kaggle.com/datasets/gpiosenka/100-bird-species>

## About project
This is a bird species classification web app using convolutional neural network model to classify images.

The app was developed in React.js using mainly React-Bootstrap for UI.

CNN model was created in Python using TensorFlow library. Then, it was converted into a format suitable for TensorFlow.js, which was used to implement image classification in the app.

Google Firebase was used as backend - realtime database, authentication and cloud storage.

## Model
To train the model transfer learning was used. Model uses EfficientNetV2-B0 as base model and have a custom top layer to learn for this specific problem. After first 20 epochs of training using pre-trained weights, some layers in base model were unfreezed and fine-tuned for 10 more epochs. Final model accuracy is on validation set ~96.1% and on test set ~97.9%.

## Dataset
Dataset used to train the model comes from Kaggle and contains images of 525 bird species. Dataset is divided into train, validation and test sets. Each species contains over 100 train images. There are 84635 images in training set, 2625 images in validation set, and 2625 images in test set.

## App functionalities

* When user is not logged in, they can upload a bird image and have the model predict what species it is.
* When user is logged in, birds which are correctly recognized are saved in My Birds tab, where user can later find all their recognized birds.
* User can sign up with email and password or Google account.
* Birds from My Birds can be removed by the user.
* The app is fully responsive and has an adapted mobile UI.
