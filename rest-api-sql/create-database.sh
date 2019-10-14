# This script creates the Cloud SQL database that will be used by the REST API.
# At the end of the script, a connection is opened to the newly created
# database. Enter the root password when prompted. When connected to the
# database, paste in the contents of the file load-data.sql. This will load
# some test data into the database.

PROJECT_ID=serverless-toolbox
ROOT_PASSWORD=qwerty
INSTANCE_NAME=mydb
DB_NAME=pet-theory

gcloud sql instances create $INSTANCE_NAME \
  --region=us-central \
  --root-password=$ROOT_PASSWORD \
  --project=$PROJECT_ID

gcloud sql databases create $DB_NAME \
  --instance=$INSTANCE_NAME \
  --project=$PROJECT_ID

gcloud sql connect $INSTANCE_NAME \
  --user=root \
  --project=$PROJECT_ID
