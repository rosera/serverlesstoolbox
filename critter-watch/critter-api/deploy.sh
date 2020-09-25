GOOGLE_PROJECT_ID=critterwatcher

gcloud builds submit \
  --tag gcr.io/$GOOGLE_PROJECT_ID/critterwatch-rest-api \
  --project=$GOOGLE_PROJECT_ID

gcloud run deploy critterwatch-rest-api \
  --image gcr.io/$GOOGLE_PROJECT_ID/critterwatch-rest-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --project=$GOOGLE_PROJECT_ID
