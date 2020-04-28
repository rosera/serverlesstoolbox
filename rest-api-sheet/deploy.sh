# GOOGLE_PROJECT_ID=  # YOUR GCP PROJECT ID GOES HERE
# SHEET_ID=           # ID OF YOUR GOOGLE SHEET (e.g. 1rcj3SbeK_VcMOBrwwdAksJXQVoHTZHRzVOBO8A3X148)
TAB_ID=Ingredients    # TEXT TITLE OF THE TAB IN YOUR SHEET (e.g. Ingredients)

# The service currently reads from the "Ingredients" tab in the Google Sheet
# https://docs.google.com/spreadsheets/d/1rcj3SbeK_VcMOBrwwdAksJXQVoHTZHRzVOBO8A3X148/edit#gid=0
# Feel free to make a copy of that sheet and adapt it and the code to your needs.

if [ -z "$GOOGLE_PROJECT_ID" ] || [ -z "$SHEET_ID" ] || [ -z "$TAB_ID" ]; then
  echo 'Please set GOOGLE_PROJECT_ID, SHEET_ID and TAB_ID in this file.'
  exit 1
fi

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/slipslap-warehouse \
  --project=$GOOGLE_PROJECT_ID

gcloud run deploy slipslap-warehouse \
  --image gcr.io/$GOOGLE_PROJECT_ID/slipslap-warehouse \
  --platform managed \
  --region us-central1 \
  --set-env-vars SHEET_ID=$SHEET_ID,TAB_ID=$TAB_ID \
  --project=$GOOGLE_PROJECT_ID \
  --allow-unauthenticated
