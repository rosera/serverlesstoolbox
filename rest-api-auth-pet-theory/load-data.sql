use pet_theory_db;

CREATE TABLE appointments (
  id INT NOT NULL AUTO_INCREMENT,
  clinic_id INT NOT NULL,
  user_id VARCHAR(1024) NOT NULL,
  start_ts INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO appointments (clinic_id, user_id, start_ts) VALUES (1, 't6qxk85qEGM619gNXcAxmrjmK312', 1564668000);
INSERT INTO appointments (clinic_id, user_id, start_ts) VALUES (1, 't6qxk85qEGM619gNXcAxmrjmK312', 1564668000);
INSERT INTO appointments (clinic_id, user_id, start_ts) VALUES (2, 't6qxk85qEGM619gNXcAxmrjmK312', 1567328400);
INSERT INTO appointments (clinic_id, user_id, start_ts) VALUES (3, 't6qxk85qEGM619gNXcAxmrjmK312', 1569920400);

SELECT * FROM appointments;
