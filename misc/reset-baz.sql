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
-- Data for Name: baz; Type: TABLE DATA; Schema: public; Owner: automaton
--
BEGIN;
    delete from public.baz_link;
    delete from public.baz;
    delete from public.baz_value;


INSERT INTO public.baz VALUES ('0801311d-1a7d-42d7-b753-a22a045d5c79', 'Baz #2', 'd7df0f2c-9aa8-4845-b2bf-1d02abd3666e');
INSERT INTO public.baz VALUES ('075d79d4-2845-4f7e-b479-d4858e51df60', 'Baz #7', 'd7df0f2c-9aa8-4845-b2bf-1d02abd3666e');
INSERT INTO public.baz VALUES ('37759f1a-958b-47c8-9f1a-ca29add6642c', 'Baz #10', 'd7df0f2c-9aa8-4845-b2bf-1d02abd3666e');
INSERT INTO public.baz VALUES ('536467f3-ae87-4b9f-ae24-b0ec76c57696', 'Baz #3', '6d6fabca-d7f9-488f-af59-a26cf6402478');
INSERT INTO public.baz VALUES ('114612e9-552a-491f-8a6e-311691234af2', 'Baz #6', '6d6fabca-d7f9-488f-af59-a26cf6402478');
INSERT INTO public.baz VALUES ('1c818d40-2f8d-45dc-8a2a-9a2c619389e3', 'Baz #4', 'dd7924d2-4692-4112-b418-3fce8a3eab30');
INSERT INTO public.baz VALUES ('9d0a40a1-96c5-427e-9329-f03fd1ded1c3', 'Baz #5', 'dd7924d2-4692-4112-b418-3fce8a3eab30');
INSERT INTO public.baz VALUES ('ebe5b68a-6350-44fc-9b5b-aa6589430143', 'Baz #8', 'dd7924d2-4692-4112-b418-3fce8a3eab30');
INSERT INTO public.baz VALUES ('47e8117c-c9e2-4e3f-819c-1f9d160d22e4', 'Baz #9', 'dd7924d2-4692-4112-b418-3fce8a3eab30');
INSERT INTO public.baz VALUES ('dded5ec4-bffb-4956-a2c4-9cd45d812d3d', 'Unnamed Baz', '937ee313-fcc9-46a6-8b01-1715c95d0699');
INSERT INTO public.baz VALUES ('0b61a3b0-446c-4f69-8bd0-604271ba8bb9', 'Baz #1', '937ee313-fcc9-46a6-8b01-1715c95d0699');


--
-- Data for Name: baz_value; Type: TABLE DATA; Schema: public; Owner: automaton
--

INSERT INTO public.baz_value VALUES ('cf6269ac-b81c-4ff8-ba96-1b1353131ded', 'Baz Value #1');
INSERT INTO public.baz_value VALUES ('c9b56f67-cffb-4749-a57d-9da81896ee31', 'Baz Value #2');
INSERT INTO public.baz_value VALUES ('2ee5f199-e23f-46ab-9c4c-277883f5d1af', 'Baz Value #3');
INSERT INTO public.baz_value VALUES ('bf71a28c-deaf-43df-a523-f23de48d8913', 'Baz Value #4');
INSERT INTO public.baz_value VALUES ('28d4a034-e2b6-4c89-9f32-8c7188b7c1d3', 'Baz Value #5');
INSERT INTO public.baz_value VALUES ('4fb0652f-4771-4160-948f-e8eff60df69d', 'Baz Value #7');
INSERT INTO public.baz_value VALUES ('0b622dc7-bebe-4212-89d6-f9c7762152f0', 'Baz Value #8');
INSERT INTO public.baz_value VALUES ('210e203f-48bf-45a6-ab7f-e0a8975c6cf1', 'Baz Value #9');
INSERT INTO public.baz_value VALUES ('999da2fe-ce63-46c5-8ba6-de4fd1b127d4', 'Baz Value #10');
INSERT INTO public.baz_value VALUES ('c5aa38f4-c02f-43da-bd49-2171be9ed06f', 'Baz Value #66');


--
-- Data for Name: baz_link; Type: TABLE DATA; Schema: public; Owner: automaton
--

INSERT INTO public.baz_link VALUES ('4c449f6f-2ad9-4b71-8d57-da0770da9126', '0b61a3b0-446c-4f69-8bd0-604271ba8bb9', 'c5aa38f4-c02f-43da-bd49-2171be9ed06f');
INSERT INTO public.baz_link VALUES ('73894504-f5d5-4522-b041-c92761d5a037', '0b61a3b0-446c-4f69-8bd0-604271ba8bb9', 'cf6269ac-b81c-4ff8-ba96-1b1353131ded');
INSERT INTO public.baz_link VALUES ('14bdd88f-a028-4c06-98d1-97a36ccc8c6e', '1c818d40-2f8d-45dc-8a2a-9a2c619389e3', 'cf6269ac-b81c-4ff8-ba96-1b1353131ded');
INSERT INTO public.baz_link VALUES ('266e9f05-e48d-416d-a375-eafa6a1d836e', '075d79d4-2845-4f7e-b479-d4858e51df60', '0b622dc7-bebe-4212-89d6-f9c7762152f0');
INSERT INTO public.baz_link VALUES ('615222cf-cae5-431a-99a5-89520d084167', 'ebe5b68a-6350-44fc-9b5b-aa6589430143', '210e203f-48bf-45a6-ab7f-e0a8975c6cf1');
INSERT INTO public.baz_link VALUES ('b35b9440-f671-47b2-838e-567c11c7cdb2', 'ebe5b68a-6350-44fc-9b5b-aa6589430143', 'c5aa38f4-c02f-43da-bd49-2171be9ed06f');
INSERT INTO public.baz_link VALUES ('1050ae37-bbbb-4eb9-986b-0366d620e2bc', '37759f1a-958b-47c8-9f1a-ca29add6642c', '999da2fe-ce63-46c5-8ba6-de4fd1b127d4');
INSERT INTO public.baz_link VALUES ('a34cef08-392d-47fe-a320-3cdb5e579bcd', '37759f1a-958b-47c8-9f1a-ca29add6642c', '28d4a034-e2b6-4c89-9f32-8c7188b7c1d3');


--
-- PostgreSQL database dump complete
--
COMMIT;
