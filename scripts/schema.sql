CREATE DATABASE jober_pre_task CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE jober_pre_task;

-- jober_pre_task.profile_card definition

CREATE TABLE profile_card (
    id int auto_increment primary key,
    name varchar(100) not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at timestamp null,
	information json NOT NULL
);

-- jober_pre_task.career definition

CREATE TABLE `career` (
  `id` int NOT NULL AUTO_INCREMENT,
  `information` json NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `ProfileCardId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ProfileCardId` (`ProfileCardId`),
  FOREIGN KEY (`ProfileCardId`) REFERENCES `profile_card` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);