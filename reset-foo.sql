delete from foo;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6 (Ubuntu 10.6-1.pgdg18.04+1)
-- Dumped by pg_dump version 10.6 (Ubuntu 10.6-1.pgdg18.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: foo; Type: TABLE DATA; Schema: public; Owner: automatontest
--

INSERT INTO public.foo VALUES ('13a4ad86-e2c3-4979-81e2-a8f102b501c1', 'Foo #1', 101, 'TYPE_A', '2018-11-16 20:58:59.973965', NULL, 'd7df0f2c-9aa8-4845-b2bf-1d02abd3666e');
INSERT INTO public.foo VALUES ('d57dec43-350d-417a-a374-813770eb06af', 'Foo #3', 103, 'TYPE_C', '2018-11-16 20:58:59.983545', NULL, 'dd7924d2-4692-4112-b418-3fce8a3eab30');
INSERT INTO public.foo VALUES ('c3e89a90-b616-43c7-b6a0-0fe937898985', 'Foo #4', 104, 'TYPE_D', '2018-11-16 20:58:59.986506', NULL, '937ee313-fcc9-46a6-8b01-1715c95d0699');
INSERT INTO public.foo VALUES ('c45b5ab6-dabf-400e-982f-27f3f4a5291a', 'Foo #2', 222, 'TYPE_B', '2018-11-16 20:58:59.980557', NULL, '6d6fabca-d7f9-488f-af59-a26cf6402478');


--
-- PostgreSQL database dump complete
--

