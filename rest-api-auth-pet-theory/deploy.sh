# This script deploys the REST API code (index.js) to Cloud Run. When it has
# run, try opening the URL of the newly deployed service, followed by
# "/api/appointments/1".
# Using Postman or another REST API tool, you can POST new appointments,
# search for appointments, and delete appointmenst.

PROJECT_ID=$(gcloud config get-value project)
ROOT_PASSWORD=serverlesst00lb0x
INSTANCE_NAME=pet-theory-instance
REGION=us-central1
INST_CON_NAME=$PROJECT_ID:$REGION:$INSTANCE_NAME
DB_NAME=pet_theory_db

gcloud builds submit --tag gcr.io/$PROJECT_ID/pet-theory-appointments \
  --project $PROJECT_ID

gcloud beta run deploy pet-theory-appointments \
  --image gcr.io/$PROJECT_ID/pet-theory-appointments \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-cloudsql-instances $INST_CON_NAME \
  --update-env-vars INST_CON_NAME=$INST_CON_NAME,SQL_USER=root,SQL_PASSWORD=$ROOT_PASSWORD,SQL_NAME=$DB_NAME \
  --project $PROJECT_ID
