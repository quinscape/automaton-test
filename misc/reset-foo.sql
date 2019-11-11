
--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-1.pgdg18.04+1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-1.pgdg18.04+1)

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

--
-- Data for Name: foo; Type: TABLE DATA; Schema: public; Owner: automatontest
--

begin;

delete from public.foo;

INSERT INTO public.foo VALUES ('d57dec43-350d-417a-a374-813770eb06af', 'Foo #33', 103, 'TYPE_C', '2018-11-16 20:58:59.983', NULL, 'dd7924d2-4692-4112-b418-3fce8a3eab30', false);
INSERT INTO public.foo VALUES ('c45b5ab6-dabf-400e-982f-27f3f4a5291a', 'Foo #22', 222, 'TYPE_B', '2018-11-16 20:58:59.98', 'xxx', 'af432487-a1b1-4f99-96d4-3b8e9796c95a', true);
INSERT INTO public.foo VALUES ('c3e89a90-b616-43c7-b6a0-0fe937898985', 'Foo #4', 104, 'TYPE_D', '2018-11-16 20:58:59.986', 'xxx', 'af432487-a1b1-4f99-96d4-3b8e9796c95a', true);
INSERT INTO public.foo VALUES ('51cb3a62-92a6-446d-94ae-5d5d844ea5b5', 'Foo #6', 123, 'TYPE_A', '2019-03-06 18:19:21.777566', '', 'af432487-a1b1-4f99-96d4-3b8e9796c95a', true);
INSERT INTO public.foo VALUES ('db181d0e-b78c-4d81-8f75-4138777028fe', 'Foo #7', 123, 'TYPE_A', '2019-03-06 18:19:40.966051', '', 'd7df0f2c-9aa8-4845-b2bf-1d02abd3666e', true);
INSERT INTO public.foo VALUES ('8513369a-9605-42cf-ad4f-80e94e050954', 'Foo #8', 123, 'TYPE_C', '2019-03-06 18:19:56.972929', '', '6d6fabca-d7f9-488f-af59-a26cf6402478', true);
INSERT INTO public.foo VALUES ('13a4ad86-e2c3-4979-81e2-a8f102b501c1', 'Foo #1', 123456, 'TYPE_B', '2018-11-01 19:58:59', 'desc ', 'd7df0f2c-9aa8-4845-b2bf-1d02abd3666e', true);

commit;

--
-- PostgreSQL database dump complete
--

