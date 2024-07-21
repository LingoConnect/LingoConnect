-- init/01_init.sql
CREATE USER lingo WITH ENCRYPTED PASSWORD 'lingo';
CREATE DATABASE lingoconnect;
GRANT ALL PRIVILEGES ON DATABASE lingoconnect TO lingo;
