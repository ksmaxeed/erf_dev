-- MySQL Workbench Synchronization
-- Generated: 2019-08-06 23:11
-- Model: models of Monorails
-- Version: 1.0
-- Project: Monorails
-- Author: Kota

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER SCHEMA `monorails`  DEFAULT COLLATE utf8mb4_bin ;

CREATE TABLE IF NOT EXISTS `monorails`.`user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  `user_name` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;

CREATE TABLE IF NOT EXISTS `monorails`.`user_book` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  `book_name` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_book_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_book_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `monorails`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;

CREATE TABLE IF NOT EXISTS `monorails`.`user_group` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  `group_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;

CREATE TABLE IF NOT EXISTS `monorails`.`user_phone` (
  `user_id` BIGINT(20) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  `phone_number` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_non_id_table_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `monorails`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;

CREATE TABLE IF NOT EXISTS `monorails`.`user_has_user_group` (
  `user_id` BIGINT(20) NOT NULL,
  `user_group_id` BIGINT(20) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`user_id`, `user_group_id`),
  INDEX `fk_user_has_user_group_user_group1_idx` (`user_group_id` ASC),
  INDEX `fk_user_has_user_group_user1_idx` (`user_id` ASC),
  INDEX `unique1` (`user_id` ASC, `user_group_id` ASC),
  CONSTRAINT `fk_user_has_user_group_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `monorails`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_user_group_user_group1`
    FOREIGN KEY (`user_group_id`)
    REFERENCES `monorails`.`user_group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
