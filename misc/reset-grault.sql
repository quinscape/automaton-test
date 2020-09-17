--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


delete from public.grault;
delete from public.app_attachment_data;
delete from public.app_attachment;

--
-- Data for Name: app_attachment; Type: TABLE DATA; Schema: public; Owner: automatontest
--

INSERT INTO public.app_attachment VALUES ('8973dd4f-2c76-45ab-9da8-f08a5d9e9f1e', 'hello.txt', 'text/plain', NULL);


--
-- Data for Name: app_attachment_data; Type: TABLE DATA; Schema: public; Owner: automatontest
--

INSERT INTO public.app_attachment_data VALUES ('f46df0ff-0069-40c3-8fb8-e249a91d396b', '8973dd4f-2c76-45ab-9da8-f08a5d9e9f1e', '\x48656c6c6f2066726f6d2074686520746578742066696c650a0a');


--
-- Data for Name: grault; Type: TABLE DATA; Schema: public; Owner: automatontest
--

INSERT INTO public.grault VALUES ('88efc85e-27de-4d2a-bedb-d0bbb3dab2d0', 'Grault #1', '8973dd4f-2c76-45ab-9da8-f08a5d9e9f1e', 'https://quinscape.de');
INSERT INTO public.grault VALUES ('981e7df8-dfd5-4247-a3bf-d2951f33a67d', 'Grault #2', NULL, NULL);


--
-- PostgreSQL database dump complete
--

