# GOOGLE_PROJECT_ID=[YOUR GCP PROJECT ID GOES HERE]

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/store-service \
  --project $GOOGLE_PROJECT_ID

gcloud beta run deploy store-service \
  --image gcr.io/$GOOGLE_PROJECT_ID/store-service \
  --platform managed \
  --allow-unauthenticated \
  --region us-central1 \
  --project $GOOGLE_PROJECT_ID
