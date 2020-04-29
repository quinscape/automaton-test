--
-- PostgreSQL database dump
--

-- Dumped from database version 10.11 (Ubuntu 10.11-1.pgdg18.04+1)
-- Dumped by pg_dump version 10.11 (Ubuntu 10.11-1.pgdg18.04+1)

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

BEGIN;

delete from public.corge_link;
delete from public.corge_assoc;
delete from public.corge;

delete from public.app_version where entity_type = 'Corge';

-- Data for Name: corge; Type: TABLE DATA; Schema: public; Owner: automatontest
--

INSERT INTO public.corge VALUES ('56f693a4-2985-45f2-8149-ac8e88f0ae7c', 'a92dc002-90da-4b70-9a14-48e6f47c6ba7', 'Corge #2', 1385, 1508, 'ec2ae4c3-6615-4c77-b07e-d1c879dc69cb', '2020-03-19 16:16:31.948', 'Description #2', '937ee313-fcc9-46a6-8b01-1715c95d0699', false, 'ec2ae4c3-6615-4c77-b07e-d1c879dc69cb');
INSERT INTO public.corge VALUES ('8a6eed1e-c705-4cc3-9a80-c4661e9941cd', 'd2c65e7c-3ecd-4e1c-9b2e-514169a822ea', 'Corge #4', 1660, 1783, 'ec2ae4c3-6615-4c77-b07e-d1c879dc69cb', '2020-03-19 16:16:31.948', 'Description #4', 'd7df0f2c-9aa8-4845-b2bf-1d02abd3666e', false, 'ec2ae4c3-6615-4c77-b07e-d1c879dc69cb');
INSERT INTO public.corge VALUES ('2ce45ac5-c74d-46f4-8823-77bc84647913', 'b6c7e003-4c43-4c77-b655-fe9db9e4b14a', 'Corge #5', 1925, 2048, '964d2966-7c30-4ffa-902e-54d8d7527ed8', '2020-03-19 16:16:31.948', 'Description #5', '6d6fabca-d7f9-488f-af59-a26cf6402478', true, '964d2966-7c30-4ffa-902e-54d8d7527ed8');
INSERT INTO public.corge VALUES ('4212e6a3-f522-43ed-b3aa-c997ae335395', '6775b218-0abf-45e9-b509-91a5c9d3268c', 'Corge #6', 1426, 1549, '964d2966-7c30-4ffa-902e-54d8d7527ed8', '2020-03-19 16:16:31.949', 'Description #6', 'af432487-a1b1-4f99-96d4-3b8e9796c95a', false, '964d2966-7c30-4ffa-902e-54d8d7527ed8');
INSERT INTO public.corge VALUES ('b2c38b56-0323-4e08-b4b6-40f7d1cb2c86', 'f7d4d1ec-2091-4e77-9ed0-733f0292083a', 'Corge #7', 1191, 1314, '964d2966-7c30-4ffa-902e-54d8d7527ed8', '2020-03-19 16:16:31.949', 'Description #7', '6d6fabca-d7f9-488f-af59-a26cf6402478', false, '964d2966-7c30-4ffa-902e-54d8d7527ed8');
INSERT INTO public.corge VALUES ('1f1dde6a-8930-4556-88d1-5052bcbb697c', '7c69616b-6b2e-4e1f-a40e-2d1e795759b0', 'Corge #8', 1607, 1730, '964d2966-7c30-4ffa-902e-54d8d7527ed8', '2020-03-19 16:16:31.949', 'Description #8', '6d6fabca-d7f9-488f-af59-a26cf6402478', true, '964d2966-7c30-4ffa-902e-54d8d7527ed8');
INSERT INTO public.corge VALUES ('7f311921-f929-44c6-a4d3-2a1af62ae833', 'cce04411-ca07-4e3b-b0f2-f4672bbe71cd', 'Corge #9', 1264, 1387, '964d2966-7c30-4ffa-902e-54d8d7527ed8', '2020-03-19 16:16:31.949', 'Description #9', 'd7df0f2c-9aa8-4845-b2bf-1d02abd3666e', true, '964d2966-7c30-4ffa-902e-54d8d7527ed8');
INSERT INTO public.corge VALUES ('959b7a0e-ca76-4ffd-9069-a517003cc88e', '1dacfa64-0c2d-4957-98c3-16f295a25788', 'Corge #10', 1669, 1792, 'ec2ae4c3-6615-4c77-b07e-d1c879dc69cb', '2020-03-19 16:16:31.949', 'Description #10', '6d6fabca-d7f9-488f-af59-a26cf6402478', false, 'ec2ae4c3-6615-4c77-b07e-d1c879dc69cb');
INSERT INTO public.corge VALUES ('87a07c18-896c-4114-8f86-00e39b64a79a', '7b266418-ed1a-49be-b6db-8beffb4ca0a6', 'Corge #3', 1288, 1411, 'ec2ae4c3-6615-4c77-b07e-d1c879dc69cb', '2020-03-19 16:16:31.948', 'Description #3', 'd7df0f2c-9aa8-4845-b2bf-1d02abd3666e', true, 'ec2ae4c3-6615-4c77-b07e-d1c879dc69cb');
INSERT INTO public.corge VALUES ('20bbb666-79d1-4a50-8b23-4442be8b615e', '9920a2aa-8554-4396-95ba-70ca9cb9bca1', 'Corge #1', 1324, 1447, 'ec2ae4c3-6615-4c77-b07e-d1c879dc69cb', '2020-03-19 16:16:31.945', 'Description #1', 'd7df0f2c-9aa8-4845-b2bf-1d02abd3666e', false, 'ec2ae4c3-6615-4c77-b07e-d1c879dc69cb');


--
-- Data for Name: corge_assoc; Type: TABLE DATA; Schema: public; Owner: automatontest
--

INSERT INTO public.corge_assoc VALUES ('269fe0b9-4d22-4f2d-adc4-541bc9f719b3', '98281330-e76a-4e6a-9696-c55e5d6121f8', 'Assoc #1', 1001, 'Description #1');
INSERT INTO public.corge_assoc VALUES ('421869b0-5c98-448c-bd2f-2d1ecf002535', 'f9fef6c2-d7e3-49ef-b570-98ec6fdc02d0', 'Assoc #2', 1002, 'Description #2');
INSERT INTO public.corge_assoc VALUES ('3a66eec3-2cea-4385-9205-c197e587b5c5', '851d8064-6564-4366-ac4c-f5d16b7d1b33', 'Assoc #3', 1003, 'Description #3');
INSERT INTO public.corge_assoc VALUES ('af086502-27c0-4a07-8d8b-07568ecbc448', 'df49f6ec-2381-4e36-ace0-5898985a41a0', 'Assoc #4', 1004, 'Description #4');
INSERT INTO public.corge_assoc VALUES ('d254bfb0-8413-4106-9f80-885d1bdd3ef8', '42920f67-0e60-4a04-ab81-9cca14cd7b0a', 'Assoc #5', 1005, 'Description #5');


--
-- Data for Name: corge_link; Type: TABLE DATA; Schema: public; Owner: automatontest
--

INSERT INTO public.corge_link VALUES ('c93eaf4e-525d-45f9-9baa-523376d6400e', '4ea96e5f-a114-4d3f-ae30-a715bc9a4612', '20bbb666-79d1-4a50-8b23-4442be8b615e', '421869b0-5c98-448c-bd2f-2d1ecf002535');
INSERT INTO public.corge_link VALUES ('d938c01c-c6fd-4f6b-9345-e19728135646', '9a2c8b4c-850c-4a85-a539-a2f0f1b6c73c', '20bbb666-79d1-4a50-8b23-4442be8b615e', 'af086502-27c0-4a07-8d8b-07568ecbc448');
INSERT INTO public.corge_link VALUES ('69f180ea-57ee-4c10-a3b8-fc1dd40c32ec', '4e72e7fb-c9d0-446e-9386-b6363f9e184b', '56f693a4-2985-45f2-8149-ac8e88f0ae7c', '421869b0-5c98-448c-bd2f-2d1ecf002535');
INSERT INTO public.corge_link VALUES ('2f1691fe-e8ae-449e-9c28-69720fa8dfda', '56fdb591-e89c-488d-9b96-b0458b8082b4', '2ce45ac5-c74d-46f4-8823-77bc84647913', '421869b0-5c98-448c-bd2f-2d1ecf002535');
INSERT INTO public.corge_link VALUES ('8322f7d3-108b-4e71-86d7-3597e2d48b6e', '3fb21ae4-39e5-4545-ae07-4eb036be730b', '20bbb666-79d1-4a50-8b23-4442be8b615e', '269fe0b9-4d22-4f2d-adc4-541bc9f719b3');
INSERT INTO public.corge_link VALUES ('d26fe4df-f47d-4ed6-ae88-f47606c602dc', '3e1f5d81-937e-4195-8fec-a95168128af4', '87a07c18-896c-4114-8f86-00e39b64a79a', 'd254bfb0-8413-4106-9f80-885d1bdd3ef8');
INSERT INTO public.corge_link VALUES ('0ad4691a-cd91-4a88-ac0b-01491874469e', 'f78b9a36-6d7b-4a3d-9d9b-23d59d41df7b', '87a07c18-896c-4114-8f86-00e39b64a79a', 'af086502-27c0-4a07-8d8b-07568ecbc448');
INSERT INTO public.corge_link VALUES ('f3a9834f-b3b6-452f-95cb-8cc7a1111527', 'a4bddfb9-5e91-42f4-875e-2fcfde830b06', '8a6eed1e-c705-4cc3-9a80-c4661e9941cd', 'af086502-27c0-4a07-8d8b-07568ecbc448');
INSERT INTO public.corge_link VALUES ('54bdc406-e970-434e-b239-35ae8d0140b9', 'b98821b4-52c5-4c35-8119-b5b0a24360dd', '87a07c18-896c-4114-8f86-00e39b64a79a', '269fe0b9-4d22-4f2d-adc4-541bc9f719b3');
INSERT INTO public.corge_link VALUES ('ecfe1e62-a3a5-4ea1-b29a-55351b692100', 'ae42e310-86e4-4006-abf6-9c311f52f8a5', '20bbb666-79d1-4a50-8b23-4442be8b615e', '3a66eec3-2cea-4385-9205-c197e587b5c5');


--
-- PostgreSQL database dump complete
--
COMMIT;
