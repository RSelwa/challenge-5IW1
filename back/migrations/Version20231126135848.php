<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231126135848 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE slot (id UUID NOT NULL, employee_id UUID DEFAULT NULL, date VARCHAR(255) NOT NULL, start_time VARCHAR(255) NOT NULL, end_time VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_AC0E20678C03F15C ON slot (employee_id)');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT FK_AC0E20678C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employee_week_time_table DROP CONSTRAINT fk_e3220d548c03f15c');
        $this->addSql('DROP TABLE employee_week_time_table');
        $this->addSql('ALTER TABLE booking ALTER employee_id DROP NOT NULL');
        $this->addSql('ALTER TABLE booking ALTER date TYPE VARCHAR(255)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE employee_week_time_table (id UUID NOT NULL, employee_id UUID DEFAULT NULL, day_of_the_week VARCHAR(255) NOT NULL, start_time VARCHAR(255) NOT NULL, end_time VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_e3220d548c03f15c ON employee_week_time_table (employee_id)');
        $this->addSql('ALTER TABLE employee_week_time_table ADD CONSTRAINT fk_e3220d548c03f15c FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT FK_AC0E20678C03F15C');
        $this->addSql('DROP TABLE slot');
        $this->addSql('ALTER TABLE booking ALTER employee_id SET NOT NULL');
        $this->addSql('ALTER TABLE booking ALTER date TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
    }
}
