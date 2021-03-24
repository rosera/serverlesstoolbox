# Webhooks on Cloud Run

This repository contains the code for the Serverless Toolbox episode [Integrating Webhooks with Cloud Run](https://www.youtube.com/watch?v=53MCPoFr03E).

It demonstrates how to use Cloud Run to host a webhook target. It processes events from Github to 

1. Send notifications to Slack
2. Stream to BigQuery
3. Send a response back to Github

The "monolith" version is used in [Integrating Webhooks with Cloud Run](https://www.youtube.com/watch?v=53MCPoFr03E) and the "microservices" version is used in [Integrating Webhooks with Pub/Sub](https://www.youtube.com/watch?v=tsKZ_u_uIAs).
