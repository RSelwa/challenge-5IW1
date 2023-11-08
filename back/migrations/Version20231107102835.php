<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231107102835 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE admin (id UUID NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE booking (id UUID NOT NULL, user_id UUID NOT NULL, employee_id UUID NOT NULL, status VARCHAR(255) NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, start_time VARCHAR(255) NOT NULL, end_time VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E00CEDDEA76ED395 ON booking (user_id)');
        $this->addSql('CREATE INDEX IDX_E00CEDDE8C03F15C ON booking (employee_id)');
        $this->addSql('CREATE TABLE employee (id UUID NOT NULL, establishment_id UUID NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5D9F75A18565851 ON employee (establishment_id)');
        $this->addSql('CREATE TABLE employee_specific_schedule (id UUID NOT NULL, employee_id UUID DEFAULT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, type VARCHAR(255) NOT NULL, start_time VARCHAR(255) DEFAULT NULL, end_time VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6B74964D8C03F15C ON employee_specific_schedule (employee_id)');
        $this->addSql('CREATE TABLE employee_week_time_table (id UUID NOT NULL, employee_id UUID DEFAULT NULL, day_of_the_week VARCHAR(255) NOT NULL, start_time VARCHAR(255) NOT NULL, end_time VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E3220D548C03F15C ON employee_week_time_table (employee_id)');
        $this->addSql('CREATE TABLE establishment (id UUID NOT NULL, organization_id UUID NOT NULL, service_id UUID NOT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, zip_code VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DBEFB1EE32C8A3DE ON establishment (organization_id)');
        $this->addSql('CREATE INDEX IDX_DBEFB1EEED5CA9E6 ON establishment (service_id)');
        $this->addSql('CREATE TABLE organization (id UUID NOT NULL, name VARCHAR(255) NOT NULL, manager_firstname VARCHAR(255) NOT NULL, manager_lastname VARCHAR(255) NOT NULL, kbis VARCHAR(255) NOT NULL, siret VARCHAR(255) DEFAULT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE service (id UUID NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "user" (id UUID NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDEA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDE8C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A18565851 FOREIGN KEY (establishment_id) REFERENCES establishment (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employee_specific_schedule ADD CONSTRAINT FK_6B74964D8C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employee_week_time_table ADD CONSTRAINT FK_E3220D548C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE establishment ADD CONSTRAINT FK_DBEFB1EE32C8A3DE FOREIGN KEY (organization_id) REFERENCES organization (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE establishment ADD CONSTRAINT FK_DBEFB1EEED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDEA76ED395');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDE8C03F15C');
        $this->addSql('ALTER TABLE employee DROP CONSTRAINT FK_5D9F75A18565851');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP CONSTRAINT FK_6B74964D8C03F15C');
        $this->addSql('ALTER TABLE employee_week_time_table DROP CONSTRAINT FK_E3220D548C03F15C');
        $this->addSql('ALTER TABLE establishment DROP CONSTRAINT FK_DBEFB1EE32C8A3DE');
        $this->addSql('ALTER TABLE establishment DROP CONSTRAINT FK_DBEFB1EEED5CA9E6');
        $this->addSql('DROP TABLE admin');
        $this->addSql('DROP TABLE booking');
        $this->addSql('DROP TABLE employee');
        $this->addSql('DROP TABLE employee_specific_schedule');
        $this->addSql('DROP TABLE employee_week_time_table');
        $this->addSql('DROP TABLE establishment');
        $this->addSql('DROP TABLE organization');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE "user"');
    }
}
