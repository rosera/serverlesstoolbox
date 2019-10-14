# This script deploys the REST API code (index.js) to Cloud Run. When it has
# run, try opening the URL of the newly deployed service, followed by "/1".
# Using Postman or another REST API tool, you can POST new appointments,
# search for appointments, and delete appointmenst.

PROJECT_ID=serverless-toolbox
ROOT_PASSWORD=qwerty
INSTANCE_NAME=mydb
DB_NAME=pet-theory

gcloud builds submit --tag gcr.io/$PROJECT_ID/pet-theory-appointments \
  --project $PROJECT_ID

gcloud beta run deploy pet-theory-appointments \
  --image gcr.io/$PROJECT_ID/pet-theory-appointments \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-cloudsql-instances $INSTANCE_NAME \
  --update-env-vars INST_CON_NAME=$PROJECT_ID:us-central1:$INSTANCE_NAME,SQL_USER=root,SQL_PASSWORD=$ROOT_PASSWORD,SQL_NAME=$DB_NAME \
  --project $PROJECT_ID
