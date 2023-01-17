INSERT INTO jober_pre_task.profile_card (name,created_at,updated_at,deleted_at,information) VALUES
	 ('dummy_profile_1','2023-01-15 14:53:00','2023-01-17 05:28:06',NULL,'{"DOB": "2023-01-11T05:28:05.529Z", "email": "qweqwe@qweqwe", "phone": "123123123", "gender": "man", "address": "", "nickname": "baku"}'),
	 ('test name','2023-01-16 00:39:29','2023-01-16 00:39:29',NULL,'{"DOB": "940220", "age": 30, "email": "qweqwe@qweqwe", "phone": "123123123", "gender": "man", "address": "", "nickname": "baku"}'),
	 ('test','2023-01-16 04:38:10','2023-01-16 04:38:10',NULL,'{"DOB": null, "email": "", "phone": "", "gender": "", "address": "", "nickname": ""}'),
	 ('test2','2023-01-16 04:42:06','2023-01-17 05:34:48',NULL,'{"DOB": null, "email": "qwe", "phone": "", "gender": "", "address": "", "nickname": ""}'),
	 ('test3','2023-01-16 04:42:36','2023-01-17 00:58:41','2023-01-17 00:58:41','{"DOB": null, "email": "", "phone": "", "gender": "", "address": "", "nickname": ""}'),
	 ('test4','2023-01-16 04:42:41','2023-01-16 04:42:41',NULL,'{"DOB": null, "email": "", "phone": "", "gender": "", "address": "", "nickname": ""}'),
	 ('test5','2023-01-16 04:42:45','2023-01-17 05:42:31',NULL,'{"DOB": null, "email": "qwe", "phone": "", "gender": "", "address": "", "nickname": ""}'),
	 ('test6','2023-01-16 04:42:49','2023-01-17 03:03:34','2023-01-17 03:03:34','{"DOB": null, "email": "", "phone": "", "gender": "", "address": "", "nickname": ""}'),
	 ('test7','2023-01-16 04:42:54','2023-01-16 04:42:54',NULL,'{"DOB": null, "email": "", "phone": "", "gender": "", "address": "", "nickname": ""}'),
	 ('test8','2023-01-16 04:42:57','2023-01-16 04:42:57',NULL,'{"DOB": null, "email": "", "phone": "", "gender": "", "address": "", "nickname": ""}');
	
INSERT INTO jober_pre_task.career (information,created_at,updated_at,deleted_at,ProfileCardId) VALUES
	 ('{"end_date": "", "position": "", "start_date": "2021-02-23", "company_name": "jober"}','2023-01-16 01:11:34','2023-01-16 01:11:34',NULL,2),
	 ('{"end_date": "2023-01-11T05:03:06.628Z", "position": "qwe", "start_date": "2021-02-22T15:00:00.000Z", "company_name": "google"}','2023-01-16 02:50:07','2023-01-17 05:16:29',NULL,1),
	 ('{"end_date": "", "position": "", "start_date": "2021-02-23", "company_name": "amazon"}','2023-01-16 02:51:03','2023-01-16 02:51:03',NULL,2),
	 ('{"end_date": "2023-01-04T04:58:57.074Z", "position": "", "start_date": "2021-02-22T15:00:00.000Z", "company_name": "amazon"}','2023-01-17 02:47:43','2023-01-17 04:58:58',NULL,1),
	 ('{}','2023-01-17 02:50:44','2023-01-17 02:50:44',NULL,1),
	 ('{}','2023-01-17 03:16:16','2023-01-17 03:16:16',NULL,1),
	 ('{}','2023-01-17 03:16:22','2023-01-17 03:16:22',NULL,1),
	 ('{}','2023-01-17 04:44:45','2023-01-17 04:44:45',NULL,1),
	 ('{}','2023-01-17 05:17:46','2023-01-17 05:17:46',NULL,8),
	 ('{"end_date": null, "start_date": "2023-01-06T05:40:09.005Z"}','2023-01-17 05:39:59','2023-01-17 06:02:05',NULL,7);