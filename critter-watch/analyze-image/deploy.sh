export CLOUD_BUCKET_NAME=bucket_name_here

gcloud functions deploy analyzeImage \
--runtime nodejs12
--trigger-resource critter-watch-photos \
--tirgger-event google.storage.object.finalize