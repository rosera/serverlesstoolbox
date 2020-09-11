gcloud functions deploy analyzeImage \
--runtime nodejs10 \
--trigger-resource critterwatcher-uploads \
--trigger-event google.storage.object.finalize