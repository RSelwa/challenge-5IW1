<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240131233846 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE "user" (id UUID NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE admin (id UUID NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE employee (id UUID NOT NULL, establishment_id UUID NOT NULL, category VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5D9F75A18565851 ON employee (establishment_id)');
        $this->addSql('CREATE TABLE employee_specific_schedule (id UUID NOT NULL, employee_id UUID DEFAULT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, type VARCHAR(255) NOT NULL, start_time_morning VARCHAR(255) DEFAULT NULL, end_time_morning VARCHAR(255) DEFAULT NULL, start_time_afternoon VARCHAR(255) DEFAULT NULL, end_time_afternoon VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6B74964D8C03F15C ON employee_specific_schedule (employee_id)');
        $this->addSql('CREATE TABLE employee_week_schedule (id UUID NOT NULL, employee_id UUID NOT NULL, start_time_morning VARCHAR(255) DEFAULT NULL, end_time_morning VARCHAR(255) DEFAULT NULL, start_time_afternoon VARCHAR(255) DEFAULT NULL, end_time_afternoon VARCHAR(255) DEFAULT NULL, day INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9485D6358C03F15C ON employee_week_schedule (employee_id)');
        $this->addSql('CREATE TABLE establishment (id UUID NOT NULL, organization_id UUID NOT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, zip_code VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, lat DOUBLE PRECISION DEFAULT NULL, lng DOUBLE PRECISION DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DBEFB1EE32C8A3DE ON establishment (organization_id)');
        $this->addSql('CREATE TABLE notations (id INT NOT NULL, id_notation_target_id UUID NOT NULL, id_notation_from_id UUID NOT NULL, note INT NOT NULL, comment VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9B69C07CC673C2D7 ON notations (id_notation_target_id)');
        $this->addSql('CREATE INDEX IDX_9B69C07CF1DE2CB1 ON notations (id_notation_from_id)');
        $this->addSql('CREATE TABLE organization (id UUID NOT NULL, name VARCHAR(255) NOT NULL, manager_firstname VARCHAR(255) NOT NULL, manager_lastname VARCHAR(255) NOT NULL, kbis VARCHAR(255) NOT NULL, siret VARCHAR(255) DEFAULT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE service (id UUID NOT NULL, employee_id UUID DEFAULT NULL, name VARCHAR(255) NOT NULL, duration INT NOT NULL, price INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E19D9AD28C03F15C ON service (employee_id)');
        $this->addSql('CREATE TABLE slot (id UUID NOT NULL, user_id UUID DEFAULT NULL, service_id UUID NOT NULL, start_time VARCHAR(255) NOT NULL, duration VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_AC0E2067A76ED395 ON slot (user_id)');
        $this->addSql('CREATE INDEX IDX_AC0E2067ED5CA9E6 ON slot (service_id)');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A18565851 FOREIGN KEY (establishment_id) REFERENCES establishment (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employee_specific_schedule ADD CONSTRAINT FK_6B74964D8C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employee_week_schedule ADD CONSTRAINT FK_9485D6358C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE establishment ADD CONSTRAINT FK_DBEFB1EE32C8A3DE FOREIGN KEY (organization_id) REFERENCES organization (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE notations ADD CONSTRAINT FK_9B69C07CC673C2D7 FOREIGN KEY (id_notation_target_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE notations ADD CONSTRAINT FK_9B69C07CF1DE2CB1 FOREIGN KEY (id_notation_from_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE service ADD CONSTRAINT FK_E19D9AD28C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT FK_AC0E2067A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT FK_AC0E2067ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE employee DROP CONSTRAINT FK_5D9F75A18565851');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP CONSTRAINT FK_6B74964D8C03F15C');
        $this->addSql('ALTER TABLE employee_week_schedule DROP CONSTRAINT FK_9485D6358C03F15C');
        $this->addSql('ALTER TABLE establishment DROP CONSTRAINT FK_DBEFB1EE32C8A3DE');
        $this->addSql('ALTER TABLE notations DROP CONSTRAINT FK_9B69C07CC673C2D7');
        $this->addSql('ALTER TABLE notations DROP CONSTRAINT FK_9B69C07CF1DE2CB1');
        $this->addSql('ALTER TABLE service DROP CONSTRAINT FK_E19D9AD28C03F15C');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT FK_AC0E2067A76ED395');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT FK_AC0E2067ED5CA9E6');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('DROP TABLE admin');
        $this->addSql('DROP TABLE employee');
        $this->addSql('DROP TABLE employee_specific_schedule');
        $this->addSql('DROP TABLE employee_week_schedule');
        $this->addSql('DROP TABLE establishment');
        $this->addSql('DROP TABLE notations');
        $this->addSql('DROP TABLE organization');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE slot');
    }
}
