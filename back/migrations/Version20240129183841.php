<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240129183841 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE employee_week_schedule (id UUID NOT NULL, employee_id UUID NOT NULL, start_time_morning VARCHAR(255) DEFAULT NULL, end_time_morning VARCHAR(255) DEFAULT NULL, start_time_afternoon VARCHAR(255) DEFAULT NULL, end_time_afternoon VARCHAR(255) DEFAULT NULL, day INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9485D6358C03F15C ON employee_week_schedule (employee_id)');
        $this->addSql('CREATE TABLE notations (id INT NOT NULL, id_notation_target_id UUID NOT NULL, id_notation_from_id UUID NOT NULL, note INT NOT NULL, comment VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9B69C07CC673C2D7 ON notations (id_notation_target_id)');
        $this->addSql('CREATE INDEX IDX_9B69C07CF1DE2CB1 ON notations (id_notation_from_id)');
        $this->addSql('ALTER TABLE employee_week_schedule ADD CONSTRAINT FK_9485D6358C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE notations ADD CONSTRAINT FK_9B69C07CC673C2D7 FOREIGN KEY (id_notation_target_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE notations ADD CONSTRAINT FK_9B69C07CF1DE2CB1 FOREIGN KEY (id_notation_from_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employee DROP CONSTRAINT fk_5d9f75a1ed5ca9e6');
        $this->addSql('DROP INDEX uniq_5d9f75a1ed5ca9e6');
        $this->addSql('ALTER TABLE employee ADD category VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE employee ADD email VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE employee ADD password VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE employee DROP service_id');
        $this->addSql('ALTER TABLE employee_specific_schedule ADD start_time_morning VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE employee_specific_schedule ADD end_time_morning VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE employee_specific_schedule ADD start_time_afternoon VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE employee_specific_schedule ADD end_time_afternoon VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP start_time');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP end_time');
        $this->addSql('ALTER TABLE establishment ADD lat DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE establishment ADD lng DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE service ADD employee_id UUID NOT NULL');
        $this->addSql('ALTER TABLE service ADD employee_id_id UUID NOT NULL');
        $this->addSql('ALTER TABLE service ADD CONSTRAINT FK_E19D9AD28C03F15C FOREIGN KEY (employee_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE service ADD CONSTRAINT FK_E19D9AD29749932E FOREIGN KEY (employee_id_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_E19D9AD28C03F15C ON service (employee_id)');
        $this->addSql('CREATE INDEX IDX_E19D9AD29749932E ON service (employee_id_id)');
        $this->addSql('ALTER TABLE slot ADD duration VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE slot DROP date');
        $this->addSql('ALTER TABLE slot DROP end_time');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE employee_week_schedule DROP CONSTRAINT FK_9485D6358C03F15C');
        $this->addSql('ALTER TABLE notations DROP CONSTRAINT FK_9B69C07CC673C2D7');
        $this->addSql('ALTER TABLE notations DROP CONSTRAINT FK_9B69C07CF1DE2CB1');
        $this->addSql('DROP TABLE employee_week_schedule');
        $this->addSql('DROP TABLE notations');
        $this->addSql('ALTER TABLE employee_specific_schedule ADD start_time VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE employee_specific_schedule ADD end_time VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP start_time_morning');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP end_time_morning');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP start_time_afternoon');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP end_time_afternoon');
        $this->addSql('ALTER TABLE slot ADD end_time VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE slot RENAME COLUMN duration TO date');
        $this->addSql('ALTER TABLE establishment DROP lat');
        $this->addSql('ALTER TABLE establishment DROP lng');
        $this->addSql('ALTER TABLE service DROP CONSTRAINT FK_E19D9AD28C03F15C');
        $this->addSql('ALTER TABLE service DROP CONSTRAINT FK_E19D9AD29749932E');
        $this->addSql('DROP INDEX IDX_E19D9AD28C03F15C');
        $this->addSql('DROP INDEX IDX_E19D9AD29749932E');
        $this->addSql('ALTER TABLE service DROP employee_id');
        $this->addSql('ALTER TABLE service DROP employee_id_id');
        $this->addSql('ALTER TABLE employee ADD service_id UUID DEFAULT NULL');
        $this->addSql('ALTER TABLE employee DROP category');
        $this->addSql('ALTER TABLE employee DROP email');
        $this->addSql('ALTER TABLE employee DROP password');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT fk_5d9f75a1ed5ca9e6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_5d9f75a1ed5ca9e6 ON employee (service_id)');
    }
}
