# At the end of the script, a connection is opened to the newly created
# database. Enter the root password when prompted. When connected to the
# database, paste in the contents of the file load-data.sql. This will load
# some test data into the database.

PROJECT_ID=$(gcloud config get-value project)
ROOT_PASSWORD=serverlesst00lb0x
INSTANCE_NAME=pet-theory-instance
REGION=us-central1-a
DB_NAME=pet_theory_db

gcloud sql instances create $INSTANCE_NAME \
  --region=$REGION \
  --root-password=$ROOT_PASSWORD \
  --project=$PROJECT_ID

gcloud sql databases create $DB_NAME \
  --instance=$INSTANCE_NAME \
  --project=$PROJECT_ID

gcloud sql connect $INSTANCE_NAME \
  --user=root \
  --project=$PROJECT_ID
