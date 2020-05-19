/* Create new database named marketing. */
CREATE DATABASE marketing;
\connect marketing;

CREATE TABLE clients (
   id            SERIAL   PRIMARY KEY,
   client_name   text     NOT NULL,
   industry      text     NOT NULL,
   slogan        text,
   location      text     NOT NULL,
   logo_file     text
);

INSERT INTO clients (client_name, industry, slogan, location, logo_file) VALUES ('SnipSnap Warehouse', 'Candy', 'Snacks in a SnipSnap!', 'Albuquerque, NM', '');
INSERT INTO clients (client_name, industry, slogan, location, logo_file) VALUES ('Pet Theory', 'Veterinary clinics', 'Neither our care nor our prices are ruff.', 'Mountain View, CA', '');
INSERT INTO clients (client_name, industry, slogan, location, logo_file) VALUES ('Photofish', 'Image management', 'Go fishing for great photos.', 'New York, NY', '');
INSERT INTO clients (client_name, industry, slogan, location, logo_file) VALUES ('Party On!', 'Party supply', 'The Party is On at Party On!', 'Chicago, IL', '');
INSERT INTO clients (client_name, industry, slogan, location, logo_file) VALUES ('Listenerr', 'Audiobooks', 'Err, what were you listening to?', 'Toronto, CA', '');
INSERT INTO clients (client_name, industry, slogan, location, logo_file) VALUES ('Artizanship', 'Online arts and crafts', 'Come sail on the ship of art.', 'London, UK', '');
INSERT INTO clients (client_name, industry, slogan, location, logo_file) VALUES ('Quickway Parking', 'Parking', 'Park with Quickway and you will park the quick way!', 'Auckland, NZ', '');
INSERT INTO clients (client_name, industry, slogan, location, logo_file) VALUES ('Emerald Contract', 'Contracts', 'A sparkling new contract!', 'New York, NY', '');
INSERT INTO clients (client_name, industry, slogan, location, logo_file) VALUES ('FaceReplayce', 'Photo effects', 'In a race to replace that face', 'Austin, TX', '');

/* Create user for the API app, and let it is query the clients table. */
CREATE USER "rest-api" WITH ENCRYPTED PASSWORD 'serverlesst00lb0x';
GRANT CONNECT ON database marketing TO "rest-api";
GRANT ALL PRIVILEGES ON TABLE clients TO "rest-api"; 
