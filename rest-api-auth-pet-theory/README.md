# Authenticating your API with JWT in a client web app

This contains the example code for the Serverless Toolbox video on YouTube:
[Securing a REST API with JWT, code](https://www.youtube.com/watch?v=YtK13Ra9Fww&list=PLIivdWyY5sqKiWvnaA5A8F3UQ0Xu5i49U&index=26&t=0s)

This example app uses FirebaseUI to allow users to sign into a client web
app and make authenticated calls to an API built on Cloud Run.

## Create a Cloud SQL database
1. Set the appropriate values and then run the script `create-database.sh`
1. Connect to your Cloud SQL instance and then use the commands in
`load-data.sql` to create the appointments table and sample data. Note that
the `user_id` values are placeholder values.

## Set up Firebase Authentication
1. Set up your project in the [Firebase project console](https://console.firebase.google.com)
1. Set the Firebase project info in `public/init-firebase.js`.

## Deploy to Cloud Run
1. Set values in the file and then and run `deploy.sh`.
1. Deploy your project to Cloud Run and add the app's URL to your
Firebase project's Authorized Domains list (under Firebase Authentication).
1. In Firebase Authentication, enable the sign-in methods you'd like
to use (for example, Google Sign In. )

## More information on FirebaseUI and Firebase Authentication
Check out the docs for [FirebaseUI](https://firebase.google.com/docs/auth/web/firebaseui)
and [Firebase Authentication](https://firebase.google.com/docs/auth).

## Serverless Toolbox
Check out more Serverless Toolbox videos at [serverlesstoolbox.com](https://serverlesstoolbox.com).
